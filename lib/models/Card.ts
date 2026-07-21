import { Schema, model, models } from 'mongoose';

const CardSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, default: null },
    rarity: { type: String, default: 'Common' }, // Common | Rare | Epic | Legendary | Mythic
    price: { type: Number, default: 0 },
    description: { type: String, default: '' },
  },
  { strict: false, collection: 'cards' }
);

export default models.Card || model('Card', CardSchema);
