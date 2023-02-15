import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  customCateState,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface ICateData {
  customCate: string;
}

function ToDoList() {
  // useRecoilState는 useState랑 비슷하게 쓰임
  // const toDos = useRecoilValue(toDoState);
  // const selectorOutput = useRecoilValue(toDoSelector);

  // useRecoilValue는 배열을 반환하고 있다.
  // 배열 안의 배열을 선택하려면 배열을 열고 순서대로 이름 지정
  // const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  // const [cate, setCate] = useRecoilState(customCateState);
  // const { register, handleSubmit } = useForm<ICateData>();
  // const newCustomCate = ({ customCate }: ICateData) => {
  //   setCategory([...category, customCate]);
  //   setCate(customCate);
  //   console.log(cate);
  // };
  return (
    <div>
      <h1>ToDos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      {/* <form onSubmit={handleSubmit(newCustomCate)}>
        <input
          {...register("customCate", {
            required: "Please write a category",
          })}
          placeholder="Create new category"
        />
        <button>Add</button>
      </form> */}

      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      {/*  너무 길고 반복이 많음!! */}
      {/* {category === "TO_DO" &&
        toDo.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DOING" &&
        doing.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DONE" &&
        done.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)} */}
    </div>
  );
}

export default ToDoList;
