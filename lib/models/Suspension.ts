import { Schema, model, models } from 'mongoose';

const SuspensionSchema = new Schema(
  {
    targetMoonId: { type: String, required: true },
    reason: { type: String, default: '' },
    issuedByMoonId: { type: String, required: true },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'suspensions' }
);

export default models.Suspension || model('Suspension', SuspensionSchema);
