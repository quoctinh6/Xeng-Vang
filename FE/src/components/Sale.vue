<template>
    <main>
        <!-- Breadcrumb -->
        <div class="breadcrumb">
            <div class="breadcrumb-content">
                <a href="index.html">Trang Chủ</a>
                <i class="bi bi-chevron-right"></i>
                <span>Khuyến Mãi</span>
            </div>
        </div>

        <section class="promotion-page reveal-on-scroll">
            <div class="container voucher-page-container">
                <div class="voucher-header">
                    <h3>Voucher Khuyến Mãi</h3>
                    <p>Khám phá các voucher hấp dẫn từ Xẻng Vàng. Sử dụng ngay để tiết kiệm khi mua sắm!</p>
                </div>
                <div class="voucher-filters">
                    <button class="filter-btn active" data-filter="all" onclick="filterVouchers('all')">
                        <i class="bi bi-grid-3x3-gap"></i> Tất cả
                    </button>
                    <button class="filter-btn" data-filter="order" onclick="filterVouchers('order')">
                        <i class="bi bi-tag-fill"></i> Giảm đơn hàng
                    </button>
                    <button class="filter-btn" data-filter="shipping" onclick="filterVouchers('shipping')">
                        <i class="bi bi-truck"></i> Giảm vận chuyển
                    </button>
                </div>
                <div class="voucher-grid">
                    <!-- Voucher 1: Giảm giá đơn hàng -->
                    <div class="voucher-card" data-voucher-type="order">
                        <span class="voucher-type-badge voucher-type-order">
                            <i class="bi bi-tag-fill"></i> Giảm đơn hàng
                        </span>
                        <div class="voucher-content">
                            <div class="voucher-discount">
                                <div class="voucher-discount-amount">30%</div>
                                <div class="voucher-discount-info">
                                    <div class="voucher-discount-type">Giảm giá đơn hàng</div>
                                </div>
                            </div>
                            <h4 class="voucher-title">Giảm 30% Đơn Hàng</h4>
                            <p class="voucher-description">Áp dụng cho tất cả sản phẩm trong cửa hàng. Không giới hạn số
                                lượng sản phẩm.</p>
                            <div class="voucher-conditions">
                                <h5>Điều kiện áp dụng:</h5>
                                <ul>
                                    <li>Đơn hàng tối thiểu 500,000đ</li>
                                    <li>Áp dụng cho tất cả sản phẩm</li>
                                    <li>Không áp dụng kèm voucher khác</li>
                                </ul>
                            </div>
                            <div class="voucher-actions">
                                <button class="btn-view-details" onclick="openModal('voucher1')">
                                    <i class="bi bi-eye"></i> Xem chi tiết
                                </button>
                                <button class="btn-use-voucher" onclick="useVoucher('voucher1')">
                                    <i class="bi bi-check-circle"></i> Sử dụng ngay
                                </button>
                            </div>
                            <div class="voucher-expiry">
                                <i class="bi bi-clock"></i> Hết hạn: 31/12/2025
                            </div>
                        </div>
                    </div>

                    <!-- Voucher 2: Giảm giá vận chuyển -->
                    <div class="voucher-card" data-voucher-type="shipping">
                        <span class="voucher-type-badge voucher-type-shipping">
                            <i class="bi bi-truck"></i> Giảm vận chuyển
                        </span>
                        <div class="voucher-content">
                            <div class="voucher-discount">
                                <div class="voucher-discount-amount">50K</div>
                                <div class="voucher-discount-info">
                                    <div class="voucher-discount-type">Giảm phí vận chuyển</div>
                                </div>
                            </div>
                            <h4 class="voucher-title">Miễn Phí Vận Chuyển 50K</h4>
                            <p class="voucher-description">Tiết kiệm phí vận chuyển cho đơn hàng của bạn. Áp dụng cho
                                tất cả đơn hàng.</p>
                            <div class="voucher-conditions">
                                <h5>Điều kiện áp dụng:</h5>
                                <ul>
                                    <li>Đơn hàng tối thiểu 300,000đ</li>
                                    <li>Áp dụng cho tất cả hình thức vận chuyển</li>
                                    <li>Có thể kết hợp với voucher khác</li>
                                </ul>
                            </div>
                            <div class="voucher-actions">
                                <button class="btn-view-details" onclick="openModal('voucher2')">
                                    <i class="bi bi-eye"></i> Xem chi tiết
                                </button>
                                <button class="btn-use-voucher" onclick="useVoucher('voucher2')">
                                    <i class="bi bi-check-circle"></i> Sử dụng ngay
                                </button>
                            </div>
                            <div class="voucher-expiry">
                                <i class="bi bi-clock"></i> Hết hạn: 28/02/2025
                            </div>
                        </div>
                    </div>

                    <!-- Voucher 3: Giảm giá đơn hàng -->
                    <div class="voucher-card" data-voucher-type="order">
                        <span class="voucher-type-badge voucher-type-order">
                            <i class="bi bi-tag-fill"></i> Giảm đơn hàng
                        </span>
                        <div class="voucher-content">
                            <div class="voucher-discount">
                                <div class="voucher-discount-amount">100K</div>
                                <div class="voucher-discount-info">
                                    <div class="voucher-discount-type">Giảm giá đơn hàng</div>
                                </div>
                            </div>
                            <h4 class="voucher-title">Giảm 100,000đ Đơn Hàng</h4>
                            <p class="voucher-description">Giảm trực tiếp 100,000đ cho đơn hàng của bạn. Áp dụng cho sản
                                phẩm dao bếp và chảo.</p>
                            <div class="voucher-conditions">
                                <h5>Điều kiện áp dụng:</h5>
                                <ul>
                                    <li>Đơn hàng tối thiểu 800,000đ</li>
                                    <li>Chỉ áp dụng cho dao bếp và chảo</li>
                                    <li>Mỗi khách hàng dùng 1 lần</li>
                                </ul>
                            </div>
                            <div class="voucher-actions">
                                <button class="btn-view-details" onclick="openModal('voucher3')">
                                    <i class="bi bi-eye"></i> Xem chi tiết
                                </button>
                                <button class="btn-use-voucher" onclick="useVoucher('voucher3')">
                                    <i class="bi bi-check-circle"></i> Sử dụng ngay
                                </button>
                            </div>
                            <div class="voucher-expiry">
                                <i class="bi bi-clock"></i> Hết hạn: 15/01/2025
                            </div>
                        </div>
                    </div>

                    <!-- Voucher 4: Giảm giá vận chuyển -->
                    <div class="voucher-card" data-voucher-type="shipping">
                        <span class="voucher-type-badge voucher-type-shipping">
                            <i class="bi bi-truck"></i> Giảm vận chuyển
                        </span>
                        <div class="voucher-content">
                            <div class="voucher-discount">
                                <div class="voucher-discount-amount">100%</div>
                                <div class="voucher-discount-info">
                                    <div class="voucher-discount-type">Miễn phí vận chuyển</div>
                                </div>
                            </div>
                            <h4 class="voucher-title">Miễn Phí Vận Chuyển Toàn Quốc</h4>
                            <p class="voucher-description">Miễn phí hoàn toàn phí vận chuyển cho đơn hàng trên
                                1,000,000đ. Áp dụng toàn quốc.</p>
                            <div class="voucher-conditions">
                                <h5>Điều kiện áp dụng:</h5>
                                <ul>
                                    <li>Đơn hàng tối thiểu 1,000,000đ</li>
                                    <li>Áp dụng cho tất cả tỉnh thành</li>
                                    <li>Không giới hạn số lần sử dụng</li>
                                </ul>
                            </div>
                            <div class="voucher-actions">
                                <button class="btn-view-details" onclick="openModal('voucher4')">
                                    <i class="bi bi-eye"></i> Xem chi tiết
                                </button>
                                <button class="btn-use-voucher" onclick="useVoucher('voucher4')">
                                    <i class="bi bi-check-circle"></i> Sử dụng ngay
                                </button>
                            </div>
                            <div class="voucher-expiry">
                                <i class="bi bi-clock"></i> Hết hạn: 30/06/2025
                            </div>
                        </div>
                    </div>

                    <!-- Voucher 5: Giảm giá đơn hàng -->
                    <div class="voucher-card" data-voucher-type="order">
                        <span class="voucher-type-badge voucher-type-order">
                            <i class="bi bi-tag-fill"></i> Giảm đơn hàng
                        </span>
                        <div class="voucher-content">
                            <div class="voucher-discount">
                                <div class="voucher-discount-amount">20%</div>
                                <div class="voucher-discount-info">
                                    <div class="voucher-discount-type">Giảm giá đơn hàng</div>
                                </div>
                            </div>
                            <h4 class="voucher-title">Giảm 20% Bộ Nồi & Bát Đĩa</h4>
                            <p class="voucher-description">Giảm giá đặc biệt cho bộ nồi inox và bát đĩa sứ cao cấp. Chất
                                lượng tốt, giá tốt hơn.</p>
                            <div class="voucher-conditions">
                                <h5>Điều kiện áp dụng:</h5>
                                <ul>
                                    <li>Chỉ áp dụng cho nồi và bát đĩa</li>
                                    <li>Đơn hàng tối thiểu 600,000đ</li>
                                    <li>Áp dụng cho khách hàng mới</li>
                                </ul>
                            </div>
                            <div class="voucher-actions">
                                <button class="btn-view-details" onclick="openModal('voucher5')">
                                    <i class="bi bi-eye"></i> Xem chi tiết
                                </button>
                                <button class="btn-use-voucher" onclick="useVoucher('voucher5')">
                                    <i class="bi bi-check-circle"></i> Sử dụng ngay
                                </button>
                            </div>
                            <div class="voucher-expiry">
                                <i class="bi bi-clock"></i> Hết hạn: 20/01/2025
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
/* --- CSS cho trang Voucher --- */
.voucher-page-container {
    padding: 2rem 0 4rem;
}

