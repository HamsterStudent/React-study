import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError("");
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("Todo should be longer");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  hamster: string;
  name: string;
  hams: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    // defaultValues 항목 기본값을 설정해주는 역할
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onVaild = (data: IForm) => {
    if (data.hamster !== data.hams) {
      setError(
        "hams",
        { message: "Hamsters are not the same" },
        { shouldFocus: true },
        // shouldFocus는 에러가 발생한 부분에 포커스 발생시키는 역할
      );
    }
    // setError는 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있다.
    // setError("extraError", { message: "Server offline" });
  };
  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("hamster", {
            required: "hamster is cute",
            minLength: { value: 5, message: "your pass too short" },
          })}
          placeholder="hamster"
        />
        <span>{errors?.hamster?.message}</span>
        <input
          {...register("hams", {
            required: "password is required",
          })}
          placeholder="hams"
        />
        <span>{errors?.hams?.message}</span>

        <input
          {...register("name", {
            required: "name is required",
            // validate는 함수를 받고, boolen을 반환한다.
            validate: {
              noHamster: (value) =>
                value.includes("hamster") ? "no hamster allowed" : true,

              noHams: (value) =>
                value.includes("hams") ? "no hams allowed" : true,
            },
          })}
          placeholder="name"
        />
        <span>{errors?.name?.message}</span>

        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
