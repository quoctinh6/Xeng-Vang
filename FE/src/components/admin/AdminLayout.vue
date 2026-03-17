<script setup>
import "./admin-style.css";
</script>

<template>
  <div class="admin-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">Admin</div>
      </div>
      <ul class="sidebar-menu">
        <li>
          <router-link to="/admin" class="nav-link">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/admin/orders" class="nav-link">Orders</router-link>
        </li>
        <li>
          <router-link to="/admin/products" class="nav-link"
            >Products</router-link
          >
        </li>
        <li>
          <router-link to="/admin/users" class="nav-link">Users</router-link>
        </li>
        <li>
          <router-link to="/admin/vouchers" class="nav-link"
            >Vouchers</router-link
          >
        </li>
      </ul>
    </aside>

    <main class="main-content">
      <div class="top-bar">
        <div class="page-title">Admin Panel</div>
      </div>

      <router-view />
    </main>
  </div>
</template>

<style scoped>
.nav-link {
  color: inherit;
  text-decoration: none;
}
</style>
