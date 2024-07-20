const { Schema } = require("mongoose");
const db = require("../service");

const mongoProductSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  tax: { type: Number, required: true },
  status: { type: String, required: true },
});

const mongoOrderLineSchema = new Schema({
  id: { type: String, required: true },
  product: mongoProductSchema,
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

const mongoOrderSchema = new Schema({
  userId: { type: String, required: true },
  lines: [mongoOrderLineSchema],
  total: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
});

const mongoOrder = db.model("Order", mongoOrderSchema);

module.exports = mongoOrder;
