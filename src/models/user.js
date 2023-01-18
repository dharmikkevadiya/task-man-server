const { model, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
const { genPasswordHash, checkPassword } = require("../helper/helper");
const { JWT_SECRET } = require("../config");

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    phone: { type: String },
    coverPhoto: { type: String },
    bio: { type: String },
    city: { type: String },
    from: { type: String },
    relationship: { type: Number, enum: [1, 2, 3] },
    lastLoginTime: { type: Date },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

UserSchema.static(
  "register",
  async ({ firstName, lastName, phone, email, password }) => {
    const passwordHash = await genPasswordHash(password);

    let newUser = await new User({
      firstName,
      lastName,
      phone,
      email,
      password: passwordHash,
    }).save();

    newUser = JSON.parse(JSON.stringify(newUser));
    delete newUser.password;

    return newUser;
  }
);

//Generate Token
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: "7d" });
  return token;
};

let User = new model("User", UserSchema);
module.exports = User;
