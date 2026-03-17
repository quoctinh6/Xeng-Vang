<template>
  <main>
    <div class="breadcrumb">
      <div class="breadcrumb-content container">
        <router-link to="/">Trang Chủ</router-link>
        <i class="bi bi-chevron-right"></i>
        <span>Lịch Sử Đơn Hàng</span>
      </div>
    </div>

    <section class="order-history-section">
      <div class="container">
        <div class="order-history-header">
          <h2>Đơn Hàng Của Tôi</h2>
        </div>

        <div class="order-tabs">
          <button
            v-for="status in [
              'all',
              'pending',
              'shipping',
              'delivered',
              'cancelled',
            ]"
            :key="status"
            class="order-tab-btn"
            :class="{ active: activeStatus === status }"
            @click="activeStatus = status"
          >
            {{ getStatusLabel(status) }}
          </button>
        </div>

        <div v-if="isLoading" class="loading-spinner">
          <i class="bi bi-hourglass-split"></i> Đang tải đơn hàng...
        </div>

        <div v-else-if="filteredOrders.length === 0" class="no-orders">
          <i class="bi bi-inbox"></i>
          <p>Không có đơn hàng nào</p>
        </div>

        <div v-else class="order-list">
          <div
            v-for="order in filteredOrders"
            :key="order._id"
            class="order-card"
            :class="`status-${order.status}`"
          >
            <div class="order-card-header">
              <span class="order-id"
                >Mã đơn hàng: {{ order.legacyId || order._id }}</span
              >
              <span class="order-date">{{ formatDate(order.date) }}</span>
              <span class="order-status">{{
                getStatusLabel(order.status)
              }}</span>
            </div>
            <div class="order-card-body">
              <div
                v-for="item in order.items"
                :key="item.productId"
                class="order-product-item"
              >
                <img
                  :src="resolveImage(item.image)"
                  :alt="item.name"
                  class="product-image-sm"
                  @error="handleImageError"
                />
                <div class="product-details">
                  <div class="product-name-sm">{{ item.name }}</div>
                  <div class="product-quantity">
                    Số lượng: {{ item.quantity }}
                  </div>
                </div>
                <div class="product-price-sm">
                  {{ formatPrice(item.price) }}
                </div>
              </div>
            </div>
            <div class="order-card-footer">
              <div class="order-total">
                Tổng cộng: <span>{{ formatPrice(order.total) }}</span>
              </div>
              <div class="order-actions">
                <a href="#" class="btn-outline">Xem chi tiết</a>
                <a v-if="order.status !== 'pending'" href="#" class="btn"
                  >Mua lại</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const activeStatus = ref("all");
const isLoading = ref(false);
const orders = ref([]);
const currentUser = ref(null);

// Fetch orders from API
const fetchOrders = async () => {
  isLoading.value = true;
  try {
    // Get current user from localStorage
    const user = localStorage.getItem("user");
    if (!user) {
      console.warn("No user logged in");
      isLoading.value = false;
      return;
    }
    currentUser.value = JSON.parse(user);

    // Fetch orders for current user only using userId
    const response = await fetch(
      `http://localhost:3000/api/orders?userId=${currentUser.value.userId}`
    );
    if (!response.ok) {
      throw new Error("Không thể tải lịch sử đơn hàng");
    }
    orders.value = await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    isLoading.value = false;
  }
};

// Filter orders based on active status
const filteredOrders = computed(() => {
  if (activeStatus.value === "all") {
    return orders.value;
  }
  return orders.value.filter((order) => order.status === activeStatus.value);
});

// Helper functions
const getStatusLabel = (status) => {
  const labels = {
    all: "Tất cả",
    pending: "Chờ xác nhận",
    shipping: "Đang giao",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
  };
  return labels[status] || status;
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("vi-VN");
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const resolveImage = (imagePath) => {
  if (!imagePath) {
    return "https://via.placeholder.com/80x80?text=No+Image";
  }
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  if (imagePath.startsWith("./")) {
    return `http://localhost:3000/${imagePath.substring(2)}`;
  }
  return `http://localhost:3000/img/products/${imagePath}`;
};

const handleImageError = (e) => {
  e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.breadcrumb {
  background: #f5f5f5;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.breadcrumb-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: #ffa500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #ff6b6b;
}

.breadcrumb i {
  font-size: 0.8rem;
}

.order-history-section {
  padding: 2rem 0;
}

.order-history-header {
  margin-bottom: 2rem;
}

.order-history-header h2 {
  font-size: 2rem;
  color: #333;
  font-weight: 700;
}

.order-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.order-tab-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: #666;
}

.order-tab-btn:hover {
  border-color: #ffa500;
  color: #ffa500;
}

.order-tab-btn.active {
  background: #ffa500;
  color: white;
  border-color: #ffa500;
}

.loading-spinner {
  text-align: center;
  padding: 3rem;
  color: #999;
  font-size: 1.1rem;
}

.loading-spinner i {
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.no-orders {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.no-orders i {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.order-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.order-card-header {
  background: #f9f9f9;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  align-items: center;
}

.order-id {
  font-weight: 600;
  color: #333;
}

.order-date {
  color: #999;
  font-size: 0.9rem;
}

.order-status {
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.status-pending .order-status {
  background: #fff3cd;
  color: #856404;
}

.status-shipping .order-status {
  background: #cfe2ff;
  color: #084298;
}

.status-delivered .order-status {
  background: #d1e7dd;
  color: #0a3622;
}

.status-cancelled .order-status {
  background: #f8d7da;
  color: #842029;
}

.order-card-body {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.order-product-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.order-product-item:last-child {
  margin-bottom: 0;
}

.product-image-sm {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  background: #f5f5f5;
}

.product-details {
  flex: 1;
}

.product-name-sm {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
}

.product-quantity {
  color: #999;
  font-size: 0.85rem;
}

.product-price-sm {
  font-weight: 700;
  color: #ffa500;
  font-size: 1rem;
  white-space: nowrap;
}

.order-card-footer {
  padding: 1rem 1.5rem;
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.order-total {
  font-size: 0.95rem;
  color: #666;
}

.order-total span {
  font-weight: 700;
  color: #ff6b6b;
  font-size: 1.1rem;
}

.order-actions {
  display: flex;
  gap: 0.8rem;
}

.btn-outline,
.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline {
  border: 1px solid #ffa500;
  color: #ffa500;
  background: white;
}

.btn-outline:hover {
  background: #ffa500;
  color: white;
}

.btn {
  background: #ffa500;
  color: white;
  border: none;
}

.btn:hover {
  background: #ff8c00;
}

@media (max-width: 768px) {
  .order-card-header {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .order-product-item {
    grid-template-columns: 60px 1fr;
  }

  .product-image-sm {
    width: 60px;
    height: 60px;
  }

  .order-card-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .order-actions {
    width: 100%;
  }

  .btn-outline,
  .btn {
    flex: 1;
    text-align: center;
  }
}
</style>
