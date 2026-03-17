<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

// --- KHAI BÁO BIẾN (STATE) ---
const isLoading = ref(false);
const router = useRouter();

// Dữ liệu API
const allProducts = ref([]);
const categories = ref([]); // Đã tách riêng để tránh lỗi undefined

// UI State
const selectedCategory = ref("all");
const bestSellerType = ref("month");

// Biến DOM (Khởi tạo là null, sẽ gán giá trị khi mounted)
let mousePan = null;
let mouseSpatula = null;
let scrollTopBtn = null;

// --- LOGIC MAP DỮ LIỆU ---
const mapProductToTemplate = (product, categoryMap) => {
  // Convert category name to code using the categoryMap
  let categoryCode = "all";
  if (product.category) {
    const foundCat = categoryMap.find(
      (cat) => cat.name.toLowerCase() === product.category.toLowerCase()
    );
    categoryCode = foundCat ? foundCat.code : product.category.toLowerCase();
  }

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image || product.img || "", // Support both "image" and "img" field names
    category: categoryCode,
    soldCount: product.soldCount,
  };
};

// Helper: resolve image paths to full URL
const resolveImage = (path) => {
  if (!path) return "https://via.placeholder.com/300x250?text=No+Image";
  if (typeof path !== "string")
    return "https://via.placeholder.com/300x250?text=No+Image";

  const val = path.trim();
  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  // Extract filename from various path formats
  // "./img/products/xxx.jpg" or "img/products/xxx.jpg" or just "xxx.jpg"
  let filename = "";
  const parts = val.split("/");
  filename = parts[parts.length - 1]; // Get last part (filename)

  // Return URL pointing to backend image endpoint
  return `http://localhost:3000/img/products/${filename}`;
};

// --- LOGIC API (FIXED) ---
const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const rawData = await response.json();

    // Xử lý dữ liệu trả về (Giả sử API trả về mảng 1 phần tử như code cũ)
    const dataRoot = Array.isArray(rawData) ? rawData[0] : rawData;

    // 2. Lấy danh mục (Map từ categories array, filter ra chỉ các short codes)
    const categoryList = (dataRoot?.categories || [])
      .filter(
        (cat) =>
          cat.code && typeof cat.code === "string" && cat.code.length < 20
      )
      .map((cat) => ({
        code: cat.code.toLowerCase(),
        name: cat.name,
      }));

    categories.value = categoryList;

    // 1. Lấy danh sách sản phẩm (cần categoryList để map category)
    const apiProducts = dataRoot?.bestSelling || [];
    allProducts.value = apiProducts.map((product) =>
      mapProductToTemplate(product, categoryList)
    );

    console.log("Products loaded:", allProducts.value);
    console.log("Categories loaded:", categories.value);
  } catch (err) {
    console.error("Lỗi tải dữ liệu:", err);
    // Dữ liệu giả phòng khi API lỗi để test giao diện
    categories.value = [
      { code: "chao", name: "Chảo (Demo)" },
      { code: "dao", name: "Dao (Demo)" },
    ];
  } finally {
    isLoading.value = false;
  }
};

// --- COMPUTED ---
const filteredProducts = computed(() => {
  if (selectedCategory.value === "all") return allProducts.value;
  return allProducts.value.filter((p) => p.category === selectedCategory.value);
});

const bestSellers = computed(() =>
  [...allProducts.value]
    .sort(
      (a, b) =>
        (b.soldCount?.[bestSellerType.value] || 0) -
        (a.soldCount?.[bestSellerType.value] || 0)
    )
    .slice(0, 4)
);

// --- CÁC HÀM SỰ KIỆN ---
function selectCategory(code) {
  selectedCategory.value = code;
}

function selectBestSeller(type) {
  bestSellerType.value = type;
}

function addToCart(product) {
  try {
    const raw = localStorage.getItem("cart") || "[]";
    const cart = JSON.parse(raw);
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  } catch (e) {
    console.error("Lỗi lưu giỏ hàng:", e);
  }
}

// Hàm xử lý di chuyển chuột (Parallax)
const handleMouseMove = (e) => {
  if (!mousePan || !mouseSpatula) return; // Kiểm tra tồn tại trước khi chạy

  const { clientX, clientY } = e;
  const x = (clientX / window.innerWidth - 0.5) * -80;
  const y = (clientY / window.innerHeight - 0.5) * -80;

  mousePan.style.transform = `translate(${x * 0.5}px, ${
    y * 0.5
  }px) rotate(15deg)`;
  mouseSpatula.style.transform = `translate(${x}px, ${y}px) rotate(-15deg)`;
};

// Hàm xử lý cuộn trang (Hiện/Ẩn nút)
const handleScroll = () => {
  if (!scrollTopBtn) return; // Kiểm tra tồn tại

  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
};

