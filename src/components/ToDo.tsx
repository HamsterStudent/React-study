import { IToDo } from "../atoms";
// prop으로 전달받는 정보와 받는 정보의 타입(interface)이 같기 때문에 배열로 가지고 와도 됨
function ToDo({ text }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Done</button>
      <button>Doing</button>
    </li>
  );
}

export default ToDo;
