<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/services/api";

const users = ref([]);
const search = ref("");
const role = ref("");
const viewing = ref(null);
const showForm = ref(false);
const editingUser = ref(null);
const formData = ref({ name: "", email: "", phone: "" });

async function loadUsers() {
  try {
    const res = await api.get("/users");
    users.value = Array.isArray(res.data) ? res.data : res.data.items || [];
  } catch (e) {
    users.value = [
      {
        id: "001",
        name: "Nguyễn Văn A",
        email: "nguyenvana@email.com",
        phone: "0123456789",
        role: "user",
        orders: 5,
        status: "active",
      },
      {
        id: "002",
        name: "Trần Thị B",
        email: "tranthib@email.com",
        phone: "0987654321",
        role: "user",
        orders: 12,
        status: "active",
      },
    ];
  }
}

const filtered = computed(() => {
  return users.value.filter((u) => {
    if (
      search.value &&
      !String(u.name || u.email || "")
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
      return false;
    if (role.value && u.role !== role.value) return false;
    return true;
  });
});

function viewUser(id) {
  viewing.value = users.value.find((u) => (u.id || u._id) === id) || null;
}

async function editUser(id) {
  const u = users.value.find((x) => (x.id || x._id) === id);
  if (!u) return alert("Người dùng không tồn tại");
  editingUser.value = u;
  formData.value = {
    name: u.name,
    email: u.email,
    phone: u.phone,
  };
  showForm.value = true;
}

async function submitForm() {
  if (!editingUser.value) return;
  if (!formData.value.name || !formData.value.name.trim()) {
    alert("Tên không được để trống");
    return;
  }
  try {
    await api.put("/users/" + (editingUser.value._id || editingUser.value.id), {
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
    });
    editingUser.value.name = formData.value.name;
    editingUser.value.email = formData.value.email;
    editingUser.value.phone = formData.value.phone;
    alert("Cập nhật thành công");
    showForm.value = false;
  } catch (e) {
    alert("Lỗi: " + (e.message || e));
  }
}

onMounted(loadUsers);
</script>

<template>
  <div>
    <div class="top-bar">
      <h1 class="page-title">Quản Lý Người Dùng</h1>
    </div>

    <div class="filters-bar">
      <input
        v-model="search"
        type="text"
        class="search-input"
        placeholder="Tìm kiếm người dùng..."
      />
      <select v-model="role" class="filter-select">
        <option value="">Tất cả vai trò</option>
        <option value="admin">Admin</option>
        <option value="user">Người dùng</option>
      </select>
      <select class="filter-select">
        <option value="">Tất cả trạng thái</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Không hoạt động</option>
      </select>
    </div>

    <div class="content-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            <th>Vai Trò</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in filtered" :key="u.id || u._id">
            <td>{{ u.id || u._id }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.phone }}</td>
            <td>{{ u.role || "user" }}</td>
            <td>
              <span
                :class="[
                  'status-badge',
                  u.status === 'active' ? 'success' : 'cancelled',
                ]"
                >{{ u.status || "active" }}</span
              >
            </td>
            <td>
              <button class="btn-action view" @click="viewUser(u.id || u._id)">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn-action edit" @click="editUser(u.id || u._id)">
                <i class="bi bi-pencil"></i>
              </button>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td
              colspan="7"
              style="text-align: center; color: #666; padding: 20px"
            >
              Không có người dùng.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="viewing" class="admin-modal-overlay">
      <div class="admin-modal">
        <h3>Người dùng: {{ viewing.name }}</h3>
        <div><strong>Email:</strong> {{ viewing.email }}</div>
        <div><strong>Điện thoại:</strong> {{ viewing.phone }}</div>
        <div style="text-align: right; margin-top: 10px">
          <button class="btn-action" @click="viewing = null">Đóng</button>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="admin-modal-overlay">
      <div class="admin-modal">
        <h3>Chỉnh sửa người dùng</h3>
        <div class="form-row">
          <label>Tên</label>
          <input v-model="formData.name" />
        </div>
        <div class="form-row">
          <label>Email</label>
          <input v-model="formData.email" type="email" />
        </div>
        <div class="form-row">
          <label>Số điện thoại</label>
          <input v-model="formData.phone" />
        </div>
        <div style="text-align: right; margin-top: 10px">
          <button class="btn-action" @click="showForm = false">Huỷ</button>
          <button class="btn-primary" @click="submitForm">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>
