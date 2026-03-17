<script setup>
import { ref, onMounted, computed } from "vue";
import api, { fetchProducts } from "@/services/api";

const products = ref([]);
const search = ref("");
const category = ref("");
const status = ref("");
const categories = ref([]);

async function loadProducts() {
  try {
    // Prefer axios helper so requests go to the backend URL (not vite dev server)
    const data = await fetchProducts();
    // Normalize responses:
    // - New/modern API: returns array of product objects
    // - Legacy API: returns an array with a single object that contains { categories: [...], bestSelling: [...] }
    if (Array.isArray(data)) {
      if (data.length > 0 && data[0] && data[0].bestSelling) {
        products.value = data[0].bestSelling;
      } else if (
        data.length > 0 &&
        data[0] &&
        (data[0].name || data[0].title)
      ) {
        // array of product objects
        products.value = data;
      } else {
        // fallback: maybe wrapped in items
        products.value = data.items || [];
      }
    } else if (data && (data.bestSelling || data.items)) {
      products.value = data.bestSelling || data.items || [];
    } else {
      products.value = [];
    }
  } catch (e) {
    console.warn("Cannot load products", e);
    products.value = [];
  }
}

async function loadCategories() {
  try {
    try {
      const res = await api.get("/categories");
      categories.value = Array.isArray(res.data)
        ? res.data
        : res.data.items || [];
    } catch (e) {
      categories.value = [];
    }
  } catch (e) {
    categories.value = [];
  }
}

const filtered = computed(() => {
  return products.value.filter((p) => {
    if (
      search.value &&
      !String(p.title || p.name || "")
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
      return false;
    if (
      category.value &&
      p.category_code !== category.value &&
      p.category !== category.value
    )
      return false;
    return true;
  });
});

// Helper: parse price that may be a number or a formatted string like "450.000 VNĐ"
function parsePrice(p) {
  if (p == null) return NaN;
  if (typeof p === "number") return p;
  if (typeof p === "string") {
    // remove non-digit characters
    const digits = p.replace(/[^0-9]/g, "");
    return digits ? Number(digits) : NaN;
  }
  return NaN;
}

function formatPrice(p) {
  const n = parsePrice(p);
  if (!isNaN(n)) return n.toLocaleString("vi-VN") + " ₫";
  // if cannot parse, return original or placeholder
  return p || "-";
}

function getCategoryName(p) {
  // p may have category as code or name, or idcategory populated
  if (!p) return "";
  if (p.idcategory && p.idcategory.name) return p.idcategory.name;
  const cat = p.category || p.category_code || "";
  if (!cat) return "";
  // try find in loaded categories
  const found = categories.value.find(
    (c) => c.code === cat || c.name === cat || String(c._id) === String(cat)
  );
  return found ? found.name : cat;
}

// Resolve image paths to full URL when needed so browser loads from backend host
function resolveImage(path) {
  if (!path) return "https://via.placeholder.com/60";
  if (typeof path !== "string") return "https://via.placeholder.com/60";
  const val = path.trim();
  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  // If path points to img/products, prefer the frontend src path so Vite serves it
  const m = val.match(/(?:\.\/|\/?)(?:img\/products\/)(.+)$/i);
  if (m && m[1]) {
    const filename = m[1];
    const frontendOrigin =
      typeof window !== "undefined" && window.location && window.location.origin
        ? window.location.origin.replace(/\/$/, "")
        : "";
    if (frontendOrigin)
      return frontendOrigin + "/src/components/img/products/" + filename;
  }

  // get backend origin from axios baseURL (api.defaults.baseURL is like 'http://localhost:3000/api')
  const apiBase = api.defaults.baseURL || "";
  const backendOrigin = apiBase.replace(/\/api\/?$/i, "").replace(/\/$/, "");
  if (val.startsWith("/img")) return backendOrigin + val;
  if (val.startsWith("./img"))
    return backendOrigin + "/" + val.replace(/^\.\//, "");
  if (val.startsWith("img/")) return backendOrigin + "/" + val;
  // otherwise return as-is (may be data URL)
  return val;
}

function openAddModal() {
  formMode.value = "create";
  form.value = {
    name: "",
    price: 0,
    category: "",
    stock: 0,
    quantity: 0,
    description: "",
    img: "",
  };
  showForm.value = true;
}
async function deleteProduct(id) {
  if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
  try {
    await api.delete("/products/" + id);
    await loadProducts();
  } catch (e) {
    alert("Xóa không thành công");
  }
}

onMounted(() => {
  loadProducts();
  loadCategories();
});

// --- Add/Edit form state & handlers ---
const showForm = ref(false);
const formMode = ref("create"); // 'create' or 'edit'
const form = ref({
  name: "",
  price: 0,
  category: "",
  stock: 0,
  quantity: 0,
  description: "",
  img: "",
});
const editingId = ref(null);
const submitting = ref(false);
const formError = ref("");
const uploading = ref(false);
const uploadError = ref("");

function openEditModal(p) {
  formMode.value = "edit";
  editingId.value = p._id || p.id;
  form.value = {
    name: p.name || p.title || "",
    price: Number(p.price) || 0,
    category: p.category || (p.idcategory && p.idcategory.name) || "",
    stock: p.stock ?? p.quantity ?? 0,
    quantity: p.quantity ?? p.stock ?? 0,
    description: p.description || "",
    img: p.img || p.image || "",
  };
  showForm.value = true;
}

async function uploadFile(file) {
  if (!file) return null;
  uploading.value = true;
  uploadError.value = "";

  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64 = e.target.result.split(",")[1]; // extract base64 part
          const filename = `${Date.now()}-${file.name}`;

          // ✅ Send with correct key: "filedata" not "base64"
          const response = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filename: filename,
              filedata: base64, // ✅ CORRECT KEY
            }),
          });

          uploading.value = false;

          if (!response.ok) {
            uploadError.value = `Server error: ${response.status}`;
            resolve(null);
            return;
          }

          const data = await response.json();
          resolve(`./img/products/${data.filename}`);
        } catch (err) {
          uploadError.value = `Tải ảnh thất bại: ${err.message}`;
          uploading.value = false;
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      uploadError.value = `Tải ảnh thất bại: ${err.message}`;
      uploading.value = false;
      resolve(null);
    }
  });
}

