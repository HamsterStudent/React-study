import { atom, selector } from "recoil";

export enum Categories {
  // enum의 value는 코드상에서는 num으로 표현됨
  // "TO_DO",
  // "DOING",
  // "DONE",

  // 이렇게 만들면 코드상에서도 string으로 됨
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

// selector는 state를 가져다가 원하는대로 모습을 변형시킬 수 있는 도구
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // get는 state(atom)를 가져옴
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);

    // 상태에 따라 내보내기 (이런식으로 return 쓸 수 있을줄은 몰랐네...)
    // if (category === "TO_DO")
    //   return toDos.filter((toDo) => toDo.category === "TO_DO");
    // if (category === "DOING")
    //   return toDos.filter((toDo) => toDo.category === "DOING");
    // if (category === "DONE")
    //   return toDos.filter((toDo) => toDo.category === "DONE");

    // 상태를 나타내는 배열 세개를 분리해서 넣음
    // return [
    //   toDos.filter((toDo) => toDo.category === "TO_DO"),
    //   toDos.filter((toDo) => toDo.category === "DOING"),
    //   toDos.filter((toDo) => toDo.category === "DONE"),
    // ];
  },
});
