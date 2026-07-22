import { Schema, model, models } from "mongoose";

const CardSchema = new Schema(
  {
    cardId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    series: {
      type: String,
      default: "Unknown",
    },

    media: {
      type: Schema.Types.Mixed,
      default: null,
    },

    mediaType: {
      type: String,
      default: "image",
    },

    mediaMime: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    tier: {
      type: String,
      default: "1",
      index: true,
    },

    creator: {
      type: String,
      default: "Eclipse Card API",
    },

    spawnRate: {
      type: Number,
      default: 1,
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    timesSpawned: {
      type: Number,
      default: 0,
    },

    timesClaimed: {
      type: Number,
      default: 0,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    strict: false,
    timestamps: true,
    collection: "cards",
  }
);

export default models.Card || model("Card", CardSchema);
