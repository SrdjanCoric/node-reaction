const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

//create schema for board
const BoardSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "The Board title is required"]
    },
    lists: [
      {
        type: ObjectId,
        ref: "List"
      }
    ]
  },
  { timestamps: true }
);

//create model for board
const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
