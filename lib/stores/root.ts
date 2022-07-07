import Board from "./board";
class Root {
  board: Board;

  constructor() {
    this.board = new Board(this);
  }
}

export default Root;
