<template>
  <div class="register-wrapper">
    <div class="register-container">
      <div class="register-header">
        <div class="logo">Xẻng Vàng</div>
        <h1>Đăng Ký Tài Khoản</h1>
        <p>Tạo tài khoản mới để bắt đầu mua sắm</p>
      </div>

      <div v-if="errorMessage" class="error-message">
        <i class="bi bi-exclamation-circle"></i> {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="success-message">
        <i class="bi bi-check-circle"></i> {{ successMessage }}
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="name">Họ và tên</label>
            <div class="input-icon">
              <i class="bi bi-person-fill"></i>
              <input
                v-model="formData.name"
                type="text"
                id="name"
                class="form-input"
                placeholder="Nhập họ và tên"
                required
                :disabled="isLoading"
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <div class="input-icon">
            <i class="bi bi-envelope-fill"></i>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="form-input"
              placeholder="Nhập email"
              required
              :disabled="isLoading"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="phone">Số điện thoại</label>
          <div class="input-icon">
            <i class="bi bi-phone-fill"></i>
            <input
              v-model="formData.phone"
              type="tel"
              id="phone"
              class="form-input"
              placeholder="Nhập số điện thoại"
              required
              :disabled="isLoading"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Mật khẩu</label>
          <div class="input-icon">
            <i class="bi bi-lock-fill"></i>
            <input
              v-model="formData.password"
              type="password"
              id="password"
              class="form-input"
              placeholder="Nhập mật khẩu"
              required
              @input="checkPasswordStrength"
              :disabled="isLoading"
            />
          </div>
          <div
            v-if="passwordStrength"
            :class="['password-strength', passwordStrengthClass]"
          >
            {{ passwordStrength }}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="confirmPassword"
            >Xác nhận mật khẩu</label
          >
          <div class="input-icon">
            <i class="bi bi-lock-fill"></i>
            <input
              v-model="formData.confirmPassword"
              type="password"
              id="confirmPassword"
              class="form-input"
              placeholder="Nhập lại mật khẩu"
              required
              :disabled="isLoading"
            />
          </div>
        </div>

        <div class="terms-checkbox">
          <input v-model="agreeTerms" type="checkbox" id="terms" required />
          <label for="terms">
            Tôi đồng ý với
            <a href="#" @click.prevent>Điều khoản dịch vụ</a>
            và
            <a href="#" @click.prevent>Chính sách bảo mật</a>
          </label>
        </div>

        <button type="submit" class="register-btn" :disabled="isLoading">
          <span v-if="!isLoading">
            <i class="bi bi-person-plus"></i> Đăng Ký
          </span>
          <span v-else>
            <i class="bi bi-hourglass-split"></i> Đang xử lý...
          </span>
        </button>
      </form>

      <div class="login-link">
        <p>Đã có tài khoản?</p>
        <router-link to="/login" class="login-link-btn">
          <i class="bi bi-box-arrow-in-right"></i> Đăng nhập ngay
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const agreeTerms = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);
const passwordStrength = ref("");

const passwordStrengthClass = computed(() => {
  if (!passwordStrength.value) return "";
  if (passwordStrength.value.includes("Yếu")) return "weak";
  if (passwordStrength.value.includes("Trung")) return "medium";
  if (passwordStrength.value.includes("Mạnh")) return "strong";
  return "";
});

const checkPasswordStrength = () => {
  const pwd = formData.value.password;
  if (!pwd) {
    passwordStrength.value = "";
    return;
  }

  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

  if (strength < 2) passwordStrength.value = "⚠️ Mật khẩu yếu";
  else if (strength < 4) passwordStrength.value = "✓ Mật khẩu trung bình";
  else passwordStrength.value = "✓✓ Mật khẩu mạnh";
};

const handleRegister = async () => {
  // Validation
  if (
    !formData.value.name ||
    !formData.value.email ||
    !formData.value.phone ||
    !formData.value.password
  ) {
    errorMessage.value = "Vui lòng điền đầy đủ thông tin";
    return;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = "Mật khẩu xác nhận không khớp";
    return;
  }

  if (!agreeTerms.value) {
    errorMessage.value = "Vui lòng đồng ý với điều khoản dịch vụ";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    // Create account via API
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.value.email,
        password: formData.value.password,
        name: formData.value.name,
        phone: formData.value.phone,
        role: "customer",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Đăng ký thất bại");
    }

    const user = await response.json();

    // Save user to localStorage automatically after registration
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

    successMessage.value = "Đăng ký thành công! Đang chuyển đến trang chủ...";

    // Redirect to home page after 2 seconds (already logged in)
    setTimeout(() => {
      router.push("/");
    }, 2000);
  } catch (error) {
    errorMessage.value = error.message || "Đã xảy ra lỗi, vui lòng thử lại";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.register-wrapper {
  font-family: "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: linear-gradient(135deg, #fefae0 0%, #f7d488 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.register-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
}

.register-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #ff6b6b 0%, #ffa500 100%);
}

.register-header {
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

.register-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.register-header p {
  color: #999;
  font-size: 0.95rem;
  font-weight: 500;
}

.register-form {
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

.form-row {
  display: grid;
  grid-template-columns: 1fr;
}

.password-strength {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 600;
}

.password-strength.weak {
  color: #e74c3c;
}

.password-strength.medium {
  color: #f39c12;
}

.password-strength.strong {
  color: #2ecc71;
}

.terms-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.terms-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-top: 0.3rem;
  flex-shrink: 0;
  accent-color: #ffa500;
}

.terms-checkbox a {
  color: #ffa500;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.terms-checkbox a:hover {
  color: #ff6b6b;
}

.register-btn {
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

.register-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.4);
}

.register-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.register-btn:disabled {
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

.success-message {
  background: #dfd;
  color: #3c3;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-left: 4px solid #3c3;
  animation: slideDown 0.3s ease-out;
}

.success-message i {
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

.login-link {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.login-link p {
  color: #999;
  margin-bottom: 0.8rem;
  margin-top: 0;
  font-size: 0.9rem;
}

.login-link-btn {
  color: #ffa500;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.login-link-btn:hover {
  color: #ff6b6b;
}

@media (max-width: 480px) {
  .register-container {
    padding: 2.5rem 1.5rem;
    border-radius: 16px;
  }

  .logo {
    font-size: 2.2rem;
  }

  .register-header h1 {
    font-size: 1.5rem;
  }

  .form-input {
    padding: 0.8rem 1rem 0.8rem 2.5rem;
  }

  .register-btn {
    padding: 0.95rem;
    font-size: 1rem;
  }
}
</style>