async function onFileChange(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const url = await uploadFile(file);
  if (url) {
    form.value.img = url;
  } else {
    alert("Tải ảnh lên thất bại");
  }
}

async function submitForm() {
  try {
    formError.value = "";
    if (!form.value.name || !String(form.value.name).trim()) {
      formError.value = "Tên sản phẩm là bắt buộc.";
      return;
    }
    if (!form.value.price || Number(form.value.price) <= 0) {
      formError.value = "Giá phải lớn hơn 0.";
      return;
    }
    submitting.value = true;
    const payload = {
      name: form.value.name,
      price: Number(form.value.price),
      // category: send idcategory if we can map from categories, else send category string
      category: form.value.category,
      stock: Number(form.value.stock),
      quantity: Number(form.value.quantity),
      description: form.value.description,
      image: form.value.img || form.value.image || "",
    };
    // attach idcategory if we matched one
    const matched = categories.value.find(
      (c) =>
        c.code === form.value.category ||
        c.name === form.value.category ||
        String(c._id) === String(form.value.category)
    );
    if (matched) payload.idcategory = matched._id;

    if (formMode.value === "create") {
      await api.post("/products", payload);
      alert("Tạo sản phẩm thành công");
    } else {
      const id = editingId.value;
      await api.put("/products/" + id, payload);
      alert("Cập nhật sản phẩm thành công");
    }
    showForm.value = false;
    await loadProducts();
    // reset form
    form.value = {
      name: "",
      price: 0,
      category: "",
      stock: 0,
      quantity: 0,
      description: "",
      img: "",
    };
    editingId.value = null;
    submitting.value = false;
  } catch (e) {
    console.error(e, e?.response?.data);
    submitting.value = false;
    // prefer server error message when available
    const serverMsg =
      e?.response?.data?.error || e?.response?.data || e.message || e;
    formError.value = "Lỗi khi lưu sản phẩm: " + serverMsg;
    alert(formError.value);
  }
}
</script>

