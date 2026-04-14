<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const products = ref([]);
const categories = ref([]);
const selectedCategory = ref("all");
const isLoading = ref(false);

// Helper: resolve image paths to full URL
const resolveImage = (path) => {
  if (!path) return "https://via.placeholder.com/280x220?text=No+Image";
  if (typeof path !== "string")
    return "https://via.placeholder.com/280x220?text=No+Image";

  const val = path.trim();
  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  let filename = "";
  const parts = val.split("/");
  filename = parts[parts.length - 1];

  return `http://localhost:3000/img/products/${filename}`;
};

// Fetch products from API
const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const rawData = await response.json();

    const dataRoot = Array.isArray(rawData) ? rawData[0] : rawData;

    // Get categories
    const categoryList = (dataRoot?.categories || [])
      .map((cat) => ({
        code: (cat.code || cat.id || String(cat._id || "")).toLowerCase(),
        name: cat.name,
      }))
      .filter((cat) => cat.code && cat.name);

    categories.value = categoryList;

    // Get products and map category
    const apiProducts = dataRoot?.bestSelling || [];
    const mappedProducts = apiProducts.map((product) => {
      let categoryCode = "all";
      if (product.category) {
        const pCat = String(product.category).toLowerCase();
        const foundCat = categoryList.find(
          (cat) => 
            cat.name.toLowerCase() === pCat || 
            cat.code.toLowerCase() === pCat
        );
        categoryCode = foundCat ? foundCat.code : pCat;
      }

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.img || "",
        category: categoryCode,
        soldCount: product.soldCount,
      };
    });

    products.value = mappedProducts;

    // Add counts to categories
    categories.value = categoryList.map(cat => ({
      ...cat,
      count: mappedProducts.filter(p => p.category === cat.code).length
    }));

    console.log("Products loaded:", products.value);
  } catch (err) {
    console.error("Error loading products:", err);
  } finally {
    isLoading.value = false;
  }
};

// Computed: filtered products by category
const filteredProducts = computed(() => {
  if (selectedCategory.value === "all") return products.value;
  return products.value.filter((p) => p.category === selectedCategory.value);
});

// View product detail
const viewProductDetail = (product) => {
  // Store product data in sessionStorage for detail page
  sessionStorage.setItem("selectedProduct", JSON.stringify(product));
  // Navigate to detail page
  router.push({
    name: "ProductDetail",
    params: { id: product.id },
  });
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <main>
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <div class="breadcrumb-content">
        <router-link to="/">Trang Chủ</router-link>
        <i class="bi bi-chevron-right"></i>
        <span>Sản Phẩm</span>
      </div>
    </div>

    <section class="product-page reveal-on-scroll">
      <div class="container product-page-container">
        <!-- Sidebar bên trái -->
        <aside class="sidebar">
          <h4>Danh Mục</h4>
          <ul>
            <li>
              <a
                @click.prevent="selectedCategory = 'all'"
                :class="{ active: selectedCategory === 'all' }"
                class="category-link"
              >
                <span class="category-name">Tất Cả</span>
                <span class="category-count">{{ products.length }}</span>
              </a>
            </li>
            <li v-for="cat in categories" :key="cat.code">
              <a
                @click.prevent="selectedCategory = cat.code"
                :class="{ active: selectedCategory === cat.code }"
                class="category-link"
              >
                <span class="category-name">{{ cat.name }}</span>
                <span class="category-count">{{ cat.count || 0 }}</span>
              </a>
            </li>
          </ul>
        </aside>

        <!-- Nội dung chính: Grid sản phẩm -->
        <div class="main-content">
          <h3 class="section-title">Sản Phẩm</h3>

          <div v-if="isLoading" style="text-align: center; padding: 20px">
            Đang tải dữ liệu...
          </div>

          <div v-else class="product-grid">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-card"
              @click="viewProductDetail(product)"
              style="cursor: pointer"
            >
              <img
                :src="resolveImage(product.image)"
                :alt="product.name"
                class="product-image"
                @error="
                  $event.target.src =
                    'https://via.placeholder.com/280x220?text=No+Image'
                "
              />
              <div class="product-info">
                <h4 class="product-name">{{ product.name }}</h4>
                <p class="product-price">{{ product.price }}</p>
              </div>
            </div>
          </div>

          <div
            v-if="!isLoading && filteredProducts.length === 0"
            style="text-align: center; padding: 40px; color: #666"
          >
            Không có sản phẩm nào
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 2rem 0 4rem;
  background: #fefae0;
  min-height: 100vh;
}

.breadcrumb {
  padding: 1rem 0;
  background: var(--white);
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
  color: #e69500;
}

.breadcrumb i {
  font-size: 0.8rem;
}

.product-page {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.product-page-container {
  display: flex;
  gap: 2rem;
}

.sidebar {
  width: 250px;
  background: var(--white);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
  font-weight: 700;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 0.75rem;
}

.sidebar a {
  text-decoration: none;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  margin-bottom: 0.25rem;
  border: 1px solid transparent;
}

.sidebar a:hover {
  color: var(--secondary-color);
  background: rgba(255, 165, 0, 0.05);
  border-color: rgba(255, 165, 0, 0.1);
}

.sidebar a.active {
  color: var(--white);
  font-weight: 700;
  background: var(--secondary-color);
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
}

.category-count {
  font-size: 0.8rem;
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 8px;
  border-radius: 20px;
  color: #888;
  transition: all 0.3s ease;
}

.sidebar a.active .category-count {
  background: rgba(255, 255, 255, 0.2);
  color: var(--white);
}

.sidebar a:hover .category-count {
  background: rgba(255, 165, 0, 0.1);
  color: var(--secondary-color);
}

.main-content {
  flex: 1;
}

.section-title {
  font-size: 2rem;
  color: var(--secondary-color);
  margin-bottom: 2rem;
  font-weight: 700;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: var(--white);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  min-height: 2.8em;
}

.product-price {
  font-size: 1.2rem;
  color: var(--secondary-color);
  font-weight: 700;
  margin: 0;
}

@media (max-width: 768px) {
  .product-page-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
}
</style>
