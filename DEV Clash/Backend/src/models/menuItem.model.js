import mongoose from 'mongoose';

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  vendor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vendor',  // Reference to the Vendor schema
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: {
    type: String,
    required: true 
  },
  image: {
    type: String,  // Storing image as text (URL or base64)
    required: false  // Optional, can be null if image is not provided
  },
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create and export the model
export default mongoose.model('MenuItem', menuItemSchema);
