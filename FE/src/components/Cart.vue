<template>
  <main>
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <div class="breadcrumb-content">
        <a href="index.html">Trang Chủ</a>
        <i class="bi bi-chevron-right"></i>
        <span>Giỏ Hàng</span>
      </div>
    </div>

    <!-- Cart Section -->
    <section class="cart-section">
      <div class="cart-container">
        <div class="cart-header">
          <h2>Giỏ Hàng Của Bạn</h2>
          <span class="cart-count">{{ cartCount }} sản phẩm</span>
        </div>

        <div id="cartContent">
          <div class="cart-layout">
            <div v-if="cart.length" class="cart-items">
              <div
                class="cart-item"
                v-for="item in cart"
                :key="item.id"
                :data-product-id="item.id"
              >
                <img
                  :src="resolveImage(item.image)"
                  :alt="item.name"
                  class="cart-item-image"
                />
                <div class="cart-item-info">
                  <h3 class="cart-item-name">{{ item.name }}</h3>
                  <div class="cart-item-options">{{ item.options || "" }}</div>
                  <div class="cart-item-price">
                    {{ formatPrice(parsePrice(item.price)) }}
                  </div>
                  <div class="cart-item-actions">
                    <div class="quantity-controls">
                      <button
                        class="quantity-btn"
                        @click="updateQuantity(item.id, -1)"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        class="quantity-input"
                        v-model.number="item.qty"
                        min="1"
                      />
                      <button
                        class="quantity-btn"
                        @click="updateQuantity(item.id, 1)"
                      >
                        +
                      </button>
                    </div>
                    <button
                      class="remove-btn"
                      @click="removeItem(item.id)"
                      title="Xóa sản phẩm"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="empty-cart">
              <div class="empty-cart-icon"><i class="bi bi-cart-x"></i></div>
              <h3>Giỏ hàng trống</h3>
              <p>Chưa có sản phẩm trong giỏ hàng.</p>
              <a class="empty-cart-btn" @click.prevent="router.push('/')"
                >Tiếp tục mua sắm</a
              >
            </div>

            <!-- Cart Summary -->
            <div class="cart-summary">
              <h3 class="summary-title">Tóm Tắt Đơn Hàng</h3>

              <!-- Voucher Section -->
              <div class="voucher-section">
                <div class="voucher-input-group" id="voucherInputGroup">
                  <input
                    type="text"
                    class="voucher-input"
                    id="voucherCode"
                    placeholder="Nhập mã voucher"
                  />
                  <button
                    class="apply-voucher-btn"
                    @click.prevent="applyVoucher"
                  >
                    Áp dụng
                  </button>
                </div>
                <div v-if="appliedVoucher" class="applied-voucher">
                  <span>{{ appliedVoucher }}</span>
                  <button
                    class="remove-voucher-btn"
                    @click.prevent="removeVoucher"
                  >
                    <i class="bi bi-x-circle"></i>
                  </button>
                </div>
              </div>

              <!-- Summary Details -->
              <div class="summary-details">
                <div class="summary-row">
                  <span> Tạm tính: </span>
                  <span id="subtotal">{{ formatPrice(subtotal) }}</span>
                </div>
                <div class="summary-row">
                  <span> Phí vận chuyển: </span>
                  <span id="shipping">{{ formatPrice(shipping) }}</span>
                </div>
                <div class="summary-row" v-if="discount > 0">
                  <span> Giảm giá: </span>
                  <span id="discount" style="color: #4caf50"
                    >-{{ formatPrice(discount) }}</span
                  >
                </div>
                <div class="summary-row total">
                  <span> Tổng cộng: </span>
                  <span class="amount" id="total">{{
                    formatPrice(total)
                  }}</span>
                </div>
              </div>

              <!-- Checkout Button -->
              <button class="checkout-btn" @click.prevent="checkout">
                <i class="bi bi-credit-card"></i>
                Thanh Toán
              </button>

              <div class="continue-shopping">
                <a @click.prevent="router.push('/')">
                  <i class="bi bi-arrow-left"></i> Tiếp tục mua sắm
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggested Products -->
        <div class="suggested-products">
          <h3>Có Thể Bạn Sẽ Thích</h3>
          <div class="product-grid">
            <div
              v-for="p in suggestedProducts"
              :key="p.id"
              class="product-card"
              @click="viewDetail(p)"
              style="cursor: pointer"
            >
              <img
                :src="resolveImage(p.image || p.img)"
                :alt="p.name"
                class="product-image"
              />
              <div class="product-info">
                <h4 class="product-name">{{ p.name }}</h4>
                <p class="product-price">{{ p.price }}</p>
                <button class="add-to-cart-btn">Xem chi tiết</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cart = ref([]);
const appliedVoucher = ref(null);
const shipping = ref(30000);
const discount = ref(0);

const suggestedProducts = ref([]);

