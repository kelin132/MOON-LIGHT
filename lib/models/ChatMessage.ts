import { Schema, model, models } from 'mongoose';

const ChatMessageSchema = new Schema(
  {
    moonId: { type: String, required: true },
    username: { type: String, default: null },
    body: { type: String, required: true, maxlength: 1000 },
    channel: { type: String, default: 'general' },
  },
  { timestamps: true, collection: 'chat_messages' }
);

export default models.ChatMessage || model('ChatMessage', ChatMessageSchema);
