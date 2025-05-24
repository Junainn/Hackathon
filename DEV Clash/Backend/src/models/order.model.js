import mongoose from 'mongoose';

// Order Schema without Cart (direct order model)
const orderSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model (Student)
    required: true 
  },
  vendor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vendor',  // Reference to the Vendor model
    required: true 
  },
  items: [
    {
      menuItem: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MenuItem',  // Reference to the MenuItem model
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      },
      price: { 
        type: Number, 
        required: true  // Store the price at the time of adding it to the order
      }
    }
  ],
  totalAmount: { 
    type: Number, 
    required: true  // Total price of the items in the order
  },
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Ready', 'Shipped', 'Cancelled'],
    default: 'Pending'  // Default is 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'  // Default is 'Pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now  // Order creation timestamp
  },
  location: {
    address: {
      type: String,
      required: true,  // Delivery address as a string
    },
    
  }
});

// Create and export the model
export default mongoose.model('Order', orderSchema);
