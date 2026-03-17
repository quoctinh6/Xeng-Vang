<script setup>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

// If any matched route has meta.layout === 'admin' we treat it as admin area
const isAdminArea = computed(() =>
  route.matched.some((r) => r.meta && r.meta.layout === "admin")
);
</script>

<template>
  <Header v-if="!isAdminArea" />
  <router-view />
  <Footer v-if="!isAdminArea" />
</template>
