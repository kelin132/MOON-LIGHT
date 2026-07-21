/**
 * Usage: node scripts/hash-password.js "the-password"
 *
 * Prints a bcrypt hash you can $set on a user's `webPassword` field to
 * grant them website access, e.g. from your bot or the Mongo shell:
 *
 *   db.users.updateOne(
 *     { moonId: "moon_1029" },
 *     { $set: { webPassword: "<hash printed below>", webPasswordUpdatedAt: new Date() } }
 *   )
 */
const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.js "the-password"');
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  console.log(hash);
});
