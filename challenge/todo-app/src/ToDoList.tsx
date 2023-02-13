import { useState } from "react";
import { useForm } from "react-hook-form";

// useForm을 사용하지 않은 코드(폼이 여러개일때 일일히 다 해줄 수 없기 때문에 힘듬)
// function ToDoList() {
//   const [todo, setTodo] = useState("");
//   const [todoError, setTodoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodoError("");
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (todo.length < 10) {
//       return setTodoError("To do should be longer");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={todo} placeholder="Wirte a to do" />
//         <button>Add</button>
//         {todoError !== "" ? todoError : null}
//       </form>
//     </div>
//   );
// }

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password01: string;
  password02: string;
  extraError?: string;
}

function ToDoList() {
  // watch는 입력값들의 변화를 관찰할 수 있게 해 주는 함수
  // const { watch } = useForm();

  // register 함수로 onChange / onBlur / onFocus 등을 호출 가능
  // onChange, value, useState 대체
  // handleSubbmit : preventDefault
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError은 특정한 에러를 발생시키게 해줌. 발생하는 문제에 따라 추가적으로 에러 설정
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onVaild = (data: IFormData) => {
    if (data.password01 !== data.password02) {
      setError(
        "password01",
        { message: "password are not the same" },
        { shouldFocus: true },
      );
    }
    setError("extraError", { message: "sever offline" });
  };
  // formState.error은 에러를 보여줌
  console.log(errors);
  return (
    <div>
      {/* handleSubmit : 데이터가 유효할 때 호출되는 함수, 유효하지 않을 때 호출되는 함수 두개를 받아옴 */}
      {/* 모든 활동이 끝나고 데이터가 유효할때만 함수 호출 */}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onVaild)}
      >
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "write here",
            // vaildate 안에 규칙을 여러개 넣을 수 있다.
            // async를 넣어서 서버 요청을 확인하고 비동기로 실행시킬수도 있다.
            validate: {
              noHamster: (value) =>
                value.includes("hamster") ? "No hamster is allow" : true,
              noCute: (value) =>
                value.includes("cute") ? "No cute is allow" : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>

        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", {
            required: "write here",
            minLength: {
              value: 5,
              message: "username is too short",
            },
            // validate는 함수를 값으로 받음. 인자로 항목에 현재 쓰여지고 있는 값을 받음
            // react-hook-form에서 문자열을 리턴하면 에러메세지를 리턴한다는 것과 같음
            validate: (value) =>
              value.includes("hamster") ? "No hamster is allow" : true,
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password01", {
            // required나 minLength에 message를 설정할 수 있다
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short",
            },
          })}
          placeholder="password01"
        />
        <span>{errors?.password01?.message}</span>
        <input
          {...register("password02", { required: "write here", minLength: 5 })}
          placeholder="password02"
        />
        <span>{errors?.password02?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
