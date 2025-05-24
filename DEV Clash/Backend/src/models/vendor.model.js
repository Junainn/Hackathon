import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to User model
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  schedule: {
    openTime: { 
      type: String, 
      default: "09:00"   // Default open time 9 AM
    },
    closeTime: { 
      type: String, 
      default: "21:00"   // Default close time 9 PM
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Vendor', vendorSchema);