// Hàm click nút lên đầu trang
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// --- LIFECYCLE (QUAN TRỌNG) ---
onMounted(() => {
  console.log("Mounted: Bắt đầu gán DOM và API...");

  // 1. Gọi API
  fetchData();

  // 2. Gán DOM Elements (Lúc này HTML đã vẽ xong nên không bị null)
  mousePan = document.getElementById("mouse-pan");
  mouseSpatula = document.getElementById("mouse-spatula");
  scrollTopBtn = document.getElementById("scrollTopBtn");

  // 3. Đăng ký sự kiện
  document.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("scroll", handleScroll);
  window.onscroll = function () {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  };

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
</script>

<template>
  <main>
    <section class="hero">
      <div class="container hero-content">
        <img
          src="./img/Screenshot_5-Photoroom.png"
          alt="Chảo"
          class="mouse-utensil"
          id="mouse-pan"
        />
        <img
          src="./img/xẻng vàng.png"
          alt="Sẻn Vàng"
          class="mouse-utensil"
          id="mouse-spatula"
        />

        <h2>Tuyệt Tác Bếp, Tuyệt Tác Bền Bỉ</h2>
        <p>Trải nghiệm sự khác biệt từ những dụng cụ được chế tác hoàn hảo.</p>

        <div class="hero-features">
          <div class="hero-feature-item">
            <i class="bi bi-gem"></i>
            <span>Vật Liệu Cao Cấp</span>
          </div>
          <div class="hero-feature-item">
            <i class="bi bi-shield-check"></i>
            <span>An Toàn Sức Khỏe</span>
          </div>
          <div class="hero-feature-item">
            <i class="bi bi-star"></i>
            <span>Thiết Kế Tinh Tế</span>
          </div>
        </div>

        <a href="#categories-section" class="hero-cta-btn">Xem Sản Phẩm</a>
      </div>
      <a href="#categories-section" class="scroll-down-link">
        <i class="bi bi-arrow-down-circle"></i>
      </a>
    </section>

    <section class="categories reveal-on-scroll" id="categories-section">
      <div class="container">
        <h3>Danh Mục Sản Phẩm</h3>
        <div class="category-filters">
          <button
            class="filter-btn"
            :class="{ active: selectedCategory === 'all' }"
            @click.prevent="selectCategory('all')"
          >
            Tất Cả
          </button>

          <button
            v-for="cat in categories"
            :key="cat.code"
            class="filter-btn"
            :class="{ active: selectedCategory === cat.code }"
            @click.prevent="selectCategory(cat.code)"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </section>

    <div
      v-if="isLoading"
      class="container"
      style="text-align: center; padding: 20px"
    >
      Đang tải dữ liệu...
    </div>

    <section v-else class="product-display reveal-on-scroll">
      <div class="container">
        <div class="product-grid" id="product-grid">
          <div
            v-for="product in filteredProducts.slice(0, 6)"
            :key="product.id"
            class="product-card"
          >
            <img
              :src="resolveImage(product.image)"
              :alt="product.name"
              class="product-image"
              @error="
                $event.target.src =
                  'https://via.placeholder.com/300x250?text=No+Image'
              "
            />
            <div class="product-info">
              <div>
                <h4 class="product-name">{{ product.name }}</h4>
                <p class="product-price">{{ product.price }}</p>
              </div>
              <button
                class="add-to-cart-btn"
                @click.prevent="addToCart(product)"
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="special-offer reveal-on-scroll">
      <div class="container">
        <h4>Ưu đãi độc quyền</h4>
        <h2>Giảm giá 30% cho toàn bộ sản phẩm Dao Bếp</h2>
        <p>
          Nâng tầm kỹ năng nấu nướng của bạn với bộ dao sắc bén từ xẻng Vàng.
          <br />Chương trình chỉ diễn ra trong tháng này!
        </p>
        <a href="#" class="cta-button">Mua Ngay</a>
      </div>
    </section>

    <section class="testimonials reveal-on-scroll">
      <div class="container">
        <h3 class="section-title">Khách Hàng Nói Gì Về xẻng Vàng</h3>
        <div class="testimonial-grid">
          <div class="testimonial-card">
            <p>
              "Sản phẩm tuyệt vời, chất lượng đúng như quảng cáo. Chảo chống
              dính rất tốt, tôi rất hài lòng và sẽ ủng hộ shop lâu dài."
            </p>
            <h4>- Chị An Nhiên, TP.HCM</h4>
          </div>
          <div class="testimonial-card">
            <p>
              "Giao hàng nhanh, đóng gói cẩn thận. Bộ dao rất sắc bén và cầm
              chắc tay. Cảm ơn xẻng Vàng đã mang đến sản phẩm tốt."
            </p>
            <h4>- Anh Minh Quân, Hà Nội</h4>
          </div>
          <div class="testimonial-card">
            <p>
              "Tôi đã mua bộ bát đĩa làm quà tân gia, ai cũng khen đẹp và sang
              trọng. Chắc chắn sẽ giới thiệu cho bạn bè và người thân."
            </p>
            <h4>- Cô Thanh Mai, Đà Nẵng</h4>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
