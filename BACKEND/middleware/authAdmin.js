const Users = require("../models/User");

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.nid });

    if (user.role !== 1)
      return res.status(400).json({ msg: "Admin resources access denied" });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
S;
module.exports = authAdmin;
