import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // CUET student email format validation regex
    match: [/^u\d{7}@student\.cuet\.ac\.bd$/, 'Invalid CUET student email format.']
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'vendor'], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
