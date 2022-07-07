import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { Board as BoardInterface, Column } from "../types";
import Root from "./root";

type CurrentBoard = {
  columns: Column[];
} & BoardInterface;

class Board {
  rootStore: Root;
  boards: BoardInterface[] = [];
  currentBoard: CurrentBoard = {
    id: 0,
    name: "",
    columns: [],
  };

  constructor(root: Root) {
    this.rootStore = root;
    this.getBoards();

    makeObservable(this, {
      boards: observable,
      currentBoard: observable,
      getBoards: action,
    });
  }

  async getBoards() {
    const response = await axios("api/boards");
    const boards = (await response.data) as BoardInterface[];
    this.boards = boards;
    this.setCurrentBoard(boards[0]);
  }

  async setCurrentBoard(board: BoardInterface) {
    const response = await axios(`api/boards/${board.id}/columns`);
    const columns = (await response.data) as Column[];

    this.currentBoard = { ...board, columns };
  }
}

export default Board;
