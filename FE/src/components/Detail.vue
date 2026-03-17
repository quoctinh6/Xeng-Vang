<template>
    <main>
        <!-- Breadcrumb -->
        <div class="breadcrumb">
            <div class="breadcrumb-content">
                <a href="index.html">Trang Chủ</a>
                <i class="bi bi-chevron-right"></i>
                <a href="san-pham.html">Sản Phẩm</a>
                <i class="bi bi-chevron-right"></i>
                <span>Chi Tiết Sản Phẩm</span>
            </div>
        </div>

        <!-- Product Detail Section -->
        <section class="product-detail-section">
            <div class="product-detail-container">
                <div class="product-detail-grid">
                    <!-- Product Images -->
                    <div class="product-images">
                        <img src="https://via.placeholder.com/600x500.png?text=Sản+Phẩm" alt="Sản phẩm"
                            class="main-image" id="mainImage">
                        <div class="thumbnail-images">
                            <img src="https://via.placeholder.com/100x100.png?text=1" alt="Hình 1"
                                class="thumbnail active" onclick="changeImage(this.src)">
                            <img src="https://via.placeholder.com/100x100.png?text=2" alt="Hình 2" class="thumbnail"
                                onclick="changeImage(this.src)">
                            <img src="https://via.placeholder.com/100x100.png?text=3" alt="Hình 3" class="thumbnail"
                                onclick="changeImage(this.src)">
                            <img src="https://via.placeholder.com/100x100.png?text=4" alt="Hình 4" class="thumbnail"
                                onclick="changeImage(this.src)">
                        </div>
                    </div>

                    <!-- Product Info -->
                    <div class="product-info">
                        <h1 class="product-title">Chảo Chống Dính Cao Cấp 28cm</h1>

                        <div class="product-rating">
                            <div class="stars">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-half"></i>
                            </div>
                            <span class="rating-text">(4.5/5 - 128 đánh giá)</span>
                        </div>

                        <div class="product-price-section">
                            <div class="product-price">450,000đ</div>
                            <div>
                                <span class="product-old-price">550,000đ</span>
                                <span class="product-discount">-18%</span>
                            </div>
                        </div>

                        <p class="product-short-desc">
                            Chảo chống dính cao cấp với lớp phủ ceramic an toàn, không chứa PFOA. Thiết kế hiện đại,
                            dễ vệ sinh và bền bỉ. Phù hợp cho mọi loại bếp gas, điện, từ tính.
                        </p>

                        <!-- Product Options -->
                        <div class="product-options">
                            <div class="option-group">
                                <label class="option-label">Kích thước:</label>
                                <div class="option-buttons">
                                    <button class="option-btn active">24cm</button>
                                    <button class="option-btn">28cm</button>
                                    <button class="option-btn">32cm</button>
                                </div>
                            </div>
                            <div class="option-group">
                                <label class="option-label">Màu sắc:</label>
                                <div class="option-buttons">
                                    <button class="option-btn active">Đỏ</button>
                                    <button class="option-btn">Xanh</button>
                                    <button class="option-btn">Đen</button>
                                </div>
                            </div>
                        </div>

                        <!-- Quantity Selector -->
                        <div class="quantity-selector">
                            <label class="option-label">Số lượng:</label>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="decreaseQuantity()">-</button>
                                <input type="number" class="quantity-input" id="quantity" value="1" min="1" max="10">
                                <button class="quantity-btn" onclick="increaseQuantity()">+</button>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="action-buttons">
                            <button class="btn-primary" onclick="addToCart()">
                                <i class="bi bi-cart-plus"></i>
                                Thêm vào giỏ hàng
                            </button>
                        </div>

                        <!-- Product Features -->
                        <div class="product-features">
                            <div class="feature-item">
                                <i class="bi bi-truck feature-icon"></i>
                                <span class="feature-text">Miễn phí vận chuyển cho đơn hàng trên 500,000đ</span>
                            </div>
                            <div class="feature-item">
                                <i class="bi bi-shield-check feature-icon"></i>
                                <span class="feature-text">Bảo hành 12 tháng chính hãng</span>
                            </div>
                            <div class="feature-item">
                                <i class="bi bi-arrow-repeat feature-icon"></i>
                                <span class="feature-text">Đổi trả trong 7 ngày nếu không hài lòng</span>
                            </div>
                            <div class="feature-item">
                                <i class="bi bi-gift feature-icon"></i>
                                <span class="feature-text">Tặng kèm xẻng vàng khi mua combo</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product Tabs -->
                <div class="product-tabs">
                    <div class="tabs-header">
                        <button class="tab-btn active" onclick="switchTab('description')">Mô tả</button>
                        <button class="tab-btn" onclick="switchTab('specs')">Thông số kỹ thuật</button>
                        <button class="tab-btn" onclick="switchTab('reviews')">Đánh giá (128)</button>
                    </div>

                    <div id="description" class="tab-content active">
                        <h3>Mô Tả Sản Phẩm</h3>
                        <p>
                            Chảo chống dính cao cấp 28cm là sản phẩm được thiết kế đặc biệt cho các đầu bếp chuyên
                            nghiệp
                            và những người yêu thích nấu nướng. Với lớp phủ ceramic tiên tiến, chảo không chỉ chống dính
                            hiệu quả mà còn an toàn tuyệt đối cho sức khỏe.
                        </p>
                        <h3>Đặc điểm nổi bật:</h3>
                        <ul>
                            <li>Lớp phủ ceramic không chứa PFOA, an toàn cho sức khỏe</li>
                            <li>Đáy dày 5mm, giữ nhiệt tốt, tiết kiệm năng lượng</li>
                            <li>Tay cầm chống nóng, thiết kế ergonomic, cầm nắm thoải mái</li>
                            <li>Phù hợp với mọi loại bếp: gas, điện, từ tính</li>
                            <li>Dễ vệ sinh, có thể rửa bằng máy rửa bát</li>
                            <li>Thiết kế hiện đại, màu sắc đa dạng</li>
                        </ul>
                        <h3>Hướng dẫn sử dụng:</h3>
                        <ul>
                            <li>Rửa sạch chảo trước khi sử dụng lần đầu</li>
                            <li>Sử dụng muỗng gỗ hoặc silicon để bảo vệ lớp chống dính</li>
                            <li>Không nên để chảo quá nóng khi không có thức ăn</li>
                            <li>Vệ sinh bằng nước ấm và xà phòng nhẹ</li>
                        </ul>
                    </div>

                    <div id="specs" class="tab-content">
                        <h3>Thông Số Kỹ Thuật</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 1rem; font-weight: 700; color: var(--text-color);">Kích thước</td>
                                <td style="padding: 1rem; color: #666;">28cm (đường kính)</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 1rem; font-weight: 700; color: var(--text-color);">Chất liệu</td>
                                <td style="padding: 1rem; color: #666;">Nhôm cao cấp + Lớp phủ ceramic</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 1rem; font-weight: 700; color: var(--text-color);">Độ dày đáy</td>
                                <td style="padding: 1rem; color: #666;">5mm</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 1rem; font-weight: 700; color: var(--text-color);">Tay cầm</td>
                                <td style="padding: 1rem; color: #666;">Chống nóng, cách nhiệt</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 1rem; font-weight: 700; color: var(--text-color);">Trọng lượng</td>
                                <td style="padding: 1rem; color: #666;">850g</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 1rem; font-weight: 700; color: var(--text-color);">Bảo hành</td>
                                <td style="padding: 1rem; color: #666;">12 tháng</td>
                            </tr>
                            <tr>
                                <td style="padding: 1rem; font-weight: 700; color: var(--text-color);">Xuất xứ</td>
                                <td style="padding: 1rem; color: #666;">Việt Nam</td>
                            </tr>
                        </table>
                    </div>

                    <div id="reviews" class="tab-content">
                        <h3>Đánh Giá Sản Phẩm</h3>
                        <div class="reviews-section">
                            <div class="review-item">
                                <div class="review-header">
                                    <div>
                                        <div class="reviewer-name">Nguyễn Văn A</div>
                                        <div class="stars" style="font-size: 1rem; margin-top: 0.5rem;">
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                        </div>
                                    </div>
                                    <div class="review-date">15/01/2025</div>
                                </div>
                                <p>Sản phẩm rất tốt, chống dính hiệu quả, dễ vệ sinh. Giá cả hợp lý so với chất lượng.
                                    Giao hàng nhanh, đóng gói cẩn thận. Sẽ mua thêm sản phẩm khác của shop.</p>
                            </div>
                            <div class="review-item">
                                <div class="review-header">
                                    <div>
                                        <div class="reviewer-name">Trần Thị B</div>
                                        <div class="stars" style="font-size: 1rem; margin-top: 0.5rem;">
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-half"></i>
                                        </div>
                                    </div>
                                    <div class="review-date">12/01/2025</div>
                                </div>
                                <p>Chảo đẹp, màu sắc như hình. Chống dính tốt, nấu ăn không bị dính. Tay cầm chống nóng
                                    rất tiện. Chỉ có điều hơi nặng một chút nhưng vẫn chấp nhận được.</p>
                            </div>
                            <div class="review-item">
                                <div class="review-header">
                                    <div>
                                        <div class="reviewer-name">Lê Văn C</div>
                                        <div class="stars" style="font-size: 1rem; margin-top: 0.5rem;">
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                        </div>
                                    </div>
                                    <div class="review-date">10/01/2025</div>
                                </div>
                                <p>Tuyệt vời! Sản phẩm vượt mong đợi. Chất lượng tốt, thiết kế đẹp. Shop phục vụ nhiệt
                                    tình,
                                    tư vấn kỹ càng. Đã giới thiệu cho bạn bè và sẽ quay lại mua thêm.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Related Products -->
                <div class="related-products">
                    <h3>Sản Phẩm Liên Quan</h3>
                    <div class="product-grid">
                        <div class="product-card">
                            <img src="https://via.placeholder.com/300x250.png?text=Chảo+24cm" alt="Chảo 24cm"
                                class="product-image">
                            <div class="product-info">
                                <h4 class="product-name">Chảo Chống Dính 24cm</h4>
                                <p class="product-price">350,000đ</p>
                                <button class="add-to-cart-btn">Thêm vào giỏ</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <img src="https://via.placeholder.com/300x250.png?text=Chảo+32cm" alt="Chảo 32cm"
                                class="product-image">
                            <div class="product-info">
                                <h4 class="product-name">Chảo Chống Dính 32cm</h4>
                                <p class="product-price">550,000đ</p>
                                <button class="add-to-cart-btn">Thêm vào giỏ</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <img src="https://via.placeholder.com/300x250.png?text=Bộ+Chảo" alt="Bộ Chảo"
                                class="product-image">
                            <div class="product-info">
                                <h4 class="product-name">Bộ Chảo 3 Cái</h4>
                                <p class="product-price">1,200,000đ</p>
                                <button class="add-to-cart-btn">Thêm vào giỏ</button>
                            </div>
                        </div>
                        <div class="product-card">
                            <img src="https://via.placeholder.com/300x250.png?text=Xẻng+Vàng" alt="Xẻng Vàng"
                                class="product-image">
                            <div class="product-info">
                                <h4 class="product-name">Xẻng Vàng Cao Cấp</h4>
                                <p class="product-price">150,000đ</p>
                                <button class="add-to-cart-btn">Thêm vào giỏ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
