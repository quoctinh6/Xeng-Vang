<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/services/api";

const viewingOrder = ref(null);
const showStatusForm = ref(false);
const editingOrder = ref(null);
const newStatus = ref("");
const statusUpdating = ref(false);

const search = ref("");
const status = ref("");
const date = ref("");
const orders = ref([]);

async function loadOrders() {
  try {
    const res = await api.get("/orders");
    orders.value = Array.isArray(res.data) ? res.data : res.data.orders || [];
  } catch (e) {
    try {
      orders.value = JSON.parse(localStorage.getItem("orders") || "[]");
    } catch (_) {
      orders.value = [];
    }
  }
}

const filtered = computed(() => {
  return orders.value.filter((o) => {
    if (search.value) {
      const q = search.value.toLowerCase();
      if (
        !String(o.orderId || o.id || "")
          .toLowerCase()
          .includes(q) &&
        !String(o.items || [])
          .join(" ")
          .toLowerCase()
          .includes(q) &&
        !String(o.customer || "")
          .toLowerCase()
          .includes(q)
      )
        return false;
    }
    if (status.value && (o.status || "delivered") !== status.value)
      return false;
    if (date.value && (o.date || "").indexOf(date.value) !== 0) return false;
    return true;
  });
});

function viewOrder(id) {
  viewingOrder.value =
    orders.value.find((o) => (o.orderId || o.id) === id) || null;
}

function updateStatus(id) {
  const o = orders.value.find((x) => (x.orderId || x.id) === id);
  if (!o) return alert("Đơn hàng không tìm thấy");

  // Prevent status changes on completed or cancelled orders
  if (o.status === "completed" || o.status === "cancelled") {
    alert(
      "Không thể thay đổi trạng thái của đơn hàng đã hoàn thành hoặc đã hủy"
    );
    return;
  }

  editingOrder.value = o;
  newStatus.value = o.status || "pending";
  showStatusForm.value = true;
}

async function submitStatusUpdate() {
  if (!editingOrder.value || !newStatus.value) return;
  if (newStatus.value === editingOrder.value.status) {
    alert("Trạng thái không thay đổi");
    return;
  }

  statusUpdating.value = true;
  try {
    await api.put(
      "/orders/" + (editingOrder.value._id || editingOrder.value.id),
      {
        status: newStatus.value,
      }
    );
    editingOrder.value.status = newStatus.value;
    alert("Cập nhật thành công");
    showStatusForm.value = false;
  } catch (e) {
    alert("Cập nhật lỗi: " + (e.message || e));
  } finally {
    statusUpdating.value = false;
  }
}

onMounted(loadOrders);
</script>

<template>
  <div>
    <div class="top-bar">
      <h1 class="page-title">Quản Lý Đơn Hàng</h1>
    </div>

    <div class="filters-bar">
      <input
        v-model="search"
        type="text"
        class="search-input"
        placeholder="Tìm kiếm đơn hàng..."
      />
      <select v-model="status" class="filter-select">
        <option value="">Tất cả trạng thái</option>
        <option value="pending">Đang xử lý</option>
        <option value="shipping">Đang giao</option>
        <option value="completed">Hoàn thành</option>
        <option value="cancelled">Đã hủy</option>
      </select>
      <input v-model="date" type="date" class="filter-select" />
    </div>

    <div class="content-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Mã Đơn</th>
            <th>Khách Hàng</th>
            <th>Sản Phẩm</th>
            <th>Tổng Tiền</th>
            <th>Ngày Đặt</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="o in filtered" :key="o.orderId || o.id">
            <td>{{ o.orderId || o.id }}</td>
            <td>
              <div>
                {{ o.customer?.name || o.customer || "Khách vãng lai" }}
              </div>
              <small>{{ o.customer?.phone || "" }}</small>
            </td>
            <td>{{ (o.items || []).length }} sản phẩm</td>
            <td>{{ o.total || o.totalText || "" }}</td>
            <td>{{ o.date || "" }}</td>
            <td>
              <span
                :class="[
                  'status-badge',
                  o.status === 'completed'
                    ? 'success'
                    : o.status === 'cancelled'
                    ? 'cancelled'
                    : 'pending',
                ]"
                >{{ o.status || "delivered" }}</span
              >
            </td>
            <td>
              <button
                class="btn-action view"
                @click="viewOrder(o.orderId || o.id)"
              >
                <i class="bi bi-eye"></i>
              </button>
              <button
                class="btn-action edit"
                @click="updateStatus(o.orderId || o.id)"
              >
                <i class="bi bi-pencil"></i>
              </button>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td
              colspan="7"
              style="text-align: center; color: #666; padding: 20px"
            >
              Không có đơn hàng nào.
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Order viewer modal -->
      <div v-if="viewingOrder" class="admin-modal-overlay">
        <div class="admin-modal">
          <h3>Đơn hàng {{ viewingOrder.orderId || viewingOrder.id }}</h3>
          <div>
            <strong>Khách:</strong>
            {{ viewingOrder.customer?.name || viewingOrder.customer }}
          </div>
          <div><strong>Ngày:</strong> {{ viewingOrder.date }}</div>
          <div><strong>Trạng thái:</strong> {{ viewingOrder.status }}</div>
          <div style="margin-top: 10px">
            <h4>Items</h4>
            <ul>
              <li v-for="it in viewingOrder.items" :key="it.productId || it.id">
                {{ it.name }} x{{ it.quantity }} - {{ it.price }}
              </li>
            </ul>
          </div>
          <div style="text-align: right; margin-top: 10px">
            <button class="btn-action" @click="viewingOrder = null">
              Đóng
            </button>
          </div>
        </div>
      </div>

      <!-- Status update modal -->
      <div v-if="showStatusForm" class="admin-modal-overlay">
        <div class="admin-modal">
          <h3>
            Cập nhật trạng thái đơn hàng
            {{ editingOrder?.orderId || editingOrder?.id }}
          </h3>
          <div class="form-row">
            <label>Trạng thái hiện tại</label>
            <div
              style="
                padding: 8px;
                background: #f0f0f0;
                border-radius: 4px;
                color: #666;
              "
            >
              {{ editingOrder?.status || "pending" }}
            </div>
          </div>
          <div class="form-row">
            <label>Trạng thái mới</label>
            <select v-model="newStatus" class="filter-select">
              <option value="pending">Đang xử lý</option>
              <option value="shipping">Đang giao</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            <small style="color: #666; margin-top: 4px; display: block">
              Lưu ý: Không thể thay đổi trạng thái sau khi đơn hàng hoàn thành
              hoặc bị hủy
            </small>
          </div>
          <div style="text-align: right; margin-top: 10px">
            <button
              class="btn-action"
              @click="showStatusForm = false"
              :disabled="statusUpdating"
            >
              Huỷ
            </button>
            <button
              class="btn-primary"
              @click="submitStatusUpdate"
              :disabled="statusUpdating"
            >
              {{ statusUpdating ? "Đang cập nhật..." : "Cập nhật" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
