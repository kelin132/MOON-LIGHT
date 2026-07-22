import { Schema, model, models } from "mongoose";

const GuildSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    ownerId: {
      type: String,
      required: true,
    },

    members: {
      type: [String],
      default: [],
    },

    banned: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "No description has been set.",
    },

    icon: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    strict: false,
    collection: "guilds",
  }
);

export default models.Guild || model("Guild", GuildSchema);
