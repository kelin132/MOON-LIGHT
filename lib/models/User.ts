import mongoose, { Schema, model, models } from 'mongoose';

/**
 * IMPORTANT: This model reads/writes the SAME collection your Discord bot
 * already uses. `strict: false` means Mongoose won't strip fields the bot
 * writes that aren't declared here (coins, inventory, xp, etc.) — but it
 * also means YOU should double check:
 *   1. The collection name below ("users") matches your bot's actual collection.
 *   2. Field names below (moonId, role, bio, ...) match what the bot uses.
 *      Rename anything that doesn't match your existing bot schema.
 *   3. Whether `webPassword` is bcrypt-hashed anywhere already, or whether
 *      this website is the first thing that will ever set it (see
 *      app/api/auth flow — it expects a bcrypt hash).
 */

export const STAFF_ROLES = ['True Owner', 'Owner', 'Mod', 'Staff'] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

const UserSchema = new Schema(
  {
    // --- Website login (as specified) ---
    moonId: { type: String, unique: true, sparse: true },
    webPassword: { type: String, default: null },
    webPasswordUpdatedAt: { type: Date, default: null },

    // --- Fields assumed to already exist on the bot's user documents.
    //     Adjust names/types to match your real schema. ---
    username: { type: String },
    discordId: { type: String },
    role: { type: String, enum: [...STAFF_ROLES, 'Member'], default: 'Member' },
    coins: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    guildId: { type: Schema.Types.ObjectId, ref: 'Guild', default: null },
    suspended: { type: Boolean, default: false },
    suspendedReason: { type: String, default: null },

    // --- Profile customization added by this website ---
    bio: { type: String, default: '', maxlength: 500 },
    avatarUrl: { type: String, default: null },
    bannerUrl: { type: String, default: null },
    teamDescription: { type: String, default: null }, // shown on /support/team for staff
  },
  {
    strict: false,
    timestamps: false,
    collection: 'users',
  }
);

export default models.User || model('User', UserSchema);
