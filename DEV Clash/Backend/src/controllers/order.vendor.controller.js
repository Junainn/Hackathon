import Order from '../models/order.model.js';
import Vendor from '../models/vendor.model.js';


export const getVendorOrders = async (req, res, next) => {
    try{
        const vendorId = req.user._id; // From auth middleware
        const orders = await Order.find({ vendor: vendorId });
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for YOU"
            });
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });
    }
    catch(err){
        next(err);
    }
}

export const viewOrderDetails = async (req, res, next) => {
    try{
        const { orderId } = req.params;
        const vendorId = req.user._id; // From auth middleware

        // Validate input
        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required"
            });
        }

       
        const order = await Order.findOne({ _id: orderId, vendor: vendorId });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order details fetched successfully",
            data: order
        });
    }catch(err){
        next(err);
    }
}

export const updateOrderStatus = async (req, res, next) => {
    try{
        const { orderId, status } = req.body;
        const vendorId = req.user._id; // From auth middleware

        // Validate input
        if (!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: "Order ID and status are required"
            });
        }

        // Find the order
        const order = await Order.findOne({ _id: orderId, vendor: vendorId });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        
        // Update the order status
        order.status = status;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order
        });
    }catch(err){
        next(err);
    }
}