/* --- CSS cho trang Chi Tiết Sản Phẩm --- */
.product-detail-section {
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

.product-detail-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.product-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 4rem;
}

.product-images {
    position: sticky;
    top: 100px;
    height: fit-content;
}

.main-image {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: var(--shadow);
    margin-bottom: 1rem;
    cursor: zoom-in;
    transition: transform 0.3s ease;
}

.main-image:hover {
    transform: scale(1.02);
}

.thumbnail-images {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding: 0.5rem 0;
}

.thumbnail {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: all 0.3s ease;
}

.thumbnail:hover {
    border-color: var(--primary-color);
    transform: scale(1.05);
}

.thumbnail.active {
    border-color: var(--secondary-color);
}

.product-info {
    padding: 1rem 1.5rem;
}

.product-title {
    font-size: 2.5rem;
    color: var(--text-color);
    margin-bottom: 1rem;
    font-weight: 700;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.stars {
    color: var(--primary-color);
    font-size: 1.2rem;
}

.rating-text {
    color: #666;
    font-size: 0.95rem;
}

.product-price-section {
    background: rgba(255, 215, 0, 0.1);
    padding: 1.5rem;
    border-radius: 15px;
    margin-bottom: 2rem;
}

.product-price {
    font-size: 2.5rem;
    color: var(--secondary-color);
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.product-old-price {
    font-size: 1.5rem;
    color: #999;
    text-decoration: line-through;
    margin-right: 1rem;
}

.product-discount {
    display: inline-block;
    background: #e74c3c;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: 700;
}

.product-short-desc {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.8;
    margin-bottom: 2rem;
}

.product-options {
    margin-bottom: 2rem;
}

.option-group {
    margin-bottom: 1.5rem;
}

.option-label {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 0.75rem;
    display: block;
}

.option-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.option-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid #ddd;
    background: var(--white);
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
}

.option-btn:hover {
    border-color: var(--primary-color);
    color: var(--secondary-color);
}

.option-btn.active {
    border-color: var(--secondary-color);
    background: var(--secondary-color);
    color: var(--white);
}

.quantity-selector {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.quantity-controls {
    display: flex;
    align-items: center;
    border: 2px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
}

.quantity-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--white);
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--text-color);
    transition: background 0.3s ease;
}

