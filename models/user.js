const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const UserSchema = new mongoose.Schema(
  {
    username: {
      lowercase: true,
      trim: true,
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      // required: true,
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      // required: true,
    },
    profile_photo: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    admin: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: "",
        Id: "",
      },
    ],
    hardestClimb: "",
  },

  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
