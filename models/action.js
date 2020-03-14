const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

const ActionSchema = new Schema(
  {
    description: String,
    cardId: {
      type: ObjectId,
      ref: "Card"
    }
  },
  {
    timestamps: true
  }
);

const Action = mongoose.model("Action", ActionSchema);

module.exports = Action;
