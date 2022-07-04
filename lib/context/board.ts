import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { Board as BoardInterface } from "../types";

class Board {
  boards: BoardInterface[] = [];
  currentBoard: BoardInterface | null = null;

  constructor() {
    this.getBoards();

    makeObservable(this, {
      boards: observable,
      currentBoard: observable,
      getBoards: action,
      setCurrentBoard: action,
    });
  }

  async getBoards() {
    const response = await axios("api/boards");
    const boardsData = (await response.data) as BoardInterface[];
    this.boards = boardsData;
    this.setCurrentBoard(boardsData[0]);
  }

  setCurrentBoard(board: BoardInterface) {
    this.currentBoard = board;
  }
}

export const store = new Board();

export default Board;
