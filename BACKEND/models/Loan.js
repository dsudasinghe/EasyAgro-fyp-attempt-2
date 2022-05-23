const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loanSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
