<template>
  <main>
    <div class="breadcrumb">
      <div class="breadcrumb-content container">
        <a href="index.html">Trang Chủ</a>
        <i class="bi bi-chevron-right"></i>
        <a href="cart.html">Giỏ Hàng</a>
        <i class="bi bi-chevron-right"></i>
        <span>Thanh Toán</span>
      </div>
    </div>

    <section class="checkout-section">
      <div class="container">
        <div class="checkout-layout">
          <div class="order-summary">
            <h2 class="section-title">Tóm Tắt Đơn Hàng</h2>

            <div id="summary-cart-items" class="summary-cart-items">
              <!-- Cart items will be dynamically inserted here -->
            </div>

            <div class="summary-calculation">
              <div class="summary-row">
                <span>Tạm tính</span>
                <span id="summary-subtotal">0đ</span>
              </div>
              <div class="summary-row">
                <span>Phí vận chuyển</span>
                <span id="summary-shipping">30,000đ</span>
              </div>
              <div id="discount-row" class="summary-row" style="display: none">
                <span>Giảm giá</span>
                <span id="summary-discount" style="color: #4caf50"></span>
              </div>
              <div class="summary-row total">
                <span>Tổng cộng</span>
                <span id="summary-total">30,000đ</span>
              </div>
            </div>

            <button id="place-order-btn" class="place-order-btn">
              <i class="bi bi-bag-check-fill"></i>
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";

const checkoutData = ref({
  items: [],
  subtotal: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  appliedVoucher: null,
});

onMounted(() => {
  try {
    const data = localStorage.getItem("checkoutData");
    if (data) {
      checkoutData.value = JSON.parse(data);
      renderCartItems();
      updateSummary();
      setupOrderButton();
    }
  } catch (e) {
    console.error("Error loading checkout data:", e);
  }
});

function renderCartItems() {
  const itemsContainer = document.getElementById("summary-cart-items");
  itemsContainer.innerHTML = "";

  checkoutData.value.items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "summary-item";
    itemElement.innerHTML = `
      <div class="item-name">${item.name}</div>
      <div class="item-details">
        <span>x${item.qty}</span>
        <span>${formatPrice(parsePrice(item.price) * item.qty)}</span>
      </div>
    `;
    itemsContainer.appendChild(itemElement);
  });
}

function updateSummary() {
  document.getElementById("summary-subtotal").textContent = formatPrice(
    checkoutData.value.subtotal
  );
  document.getElementById("summary-shipping").textContent = formatPrice(
    checkoutData.value.shipping
  );
  document.getElementById("summary-total").textContent = formatPrice(
    checkoutData.value.total
  );

  // Show discount if applicable
  if (checkoutData.value.discount > 0) {
    document.getElementById("discount-row").style.display = "flex";
    document.getElementById("summary-discount").textContent = `-${formatPrice(
      checkoutData.value.discount
    )}`;
  }
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  return Number(String(priceStr).replace(/[^0-9]/g, "")) || 0;
}

function formatPrice(n) {
  if (n == null) return "0đ";
  return Number(n).toLocaleString("vi-VN") + "đ";
}

function setupOrderButton() {
  const placeOrderBtn = document.getElementById("place-order-btn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", async () => {
      try {
        // Get current user from localStorage
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        if (!user) {
          alert("Vui lòng đăng nhập để tạo đơn hàng");
          return;
        }

        // Process items - convert price to number
        const processedItems = checkoutData.value.items.map((item) => ({
          ...item,
          price: parsePrice(item.price),
        }));

        // Create order object matching backend expectations
        const orderData = {
          userId: user.userId,
          items: processedItems,
          total: checkoutData.value.total,
          status: "pending",
        };

        console.log("Sending order data:", orderData);

        // Send to API
        const response = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const responseData = await response.json();

        if (!response.ok) {
          console.error("API error:", responseData);
          throw new Error(responseData.error || "Lỗi khi tạo đơn hàng");
        }

        console.log("Order created:", responseData);

        alert("Đơn hàng đã được tạo thành công!");

        // Clear checkout data and cart
        localStorage.removeItem("checkoutData");
        localStorage.removeItem("cart");

        // Redirect to home
        window.location.href = "/";
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Có lỗi xảy ra: " + error.message);
      }
    });
  }
}
</script>

<style scoped>
main {
  padding: 2rem 0 4rem;
  background: #fefae0;
  min-height: 100vh;
}

.breadcrumb {
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.breadcrumb-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb a {
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #e69500;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.checkout-section {
  padding: 2rem 0;
}

.checkout-layout {
  display: flex;
  justify-content: center;
}

.order-summary {
  background: var(--white);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 2rem;
  text-align: center;
}

.summary-cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
  max-height: 400px;
  overflow-y: auto;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.item-name {
  font-weight: 700;
  color: var(--text-color);
  flex: 1;
  font-size: 0.95rem;
}

.item-details {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
}

.item-details span:last-child {
  color: var(--secondary-color);
  font-weight: 700;
  min-width: 100px;
  text-align: right;
}

.summary-calculation {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #666;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-color);
  padding-top: 1rem;
  border-top: 2px solid #eee;
  margin-top: 1rem;
}

.summary-row.total span:last-child {
  color: var(--secondary-color);
  font-size: 1.4rem;
}

.place-order-btn {
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

.place-order-btn:hover {
  background: #e69500;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 165, 0, 0.3);
}

.place-order-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .order-summary {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
}
</style>
