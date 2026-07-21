import { Schema, model, models } from 'mongoose';

const GuildSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    thumbnailUrl: { type: String, default: null },
    previewUrl: { type: String, default: null }, // if present, show preview card
    ownerMoonId: { type: String, default: null },
    memberCount: { type: Number, default: 0 },
  },
  { strict: false, collection: 'guilds' }
);

export default models.Guild || model('Guild', GuildSchema);
