const Product = require("../models/product.model");

const getHomeProducts = async (req, res) => {
  try {
    // Lấy top 6 sản phẩm bán chạy nhất
    const bestSellers = await Product.find().sort({ sold: -1 }).limit(6);

    // Lấy top 6 sản phẩm có lượt xem nhiều nhất
    const mostViewed = await Product.find().sort({ view: -1 }).limit(6);

    // Lấy 6 sản phẩm mới nhất
    const newestProducts = await Product.find().sort({ createdAt: -1 }).limit(6);

    res.json({
      bestSellers,
      mostViewed,
      newestProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getHomeProducts };
