import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  // 이미 있는 인터페이스에서 일부분 뽑아쓰고 싶다면 IToDo["가져올 항목 이름"]
  // const onClick = (newCategory: IToDo["category"]) => {};

  const setToDos = useSetRecoilState(toDoState);
  // target이벤트로 정보를 받아옴
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 내부에 있는 currentTarget의 이름을 가져와라
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      // findIndex((toDo) => toDo.id)의 toDo는 각 el을 지칭하는 것임
      // findIndex는 배열 내부에서 제시한 조건과 맞는 요소의 index를 찾아서 순서 반환
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      console.log(oldToDo, newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const handleDelete = () => {
    setToDos((oldToDos) => {
      // filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
      const newToDos = oldToDos.filter((toDo) => toDo.id !== id);
      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {/* onClick에 상태를 전달하기 위해 onClick 내부에서 한번 더 실행하는 방법 */}
      {/* {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To DO</button>
      )}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>DOING</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>DONE</button>
      )} */}

      {/* 각각 이름을 지어주는 방법 */}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To DO
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
      <button onClick={handleDelete}>DELETE</button>
    </li>
  );
}

export default ToDo;