.voucher-header {
    text-align: center;
    margin-bottom: 3rem;
}

.voucher-header h3 {
    font-size: 2.5rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
}

.voucher-header p {
    font-size: 1.1rem;
    color: #666;
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

.voucher-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: var(--white);
    border: 2px solid var(--secondary-color);
    color: var(--secondary-color);
    padding: 0.75rem 2rem;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.filter-btn:hover {
    background: var(--secondary-color);
    color: var(--white);
    transform: translateY(-3px);
    box-shadow: var(--shadow);
}

.filter-btn.active {
    background: var(--secondary-color);
    color: var(--white);
}

.voucher-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.voucher-card {
    background: linear-gradient(135deg, #fff 0%, #fff8e1 100%);
    border-radius: 20px;
    box-shadow: var(--shadow);
    overflow: hidden;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 2px solid var(--primary-color);
}

.voucher-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(255, 165, 0, 0.3);
}

.voucher-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(180deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

.voucher-type-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    z-index: 2;
}

.voucher-type-shipping {
    background: #4CAF50;
    color: white;
}

.voucher-type-order {
    background: #2196F3;
    color: white;
}

.voucher-content {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.voucher-discount {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.voucher-discount-amount {
    font-size: 3rem;
    font-weight: 700;
    color: var(--secondary-color);
    line-height: 1;
}

.voucher-discount-info {
    flex: 1;
}

.voucher-discount-type {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 0.25rem;
}

.voucher-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 0.5rem;
}

.voucher-description {
    font-size: 0.95rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 0.5rem;
}

.voucher-conditions {
    background: rgba(255, 215, 0, 0.1);
    padding: 1rem;
    border-radius: 10px;
    margin: 1rem 0;
}

.voucher-conditions h5 {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}

.voucher-conditions ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.voucher-conditions li {
    font-size: 0.85rem;
    color: #666;
    padding: 0.25rem 0;
    padding-left: 1.5rem;
    position: relative;
}

.voucher-conditions li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--secondary-color);
    font-weight: 700;
}

