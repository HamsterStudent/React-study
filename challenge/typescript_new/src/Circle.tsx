import { useState } from "react";
import styled from "styled-components";

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 5px solid ${(props) => props.borderColor};
`;

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  // borderColor: string | undefined; // 이렇게 써도 됨
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [value, setValue] = useState<number | string>(0);
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? "white"}>
      {text}
    </Container>
  );
}

export default Circle;

// interface playerShape {
//   name: string;
//   age: number;
// }
// const SayHello = (playerObj: playerShape) =>
//   `Hello ${playerObj.name} you are ${playerObj.age} years old`;

// SayHello({ name: "hamster", age: 123 });