<template>
  <div>
    <div class="top-bar">
      <h1 class="page-title">Quản Lý Sản Phẩm</h1>
      <button class="btn-primary" @click="openAddModal">
        <i class="bi bi-plus-circle"></i> Thêm Sản Phẩm
      </button>
    </div>

    <div class="filters-bar">
      <input
        v-model="search"
        type="text"
        class="search-input"
        placeholder="Tìm kiếm sản phẩm..."
      />
      <select v-model="category" class="filter-select">
        <option value="">Tất cả danh mục</option>
        <option
          v-for="c in categories"
          :key="c._id || c.code"
          :value="c.code || c.name"
        >
          {{ c.name }}
        </option>
      </select>
      <select v-model="status" class="filter-select">
        <option value="">Tất cả trạng thái</option>
        <option value="active">Đang bán</option>
        <option value="inactive">Ngừng bán</option>
      </select>
    </div>

    <div class="content-card">
      <!-- Add/Edit product form modal -->
      <div v-if="showForm" class="admin-modal-overlay">
        <div class="admin-modal">
          <h3>
            {{ formMode === "create" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm" }}
          </h3>
          <div class="form-row">
            <label>Tên</label>
            <input v-model="form.name" />
          </div>
          <div v-if="formError" style="color: #b22222; margin-bottom: 8px">
            {{ formError }}
          </div>
          <div class="form-row">
            <label>Giá</label>
            <input v-model.number="form.price" type="number" />
          </div>
          <div class="form-row">
            <label>Danh mục</label>
            <select v-model="form.category" class="filter-select">
              <option value="">-- Chọn danh mục --</option>
              <option
                v-for="c in categories"
                :key="c._id || c.code"
                :value="c.code || c.name"
              >
                {{ c.name }}
              </option>
            </select>
            <small style="color: #666"
              >Hoặc nhập tên mới nếu muốn tạo danh mục mới</small
            >
          </div>
          <div class="form-row">
            <label>Tồn kho</label>
            <input v-model.number="form.stock" type="number" />
          </div>
          <div class="form-row">
            <label>Ảnh</label>
            <div style="display: flex; gap: 8px; align-items: center">
              <input type="file" accept="image/*" @change="onFileChange" />
              <div style="min-width: 60px">
                <img
                  v-if="form.img"
                  :src="resolveImage(form.img)"
                  alt="preview"
                  style="
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 4px;
                  "
                />
              </div>
            </div>
            <small style="color: #666"
              >Chọn file để tải lên, hệ thống sẽ lưu vào
              <code>./img/products/</code></small
            >
            <div
              v-if="uploading"
              style="color: #666; font-size: 12px; margin-top: 4px"
            >
              Đang tải ảnh...
            </div>
            <div
              v-if="uploadError"
              style="color: #b22222; font-size: 13px; margin-top: 6px"
            >
              Lỗi tải ảnh: {{ uploadError }}
            </div>
          </div>
          <div class="form-row">
            <label>Mô tả</label>
            <textarea v-model="form.description"></textarea>
          </div>
          <div style="text-align: right; margin-top: 10px">
            <button class="btn-action" @click.prevent="showForm = false">
              Huỷ
            </button>
            <button
              class="btn-primary"
              :disabled="submitting"
              @click.prevent="submitForm"
            >
              {{ submitting ? "Đang lưu..." : "Lưu" }}
            </button>
          </div>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Hình Ảnh</th>
            <th>Tên Sản Phẩm</th>
            <th>Danh Mục</th>
            <th>Giá</th>
            <th>Tồn Kho</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filtered" :key="p._id || p.id">
            <td>
              <img
                :src="
                  resolveImage(
                    p.img || p.image || 'https://via.placeholder.com/60'
                  )
                "
                alt=""
                style="
                  width: 60px;
                  height: 60px;
                  object-fit: cover;
                  border-radius: 5px;
                "
              />
            </td>
            <td>{{ p.title || p.name }}</td>
            <td>
              {{ getCategoryName(p) }}
            </td>
            <td>{{ formatPrice(p.price) }}</td>
            <td>{{ p.stock ?? p.quantity ?? 0 }}</td>
            <td>
              <span
                :class="['status-badge', p.stock > 0 ? 'success' : 'cancelled']"
                >{{ p.stock > 0 ? "Đang bán" : "Hết hàng" }}</span
              >
            </td>
            <td>
              <button class="btn-action edit" @click.prevent="openEditModal(p)">
                <i class="bi bi-pencil"></i>
              </button>
              <button
                class="btn-action delete"
                @click.prevent="deleteProduct(p._id || p.id)"
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
              Không có sản phẩm.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