.voucher-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.btn-view-details {
    flex: 1;
    background: var(--white);
    color: var(--secondary-color);
    border: 2px solid var(--secondary-color);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-view-details:hover {
    background: var(--secondary-color);
    color: var(--white);
    transform: scale(1.05);
}

.btn-use-voucher {
    flex: 1;
    background: var(--secondary-color);
    color: var(--white);
    border: 2px solid var(--secondary-color);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-use-voucher:hover {
    background: #e69500;
    transform: scale(1.05);
}

.voucher-expiry {
    text-align: center;
    font-size: 0.85rem;
    color: #999;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px dashed #ddd;
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}

.modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: var(--white);
    margin: auto;
    padding: 0;
    border-radius: 20px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
    animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    padding: 2rem;
    color: var(--white);
    border-radius: 20px 20px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    font-size: 1.8rem;
    margin: 0;
}

.close-modal {
    color: var(--white);
    font-size: 2rem;
    font-weight: 700;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.close-modal:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
}

.modal-body {
    padding: 2rem;
}

.modal-voucher-info {
    background: rgba(255, 215, 0, 0.1);
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 2rem;
}

.modal-voucher-info h4 {
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}

.modal-voucher-info p {
    color: #666;
    margin: 0.25rem 0;
}

.applicable-products {
    margin-top: 2rem;
}

.applicable-products h4 {
    font-size: 1.3rem;
    color: var(--text-color);
    margin-bottom: 1.5rem;
}

.product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
}

.product-item {
    background: var(--white);
    border: 2px solid var(--light-gray);
    border-radius: 15px;
    padding: 1rem;
    text-align: center;
    transition: all 0.3s ease;
}

.product-item:hover {
    border-color: var(--primary-color);
    transform: translateY(-5px);
    box-shadow: var(--shadow);
}

.product-item-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 0.75rem;
}

.product-item-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.5rem;
}

.product-item-price {
    font-size: 1rem;
    color: var(--secondary-color);
    font-weight: 700;
}

.no-products {
    text-align: center;
    padding: 2rem;
    color: #999;
    font-style: italic;
}

.voucher-card.hidden {
    display: none;
}

@media (max-width: 768px) {
    .voucher-grid {
        grid-template-columns: 1fr;
    }

    .voucher-actions {
        flex-direction: column;
    }

    .modal-content {
        width: 95%;
        margin: 1rem;
    }

    .product-list {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .voucher-filters {
        flex-direction: column;
        align-items: stretch;
    }

    .filter-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>