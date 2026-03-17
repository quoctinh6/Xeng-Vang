<template>
    <main>
        <!-- Breadcrumb -->
        <div class="breadcrumb">
            <div class="breadcrumb-content">
                <a href="index.html">Trang Chủ</a>
                <i class="bi bi-chevron-right"></i>
                <span>Liên Hệ</span>
            </div>
        </div>

        <!-- Hero Section -->
        <section class="contact-hero">
            <div class="contact-hero-content">
                <h1>Liên Hệ Với Chúng Tôi</h1>
                <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi qua bất kỳ cách nào bạn
                    cảm thấy thuận tiện nhất.</p>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact-section">
            <div class="contact-container">
                <div class="contact-layout">
                    <!-- Contact Form -->
                    <div class="contact-form-section">
                        <h2 class="form-title">Gửi Tin Nhắn</h2>

                        <div id="successMessage" class="success-message">
                            <i class="bi bi-check-circle"></i> Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.
                            Chúng tôi sẽ phản hồi sớm nhất có thể.
                        </div>

                        <div id="errorMessage" class="error-message">
                            <i class="bi bi-exclamation-circle"></i> Có lỗi xảy ra. Vui lòng thử lại sau.
                        </div>

                        <form id="contactForm" onsubmit="submitForm(event)"
                            style="flex-grow: 1; display: flex; flex-direction: column;">
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label required" for="firstName">Họ</label>
                                    <input type="text" id="firstName" name="firstName" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label required" for="lastName">Tên</label>
                                    <input type="text" id="lastName" name="lastName" class="form-input" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label required" for="email">Email</label>
                                <input type="email" id="email" name="email" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label required" for="phone">Số điện thoại</label>
                                <input type="tel" id="phone" name="phone" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="subject">Chủ đề</label>
                                <select id="subject" name="subject" class="form-select">
                                    <option value="">Chọn chủ đề</option>
                                    <option value="product">Câu hỏi về sản phẩm</option>
                                    <option value="order">Câu hỏi về đơn hàng</option>
                                    <option value="shipping">Câu hỏi về vận chuyển</option>
                                    <option value="return">Đổi trả sản phẩm</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label required" for="message">Tin nhắn</label>
                                <textarea id="message" name="message" class="form-textarea" required></textarea>
                            </div>

                            <button type="submit" class="submit-btn" id="submitBtn">
                                <i class="bi bi-send"></i>
                                Gửi Tin Nhắn
                            </button>
                        </form>
                    </div>

                    <!-- Contact Info -->
                    <div class="contact-info-section">
                        <!-- Address Card -->
                        <div class="info-card">
                            <div class="info-card-header">
                                <div class="info-icon">
                                    <i class="bi bi-geo-alt-fill"></i>
                                </div>
                                <h3 class="info-card-title">Địa Chỉ</h3>
                            </div>
                            <div class="info-content">
                                <p><strong>Trụ sở chính:</strong></p>
                                <p>123 Đường ABC, Phường XYZ, Quận 1</p>
                                <p>Thành phố Hồ Chí Minh, Việt Nam</p>
                                <p style="margin-top: 1rem;"><strong>Chi nhánh Hà Nội:</strong></p>
                                <p>456 Đường DEF, Quận Hoàn Kiếm</p>
                                <p>Hà Nội, Việt Nam</p>
                            </div>
                        </div>

                        <!-- Contact Card -->
                        <div class="info-card">
                            <div class="info-card-header">
                                <div class="info-icon">
                                    <i class="bi bi-telephone-fill"></i>
                                </div>
                                <h3 class="info-card-title">Liên Hệ</h3>
                            </div>
                            <div class="info-content">
                                <p><i class="bi bi-phone"></i> <a href="tel:02838123456">(028) 3812 3456</a></p>
                                <p><i class="bi bi-phone"></i> <a href="tel:02412345678">(024) 1234 5678</a></p>
                                <p><i class="bi bi-envelope"></i> <a
                                        href="mailto:support@senvang.vn">support@senvang.vn</a></p>
                                <p><i class="bi bi-envelope"></i> <a href="mailto:sales@senvang.vn">sales@senvang.vn</a>
                                </p>
                            </div>
                        </div>

                        <!-- Hours Card -->
                        <div class="info-card">
                            <div class="info-card-header">
                                <div class="info-icon">
                                    <i class="bi bi-clock-fill"></i>
                                </div>
                                <h3 class="info-card-title">Giờ Làm Việc</h3>
                            </div>
                            <div class="info-content">
                                <ul class="hours-list">
                                    <li>
                                        <span class="day">Thứ 2 - Thứ 6</span>
                                        <span class="time">8:00 - 20:00</span>
                                    </li>
                                    <li>
                                        <span class="day">Thứ 7</span>
                                        <span class="time">8:00 - 18:00</span>
                                    </li>
                                    <li>
                                        <span class="day">Chủ Nhật</span>
                                        <span class="time">9:00 - 17:00</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Social Card -->
                        <div class="info-card">
                            <div class="info-card-header">
                                <div class="info-icon">
                                    <i class="bi bi-share-fill"></i>
                                </div>
                                <h3 class="info-card-title">Mạng Xã Hội</h3>
                            </div>
                            <div class="info-content">
                                <p>Theo dõi chúng tôi trên các mạng xã hội để cập nhật những sản phẩm mới và ưu đãi hấp
                                    dẫn!</p>
                                <div class="social-links">
                                    <a href="#" class="social-link" title="Facebook">
                                        <i class="bi bi-facebook"></i>
                                    </a>
                                    <a href="#" class="social-link" title="Instagram">
                                        <i class="bi bi-instagram"></i>
                                    </a>
                                    <a href="#" class="social-link" title="YouTube">
                                        <i class="bi bi-youtube"></i>
                                    </a>
                                    <a href="#" class="social-link" title="TikTok">
                                        <i class="bi bi-tiktok"></i>
                                    </a>
                                    <a href="#" class="social-link" title="Zalo">
                                        <i class="bi bi-chat-dots"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map Section -->
                <div class="map-section">
                    <h2 class="form-title" style="text-align: center; margin-bottom: 2rem;">Bản Đồ</h2>
                    <div class="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.319350515!2d106.69221431480098!3d10.776838392315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38b8e8c0b1%3A0x6c3b3c3c3c3c3c3c!2sQu%E1%BA%ADn%201%2C%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s"
                            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
