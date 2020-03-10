const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      maxlength: 20000,
      trim: true,
      required: [true, "The Comment text is required"]
    },
    cardId: {
      type: ObjectId,
      ref: "Card"
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
