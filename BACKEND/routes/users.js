const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.route("/register").post(async (req, res) => {
  try {
    const { name, nid, email, password } = req.body;

    if (!name || !nid || !email || !password)
      return res.status(400).json({ msg: "Please fill in all fields." });

    // validate NID
    if (!validateNid(nid)) return res.status(400).json({ msg: "Invalid NID." });

    //validate email
    if (!validateEmail(email))
      return res.status(400).json({ msg: "Invalid email." });

    // check if nid exsist
    const user = await User.findById(nid);
    if (user) return res.status(400).json({ msg: "This NID already exist." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must have at least 6 characters." });

    // used bcrypt to encrypt password
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      _id: nid,
      email,
      password: passwordHash,
    });

    await newUser.save();

    res.json({ msg: "Register success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { nid, password } = req.body;
    const user = await User.findById(nid);
    if (!user) return res.status(400).json({ msg: "This NID doesn't exist." });

    // decrypt and match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password incorrect." });

    const refresh_token = createRefreshToken({ nid: user._id });
    //console.log(refresh_token)
    // res.cookie("refreshtoken", refresh_token, {
    //   httpOnly: true,
    //   path: "/user/refresh_token",
    //   credentials: 'include',
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    // });
    console.log(refresh_token);
    res.json({ msg: "Login success!", refresh_token });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//------------------------------------functions----------------------------------------->
//email validation
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//nid validation
function validateNid(nid) {
  var re =
    /^(?:19|20)?\d{2}(?:[0-35-8]\d\d(?<!(?:000|500|36[7-9]|3[7-9]\d|86[7-9]|8[7-9]\d)))\d{4}(?:[vVxX])$/;
  return re.test(String(nid).toLowerCase());
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = router;
