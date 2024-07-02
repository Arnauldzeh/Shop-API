const express = require("express");
const router = express.Router();
const {
  getOrders,
  newOrder,
  getOrderById,
  deleteOrder,
} = require("../controllers/orders");
const auth = require("../middleware/auth");

router.get("/", auth, getOrders);

router.post("/", auth, newOrder);
router.get("/:orderId", auth, getOrderById);

router.delete("/:orderId", auth, deleteOrder);

module.exports = router;
