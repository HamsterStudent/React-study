import { atom, selector } from "recoil";

// 범용 가능하지만 에러가 발생할 수 있음
// type categories = "TO_DO" | "DOING" | "DONE";

// 실제 값은 num. 보조 도구
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  // 아래 category는 명시된 3개 중 하나의 string만을 가져야 함
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const persistData = localStorage.getItem(key);
    if (persistData != null) {
      setSelf(JSON.parse(persistData));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const customCateState = atom({
  key: "categoriesState",
  default: [],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect("toDo")],
});

//selector는 atom을 가져다가 output을 변형할 수 있다.
export const toDoSelector = selector({
  key: "toDoSelector",
  // get이 있어야 atom을 받을 수 있다.
  get: ({ get }) => {
    // selector가 atom 감시. atom이 변하면 selector도 변한다
    const toDos = get(toDoState);
    const category = get(categoryState);

    // 배열 세개를 내보내는 방식
    // return [
    //   // 카테고리가 "TO_DO"와 같으면 남아있음
    //   // atom에서 받아온 데이터를 분류해서 내보내고 있는 것
    //   // toDos.filter((toDo) => toDo.category === "TO_DO"),
    //   // toDos.filter((toDo) => toDo.category === "DOING"),
    //   // toDos.filter((toDo) => toDo.category === "DONE"),
    // ];

    // 아예 검사를 거쳐서 하나로 내보내는 방식
    // ToDoList에서 set으로 categoryState를 변경 => 이 categoryState를 받아와서 filter로 걸러서 내보냄
    return toDos.filter((toDo) => toDo.category === category);
  },
});
