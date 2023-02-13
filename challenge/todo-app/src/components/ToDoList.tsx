import { useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IFormData {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  // 아래 category는 명시된 3개 중 하나의 string만을 가져야 함
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  // useRecoilState는 useState랑 비슷하게 쓰임
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IFormData>();
  const handleValid = ({ toDo }: IFormData) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
    console.log();
  };
  return (
    <div>
      <h1>ToDos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
