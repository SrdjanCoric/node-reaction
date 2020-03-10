let Board = require("../models/board");

let boards = [
  new Board({
    title: "Third Board"
  }),
  new Board({
    title: "Fourth Board"
  })
];

let done = 0;
for (let i = 0; i < boards.length; i++) {
  boards[i].save((err, result) => {
    done++;
    if (done === boards.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
