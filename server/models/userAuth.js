const moongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new moongoose.Schema({
  username: {
    type: "String",
    required: true,
    trim: true,
  },
  email: {
    type: "String",
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: "String",
    required: [true, "Please provide Password"],
    minlength: 6,
  },
  friends: {
    type: moongoose.Types.ObjectId,
    ref: "Friend",
    required: true
  },
  isVerified: { type: "Boolean", default: false },
  verificationToken: "String",
  verified: { type: "Date" },
  passwordToken: "String",
  passwordTokenExpirationDate: "Date",
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = moongoose.model("User", UserSchema);
