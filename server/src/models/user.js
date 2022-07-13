const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Transaction = require("./transaction");
const Category = require("./category");
const Budget = require("./budget");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email!");
        }
      },
    },

    phone: {
      type: Number,
      required: true,
      validate(value) {
        if (!(value.toString().length === 10)) {
          throw new Error("Phone number must be 10 digits!");
        }
      },
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("categories", {
  ref: "Category",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("budgets", {
  ref: "Budget",
  localField: "_id",
  foreignField: "user",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email not found");
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid Email and Password Combination");
    }
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Hashing the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Cascade delete transactions, categories and budgets if user is deleted
userSchema.pre("remove", async function (next) {
  const user = this;
  await Transaction.deleteMany({ user: user._id });
  await Category.deleteMany({ user: user._id });
  await Budget.deleteMany({ user: user._id });
  next();
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