.quantity-btn:hover {
    background: var(--background-color);
}

.quantity-input {
    width: 60px;
    height: 40px;
    border: none;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
}

.action-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.btn-primary {
    flex: 1;
    padding: 1rem 2rem;
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

.btn-primary:hover {
    background: #e69500;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 165, 0, 0.3);
}

.btn-secondary {
    padding: 1rem;
    background: var(--white);
    color: var(--secondary-color);
    border: 2px solid var(--secondary-color);
    border-radius: 50px;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-secondary:hover {
    background: var(--secondary-color);
    color: var(--white);
}

.product-features {
    background: var(--background-color);
    padding: 1.5rem;
    border-radius: 15px;
    margin-bottom: 2rem;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.feature-item:last-child {
    margin-bottom: 0;
}

.feature-icon {
    font-size: 1.5rem;
    color: var(--secondary-color);
}

.feature-text {
    color: #666;
}

.product-tabs {
    margin-top: 4rem;
}

.tabs-header {
    display: flex;
    gap: 1rem;
    border-bottom: 2px solid #ddd;
    margin-bottom: 2rem;
}

.tab-btn {
    padding: 1rem 2rem;
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    font-size: 1.1rem;
    font-weight: 700;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tab-btn:hover {
    color: var(--secondary-color);
}

.tab-btn.active {
    color: var(--secondary-color);
    border-bottom-color: var(--secondary-color);
}

.tab-content {
    display: none;
    padding: 2rem 0;
}

.tab-content.active {
    display: block;
}

.tab-content h3 {
    font-size: 1.5rem;
    color: var(--text-color);
    margin-bottom: 1rem;
}

.tab-content p,
.tab-content li {
    font-size: 1rem;
    color: #666;
    line-height: 1.8;
    margin-bottom: 0.75rem;
}

.tab-content ul {
    padding-left: 2rem;
}

.reviews-section {
    margin-top: 2rem;
}

.review-item {
    background: var(--white);
    padding: 1.5rem;
    border-radius: 15px;
    box-shadow: var(--shadow);
    margin-bottom: 1.5rem;
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.reviewer-name {
    font-weight: 700;
    color: var(--text-color);
}

.review-date {
    color: #999;
    font-size: 0.9rem;
}

.related-products {
    margin-top: 4rem;
    padding-top: 4rem;
    border-top: 2px solid #ddd;
}

.related-products h3 {
    font-size: 2rem;
    color: var(--secondary-color);
    margin-bottom: 2rem;
    text-align: center;
}

.related-products .add-to-cart-btn {
    padding: 0.5rem 1.5rem;
}

@media (max-width: 768px) {
    .product-detail-grid {
        grid-template-columns: 1fr;
    }

    .product-images {
        position: static;
    }

    .main-image {
        height: 300px;
    }

    .product-title {
        font-size: 2rem;
    }

    .product-price {
        font-size: 2rem;
    }

    .action-buttons {
        flex-direction: column;
    }

    .tabs-header {
        flex-wrap: wrap;
    }

    .tab-btn {
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
    }
}
</style>