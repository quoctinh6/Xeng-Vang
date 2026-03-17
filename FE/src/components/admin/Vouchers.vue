<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";

const vouchers = ref([]);
const search = ref("");
const status = ref("");
const editing = ref(null);
const showForm = ref(false);
const form = ref({
  code: "",
  description: "",
  type: "percent",
  value: 0,
  validTo: "",
  status: "active",
});

async function loadVouchers() {
  try {
    const res = await api.get("/vouchers");
    vouchers.value = Array.isArray(res.data) ? res.data : res.data.items || [];
  } catch (e) {
    vouchers.value = [
      {
        id: "v1",
        code: "DISCOUNT10",
        description: "Giảm 10%",
        type: "percent",
        value: 10,
        validTo: "2025-12-31",
        status: "active",
      },
    ];
  }
}

const filtered = computed(() =>
  vouchers.value.filter((v) => {
    if (
      search.value &&
      !String(v.code || v.description || "")
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
      return false;
    if (status.value && v.status !== status.value) return false;
    return true;
  })
);

function editVoucher(id) {
  const v = vouchers.value.find((x) => (x.id || x._id) === id);
  if (!v) return;
  editing.value = v;
  form.value = {
    code: v.code,
    description: v.description,
    type: v.type,
    value: v.value,
    validTo: v.validTo,
    status: v.status,
  };
  showForm.value = true;
}

async function deleteVoucher(id) {
  if (!confirm("Xoá voucher?")) return;
  try {
    await api.delete("/vouchers/" + id);
    vouchers.value = vouchers.value.filter((x) => (x.id || x._id) !== id);
    alert("Đã xóa");
  } catch (e) {
    alert("Lỗi: " + (e.message || e));
  }
}

async function submitVoucher() {
  try {
    const payload = {
      code: form.value.code,
      description: form.value.description,
      type: form.value.type,
      value: form.value.value,
      validTo: form.value.validTo,
      status: form.value.status,
    };
    if (editing.value) {
      await api.put(
        "/vouchers/" + (editing.value._id || editing.value.id),
        payload
      );
      Object.assign(editing.value, payload);
      alert("Cập nhật thành công");
    } else {
      const res = await api.post("/vouchers", payload);
      vouchers.value.push(res.data);
      alert("Tạo voucher thành công");
    }
    showForm.value = false;
    editing.value = null;
  } catch (e) {
    alert("Lỗi: " + (e.message || e));
  }
}

onMounted(loadVouchers);
</script>

<template>
  <div>
    <div class="top-bar">
      <h1 class="page-title">Quản Lý Voucher</h1>
    </div>

    <div class="filters-bar">
      <input
        v-model="search"
        type="text"
        class="search-input"
        placeholder="Tìm mã voucher hoặc mô tả..."
      />
      <select v-model="status" class="filter-select">
        <option value="">Tất cả</option>
        <option value="active">Hoạt động</option>
        <option value="expired">Hết hạn</option>
      </select>
      <button
        class="btn-action"
        @click.prevent="
          () => {
            editing = null;
            form = {
              code: '',
              description: '',
              type: 'percent',
              value: 0,
              validTo: '',
              status: 'active',
            };
            showForm = true;
          }
        "
      >
        Thêm voucher
      </button>
    </div>

    <div class="content-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Mô tả</th>
            <th>Loại</th>
            <th>Giá trị</th>
            <th>Hạn</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in filtered" :key="v.id || v._id">
            <td>{{ v.code }}</td>
            <td>{{ v.description }}</td>
            <td>{{ v.type }}</td>
            <td>{{ v.type === "percent" ? v.value + "%" : v.value | 0 }}</td>
            <td>{{ v.validTo }}</td>
            <td>
              <span
                :class="[
                  'status-badge',
                  v.status === 'active' ? 'success' : 'cancelled',
                ]"
                >{{ v.status }}</span
              >
            </td>
            <td>
              <button
                class="btn-action edit"
                @click="editVoucher(v.id || v._id)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                class="btn-action delete"
                @click="deleteVoucher(v.id || v._id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td
              colspan="7"
              style="text-align: center; color: #666; padding: 20px"
            >
              Không có voucher.
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="showForm" class="admin-modal-overlay">
        <div class="admin-modal">
          <h3>{{ editing ? "Chỉnh sửa voucher" : "Thêm voucher" }}</h3>
          <div class="form-row">
            <label>Mã</label><input v-model="form.code" />
          </div>
          <div class="form-row">
            <label>Mô tả</label><input v-model="form.description" />
          </div>
          <div class="form-row">
            <label>Loại</label
            ><select v-model="form.type">
              <option value="percent">Phần trăm</option>
              <option value="fixed">Cố định</option>
            </select>
          </div>
          <div class="form-row">
            <label>Giá trị</label
            ><input v-model.number="form.value" type="number" />
          </div>
          <div class="form-row">
            <label>Hạn</label><input v-model="form.validTo" type="date" />
          </div>
          <div style="text-align: right; margin-top: 10px">
            <button class="btn-action" @click.prevent="showForm = false">
              Huỷ</button
            ><button class="btn-primary" @click.prevent="submitVoucher">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
