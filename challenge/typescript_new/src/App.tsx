import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  // 이벤트에도 타입 추가 이벤트 어케암? 검색....
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // currentTarget는 target과 같은데 typescript에서는 전자를 더 많이 씀
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
