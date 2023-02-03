import { atom, selector } from "recoil";

interface IToDoState {
  // key가 string이고, 이 key가 가질 값 또한 string으로 된 배열이다
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    DOING: ["c", "d", "e"],
    DONE: ["f"],
  },
});