/* --- CSS cho trang Liên Hệ --- */
.contact-hero {
    background: linear-gradient(135deg, #fefae0 0%, #f7d488 100%);
    padding: 6rem 0 4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.contact-hero::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: linear-gradient(145deg, #FFD700, #FFA500);
    border-radius: 50%;
    opacity: 0.3;
    z-index: 1;
}

.contact-hero::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 150px;
    height: 150px;
    background: linear-gradient(145deg, #FFD700, #FFA500);
    border-radius: 50%;
    opacity: 0.2;
    z-index: 1;
}

.contact-hero-content {
    position: relative;
    z-index: 2;
}

.contact-hero h1 {
    font-size: 3.5rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    font-weight: 700;
}

.contact-hero p {
    font-size: 1.3rem;
    color: #583c00;
    max-width: 700px;
    margin: 0 auto;
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

.contact-section {
    padding: 4rem 0;
}

.contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.contact-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 4rem;
    align-items: stretch;
}

.contact-form-section {
    background: var(--white);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: var(--shadow);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.form-title {
    font-size: 2rem;
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    font-weight: 700;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.form-label.required::after {
    content: ' *';
    color: #e74c3c;
}

.form-input,
.form-textarea,
.form-select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 1rem;
    font-family: 'Quicksand', sans-serif;
    transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
    outline: none;
    border-color: var(--secondary-color);
}

.form-textarea {
    resize: vertical;
    min-height: 150px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.submit-btn {
    width: 100%;
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
    margin-top: auto;
}

.submit-btn:hover {
    background: #e69500;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 165, 0, 0.3);
}

.submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}

.contact-info-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.info-card {
    background: var(--white);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: var(--shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.info-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.info-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.5rem;
}

.info-card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
}

.info-content {
    color: #666;
    line-height: 1.8;
}

.info-content p {
    margin-bottom: 0.5rem;
}

.info-content a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.info-content a:hover {
    color: var(--primary-color);
}

.hours-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.hours-list li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
}

.hours-list li:last-child {
    border-bottom: none;
}

.hours-list .day {
    font-weight: 700;
    color: var(--text-color);
}

.hours-list .time {
    color: #666;
}

.social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.social-link {
    width: 45px;
    height: 45px;
    background: var(--background-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-color);
    font-size: 1.3rem;
    text-decoration: none;
    transition: all 0.3s ease;
}

.social-link:hover {
    background: var(--secondary-color);
    color: var(--white);
    transform: translateY(-3px);
}

.map-section {
    margin-top: 4rem;
}

.map-container {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow);
    height: 450px;
}

.map-container iframe {
    width: 100%;
    height: 100%;
    border: none;
}

.success-message {
    background: #4CAF50;
    color: white;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    display: none;
    text-align: center;
}

.error-message {
    background: #e74c3c;
    color: white;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    display: none;
    text-align: center;
}

@media (max-width: 968px) {
    .contact-layout {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .contact-hero h1 {
        font-size: 2.5rem;
    }

    .contact-hero p {
        font-size: 1.1rem;
    }
}
</style>