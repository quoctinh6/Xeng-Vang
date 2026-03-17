<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-header">
        <div class="logo">Xẻng Vàng</div>
        <h1>Đăng Nhập</h1>
        <p>Vui lòng đăng nhập để tiếp tục</p>
      </div>

      <div v-if="errorMessage" class="error-message">
        <i class="bi bi-exclamation-circle"></i> {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <div class="input-icon">
            <i class="bi bi-envelope-fill"></i>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-input"
              placeholder="Nhập email"
              required
              autofocus
              :disabled="isLoading"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Mật khẩu</label>
          <div class="input-icon">
            <i class="bi bi-lock-fill"></i>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-input"
              placeholder="Nhập mật khẩu"
              required
              :disabled="isLoading"
            />
          </div>
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="!isLoading">
            <i class="bi bi-box-arrow-in-right"></i> Đăng Nhập
          </span>
          <span v-else>
            <i class="bi bi-hourglass-split"></i> Đang xử lý...
          </span>
        </button>
      </form>

      <div class="back-to-site">
        <p class="signup-prompt">Chưa có tài khoản?</p>
        <div class="links-container">
          <router-link to="/register" class="back-link signup-link">
            <i class="bi bi-person-plus"></i> Đăng ký
          </router-link>
          <span class="divider">|</span>
          <router-link to="/" class="back-link home-link">
            <i class="bi bi-arrow-left"></i> Quay lại
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Vui lòng nhập email và mật khẩu";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    // Fetch all users from API
    const response = await fetch("http://localhost:3000/api/users");
    if (!response.ok) {
      throw new Error("Không thể kết nối đến server");
    }

    const users = await response.json();

    // Simple authentication: find user by email and password match
    const user = users.find(
      (u) => u.email === email.value && u.password === password.value
    );

    if (!user) {
      errorMessage.value = "Email hoặc mật khẩu không đúng";
      isLoading.value = false;
      return;
    }

    // Save user to localStorage for both admin and customer
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: user._id,
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      })
    );
    localStorage.setItem("token", user._id);

    // Redirect based on user role
    if (user.role === "admin") {
      router.push("/admin");
    } else {
      // Redirect regular customers to home page
      router.push("/");
    }
  } catch (error) {
    errorMessage.value = error.message || "Đã xảy ra lỗi, vui lòng thử lại";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-wrapper {
  font-family: "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: linear-gradient(135deg, #fefae0 0%, #f7d488 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 3rem;
  width: 100%;
  max-width: 420px;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #ff6b6b 0%, #ffa500 100%);
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo {
  font-size: 2.8rem;
  color: #ff6b6b;
  font-weight: 900;
  margin-bottom: 0.75rem;
  letter-spacing: -1px;
}

.login-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.login-header p {
  color: #999;
  font-size: 0.95rem;
  font-weight: 500;
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
}

.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #bbb;
  font-size: 1.1rem;
}

.form-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: "Quicksand", sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fafafa;
}

.form-input:focus {
  outline: none;
  border-color: #ffa500;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
}

.form-input:disabled {
  background: #f5f5f5;
  color: #ccc;
  cursor: not-allowed;
}

.login-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.4);
}

.login-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.login-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-left: 4px solid #c33;
  animation: slideDown 0.3s ease-out;
}

.error-message i {
  font-size: 1.1rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-to-site {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.signup-prompt {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  margin-top: 0;
}

.links-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.back-link {
  color: #ffa500;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.back-link:hover {
  color: #ff6b6b;
}

.signup-link {
  color: #ffa500;
}

.signup-link:hover {
  color: #ff6b6b;
}

.home-link {
  color: #999;
  font-weight: 600;
}

.home-link:hover {
  color: #ffa500;
}

.divider {
  color: #ddd;
  font-weight: 300;
}

@media (max-width: 480px) {
  .login-container {
    padding: 2.5rem 1.5rem;
    border-radius: 16px;
  }

  .logo {
    font-size: 2.2rem;
  }

  .login-header h1 {
    font-size: 1.5rem;
  }

  .form-input {
    padding: 0.8rem 1rem 0.8rem 2.5rem;
  }

  .login-btn {
    padding: 0.95rem;
    font-size: 1rem;
  }
}
</style>
