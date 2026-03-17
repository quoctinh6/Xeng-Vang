const Product = require("../models/product.model");
const Category = require("../models/category.model");
const fs = require("fs");
const path = require("path");

// Helper: format price like legacy JSON
const formatPrice = (p) => {
  if (p == null) return "";
  try {
    return new Intl.NumberFormat("vi-VN").format(Number(p)) + " VNĐ";
  } catch (e) {
    return String(p);
  }
};

// GET /api/products
// If query ?format=modern return raw product list
// Else return legacy array [{ categories: [...], bestSelling: [...] }]
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    const categories = await Category.find().lean();

    // If DB has no products, try fallback to data.json (useful for local dev/seeding mismatch)
    if ((!products || products.length === 0) && req.query.format !== "modern") {
      try {
        const dataPath = path.resolve(__dirname, "..", "data", "data.json");
        if (fs.existsSync(dataPath)) {
          const raw = fs.readFileSync(dataPath, "utf8");
          const json = JSON.parse(raw);
          const legacy = json[0] || json; // support either array or object structure
          if (legacy)
            return res.json(Array.isArray(legacy) ? legacy : [legacy]);
        }
      } catch (e) {
        // ignore and continue to return empty result
        console.warn("[getProducts] fallback read error", e.message);
      }
    }

    if (req.query.format === "modern") {
      return res.json(products);
    }

    const legacyCategories = categories.map((c, idx) => ({
      id: c.legacyId ?? idx + 1,
      code: c.code ?? String(c.legacyId ?? c._id),
      name: c.name,
    }));

    const bestSelling = products.map((p, idx) => ({
      id: p.legacyId ?? p._id ?? idx + 1,
      name: p.name,
      price: typeof p.price === "number" ? formatPrice(p.price) : p.price ?? "",
      image: p.image || "",
      soldCount: p.soldCount || { day: 0, month: 0, year: 0 },
      category: p.category || "",
    }));

    res.json([
      {
        quantity: products.length,
        _id: products.length > 0 ? products[0]._id : null,
        categories: legacyCategories,
        bestSelling,
      },
    ]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/products/:id
// Find by ObjectId or legacyId
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = null;
    // try as ObjectId
    try {
      product = await Product.findById(id).lean();
    } catch (e) {
      // ignore
    }
    if (!product) product = await Product.findOne({ legacyId: id }).lean();
    if (!product) return res.status(404).json({ error: "Product not found" });
    // normalize output
    product.formattedPrice =
      typeof product.price === "number"
        ? formatPrice(product.price)
        : product.price;
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const data = req.body || {};
    // If category provided as code, ensure category exists
    if (data.category) {
      // try to find existing category by code or name
      let cat = await Category.findOne({
        $or: [{ code: data.category }, { name: data.category }],
      });
      if (!cat) {
        // Use findOneAndUpdate with upsert to avoid race-condition duplicate-key errors
        try {
          cat = await Category.findOneAndUpdate(
            { $or: [{ code: data.category }, { name: data.category }] },
            { $setOnInsert: { name: data.category, code: data.category } },
            { new: true, upsert: true }
          );
        } catch (e) {
          // if upsert failed due to duplicate key, re-query to get the existing category
          cat = await Category.findOne({
            $or: [{ code: data.category }, { name: data.category }],
          });
        }
      }
      if (cat) {
        // store the canonical code (or name) on product.category
        data.category = cat.code || cat.name;
      }
    }

    const product = new Product({
      legacyId: data.id ?? data.legacyId,
      name: data.name,
      category: data.category,
      price: data.price != null ? Number(data.price) : data.price,
      stock: data.stock ?? data.quantity ?? 0,
      quantity: data.quantity ?? data.stock ?? 0,
      image: data.image,
      description: data.description,
      soldCount: data.soldCount,
    });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body || {};
    let product = null;
    try {
      product = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).lean();
    } catch (e) {
      // ignore
    }
    if (!product)
      product = await Product.findOneAndUpdate({ legacyId: id }, data, {
        new: true,
        runValidators: true,
      }).lean();
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let result = null;
    try {
      result = await Product.findByIdAndDelete(id);
    } catch (e) {
      // ignore
    }
    if (!result) result = await Product.findOneAndDelete({ legacyId: id });
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
