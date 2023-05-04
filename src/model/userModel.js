const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique:true,
      require:true,
    },
    mobileNumber: {
      type: String,
      default: "",
    },
    portfolio: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    carrierObjective: {
      type: String,
      default: "",
    },
    education: {
      type: Array,
      default: [],
    },
    skills: {
      type: Array,
      default: [],
    },
    experience: {
      type: Array,
      default: [],
    },
    projects: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);


userSchema.virtual("id").get(function() { // Use regular function declaration
  return this._id.toHexString();
});
userSchema.set("toJSON", { // Remove virtuals: true
  getters: true // Use getters option instead
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
