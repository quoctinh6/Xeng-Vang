<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);
const currentUser = ref(null);

// Check login status on mount
onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      currentUser.value = JSON.parse(user);
      isLoggedIn.value = true;
    } catch (e) {
      isLoggedIn.value = false;
    }
  }
});

function handleUserClick() {
  if (isLoggedIn.value) {
    // Already logged in - show logout confirmation
    if (confirm(`Đăng xuất tài khoản ${currentUser.value?.name}?`)) {
      logout();
    }
  } else {
    // Not logged in - go to login
    router.push("/login");
  }
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  currentUser.value = null;
  isLoggedIn.value = false;
  alert("Đã đăng xuất");
  router.push("/");
}
</script>

<template>
  <header>
    <div class="container">
      <h1 class="logo">Xẻng Vàng</h1>
      <nav>
        <ul>
          <li><router-link to="/">Trang Chủ</router-link></li>
          <li><router-link to="/product">Sản Phẩm</router-link></li>
          <li><router-link to="/sale">Khuyến Mãi</router-link></li>
          <li><router-link to="/about">Về Chúng Tôi</router-link></li>
          <li>
            <router-link to="/order-history">Lịch sử mua hàng</router-link>
          </li>
          <li><router-link to="/contact">Liên Hệ</router-link></li>
        </ul>
      </nav>
      <div class="header-icons">
        <i class="bi bi-search"></i>
        <router-link to="/cart"><i class="bi bi-cart3"></i></router-link>
        <button
          @click="handleUserClick"
          style="
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            color: inherit;
          "
          :title="isLoggedIn ? `Đăng xuất (${currentUser?.name})` : 'Đăng nhập'"
        >
          <i class="bi bi-person-circle"></i>
        </button>
      </div>
    </div>
  </header>
</template>
