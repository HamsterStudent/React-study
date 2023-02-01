import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // useState랑  비슷하다... value가 있고, 그 value를 변경하는 함수가 있음
  // toDos의 atom이 toDoState이므로 배열형태가 기본
  // const [toDos, setToDos] = useRecoilState(toDoState);

  // 컴포넌트 안에서 수정하기보단 선택자를 사용하는 편이 더 간결함!
  // const toDos = useRecoilValue(toDoState);
  // const selectorOutput = useRecoilValue(toDoSelector);

  // 배열 안의 배열을 선택하려면 배열을 열고 순서대로 이름 지정하면 됨
  // const [toDo, doing, done] = useRecoilValue(toDoSelector);

  const toDos = useRecoilValue(toDoSelector);
  // useRecoilState 는 atom과 modifier함수를 반환해줌
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}

      {/* 단순하지만 길고 귀찮은 작업 */}
      {/* {category === "TO_DO" &&
        toDo.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
      {category === "DOING" &&
        doing.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
      {category === "DONE" &&
        done.map((toDo) => <ToDo key={toDo.id} {...toDo} />)} */}

      {/* todo리스트 상황을 전부 보여줌 */}
      {/* <h2>To Do</h2>
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr /> */}
    </div>
  );
}

export default ToDoList;
