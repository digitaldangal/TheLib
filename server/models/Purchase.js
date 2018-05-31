import mongoose from 'mongoose';

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  stripeCharge: {
    id: String,
    amount: Number,
    created: Number,
    livemode: Boolean,
    paid: Boolean,
    status: String,
  },
});

purchaseSchema.index({ bookId: 1, userId: 1 }, { unique: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
