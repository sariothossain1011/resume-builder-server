const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

exports.registration = async (req, res) => {
  try {
    const email = await userModel.findOne({ email: req.body.email }).exec();
    if (email) {
      return res
        .status(400)
        .send({ status: false, message: "user already existing" });
    }

    const user = await userModel({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    const userinfo = await user.save();
    if (!userinfo) {
      return res.status(404).send("registration fail!");
    }

    return res.status(200).json({ success: true, data: userinfo });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("user not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { foo: "bar" },
        process.env.SECRET_KEY,
        { expiresIn: "1d" },
      );
      return res.status(200).json({ data: user, token: token });
    } else {
      return res.status(400).send("Password is wrong");
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.profileUpdate = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          mobileNumber: req.body.mobileNumber,
          portfolio: req.body.portfolio,
          carrierObjective: req.body.carrierObjective,
          education: req.body.education,
          skills: req.body.skills,
          experience: req.body.experience,
          projects: req.body.projects,
        },
        { new: true }
      )
      .select("-password");

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "The user not update !" });
    }
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

