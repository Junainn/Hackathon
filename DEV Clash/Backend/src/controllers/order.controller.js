import Order from '../models/order.model.js';
import Vendor from '../models/vendor.model.js';
import User from '../models/user.model.js';



export const createOrder = async (req, res, next) => {
  try {
    const studentId = req.user._id;   // From auth middleware
    const { vendor, items, totalAmount, location } = req.body;

    // Basic validation (you can expand)
    if (!vendor || !items || !items.length || !totalAmount || !location?.address) {
      throw new Error('Missing required order data');
    }

    // Optionally validate each item’s structure here...

    const order = new Order({
      student: studentId,
      vendor,
      items,
      totalAmount,
      location,
      status: 'Pending',          // default, but explicitly set
      paymentStatus: 'Pending'    // default, but explicitly set
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentOrders = async (req, res, next) => {
  try {
    const studentId = req.user._id; // From auth middleware
    const orders = await Order.find({ student: studentId }).populate('vendor', 'name');

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this student'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders
    });
  } catch (err) {
    next(err);
  }
}