onMounted(async () => {
  try {
    cart.value = JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (e) {
    cart.value = [];
  }

  // Fetch suggested products
  try {
    const resp = await fetch("http://localhost:3000/api/products");
    if (resp.ok) {
      const data = await resp.json();
      const rawData = Array.isArray(data) ? data[0] : data;
      const apiProducts = rawData?.bestSelling || [];
      // Just take 4 random/first ones for suggestion
      suggestedProducts.value = apiProducts.slice(0, 4);
    }
  } catch (e) {
    console.error("Lỗi tải sản phẩm gợi ý:", e);
  }
});

function viewDetail(p) {
  sessionStorage.setItem("selectedProduct", JSON.stringify(p));
  router.push({ name: "ProductDetail", params: { id: p.id } });
}

watch(
  cart,
  (v) => {
    localStorage.setItem("cart", JSON.stringify(v));
  },
  { deep: true }
);

function resolveImage(path) {
  if (!path) return "https://via.placeholder.com/300x250?text=No+Image";
  if (typeof path !== "string") return "https://via.placeholder.com/300x250?text=No+Image";
  if (path.startsWith("http")) return path;
  let filename = path.split("/").pop();
  return `http://localhost:3000/img/products/${filename}`;
}

function updateQuantity(id, delta = 0) {
  const item = cart.value.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
}

function removeItem(id) {
  const idx = cart.value.findIndex((i) => i.id === id);
  if (idx > -1) cart.value.splice(idx, 1);
}

const subtotal = computed(() =>
  cart.value.reduce((s, i) => s + parsePrice(i.price) * (i.qty || 1), 0)
);
const total = computed(
  () => subtotal.value + shipping.value - (discount.value || 0)
);

const cartCount = computed(() =>
  cart.value.reduce((s, i) => s + (i.qty || 0), 0)
);

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  return Number(String(priceStr).replace(/[^0-9]/g, "")) || 0;
}

function formatPrice(n) {
  if (n == null) return "0đ";
  return Number(n).toLocaleString("vi-VN") + "đ";
}

function checkout() {
  // Save cart, subtotal, discount, shipping, and total to localStorage
  localStorage.setItem(
    "checkoutData",
    JSON.stringify({
      items: cart.value,
      subtotal: subtotal.value,
      shipping: shipping.value,
      discount: discount.value,
      total: total.value,
      appliedVoucher: appliedVoucher.value,
      timestamp: new Date().toISOString(),
    })
  );
  router.push("/checkout");
}

function applyVoucher() {
  // simple demo voucher handling
  const code = (document.getElementById("voucherCode") || {}).value || "";
  if (code.toLowerCase() === "GIAM30") {
    discount.value = Math.round(subtotal.value * 0.3);
    appliedVoucher.value = "GIAM30 - 30%";
  } else if (code) {
    appliedVoucher.value = code;
    discount.value = 0;
  }
}

function removeVoucher() {
  appliedVoucher.value = null;
  discount.value = 0;
}
</script>

<style scoped>
/* --- CSS cho trang Giỏ Hàng --- */
.cart-section {
  padding: 2rem 0 4rem;
}

.breadcrumb {
  padding: 1rem 0;
  background: var(--background-color);
}

.breadcrumb-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: var(--primary-color);
}

.breadcrumb i {
  font-size: 0.8rem;
}

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.cart-header h2 {
  font-size: 2.5rem;
  color: var(--secondary-color);
  font-weight: 700;
}

.cart-count {
  color: #666;
  font-size: 1.1rem;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.cart-items {
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 2rem;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.cart-item-options {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.cart-item-price {
  font-size: 1.1rem;
  color: var(--secondary-color);
  font-weight: 700;
  margin-bottom: 1rem;
}

.cart-item-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.quantity-btn {
  width: 35px;
  height: 35px;
  border: none;
  background: var(--white);
  cursor: pointer;
  font-size: 1rem;
  color: var(--text-color);
  transition: background 0.3s ease;
}

.quantity-btn:hover {
  background: var(--background-color);
}

.quantity-input {
  width: 50px;
  height: 35px;
  border: none;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 700;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.remove-btn:hover {
  color: #c0392b;
}

.cart-summary {
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 2rem;
  position: sticky;
  top: 100px;
  height: fit-content;
}

.summary-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.voucher-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.voucher-input-group {
  display: flex;
  gap: 0.5rem;
}

.voucher-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
}

.voucher-input:focus {
  outline: none;
  border-color: var(--secondary-color);
}

.apply-voucher-btn {
  padding: 0.75rem 1.5rem;
  background: var(--secondary-color);
  color: var(--white);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.3s ease;
}

.apply-voucher-btn:hover {
  background: #e69500;
}

.applied-voucher {
  background: rgba(76, 175, 80, 0.1);
  padding: 0.75rem;
  border-radius: 10px;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.applied-voucher span {
  color: #4caf50;
  font-weight: 700;
  font-size: 0.9rem;
}

.remove-voucher-btn {
  background: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1rem;
}

.summary-details {
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #666;
}

.summary-row.total {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-color);
  padding-top: 1rem;
  border-top: 2px solid #eee;
  margin-top: 1rem;
}

.summary-row.total .amount {
  color: var(--secondary-color);
  font-size: 1.5rem;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: var(--secondary-color);
  color: var(--white);
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.checkout-btn:hover {
  background: #e69500;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 165, 0, 0.3);
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.continue-shopping {
  text-align: center;
  margin-top: 1rem;
}

.continue-shopping a {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
}

.continue-shopping a:hover {
  color: var(--primary-color);
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow);
}

.empty-cart-icon {
  font-size: 5rem;
  color: #ddd;
  margin-bottom: 1.5rem;
}

.empty-cart h3 {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.empty-cart p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.empty-cart-btn {
  padding: 1rem 2.5rem;
  background: var(--secondary-color);
  color: var(--white);
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.empty-cart-btn:hover {
  background: #e69500;
  transform: translateY(-2px);
}

.suggested-products {
  margin-top: 4rem;
  padding-top: 4rem;
  border-top: 2px solid #ddd;
}

.suggested-products h3 {
  font-size: 2rem;
  color: var(--secondary-color);
  margin-bottom: 2rem;
  text-align: center;
}

@media (max-width: 968px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }

  .cart-item {
    flex-direction: column;
  }

  .cart-item-image {
    width: 100%;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .cart-header h2 {
    font-size: 2rem;
  }

  .cart-items {
    padding: 1rem;
  }

  .cart-item {
    padding: 1rem 0;
  }

  .voucher-input-group {
    flex-direction: column;
  }
}
</style>
