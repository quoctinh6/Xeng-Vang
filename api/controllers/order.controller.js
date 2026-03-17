const Order = require("../models/order.model");
const User = require("../models/user.model");

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().lean();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let order = null;
    try {
      order = await Order.findById(id).lean();
    } catch (e) {
      // ignore
    }
    if (!order) order = await Order.findOne({ legacyId: id }).lean();
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, total, status, legacyId, date } = req.body;
    // Optional: validate user exists
    if (userId) {
      const u = await User.findOne({
        $or: [{ _id: userId }, { legacyId: userId }],
      }).lean();
      if (!u) return res.status(400).json({ error: "User not found" });
    }

    const order = new Order({
      userId,
      items: items || [],
      total: total || 0,
      status: status || "pending",
      legacyId,
      date: date ? new Date(date) : undefined,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    let order = null;
    try {
      order = await Order.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).lean();
    } catch (e) {
      // ignore
    }
    if (!order)
      order = await Order.findOneAndUpdate({ legacyId: id }, data, {
        new: true,
        runValidators: true,
      }).lean();
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let result = null;
    try {
      result = await Order.findByIdAndDelete(id);
    } catch (e) {
      // ignore
    }
    if (!result) result = await Order.findOneAndDelete({ legacyId: id });
    if (!result) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
