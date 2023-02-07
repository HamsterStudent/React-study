import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  // 여기선 색을 반드시 지정해줘야 하기 때문에 optional로 못만들기 때문
  border: 5px dotted ${(props) => props.borderColor};

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CircleProp {
  bgColor: string;
  // Optional props
  borderColor?: string;
  // 이렇게 써도 됨
  //   borderColor: string | undefined;
  text?: string;
}

// 매개변수 안에서 디폴트값 설정 가능(자바스크립트 기능)
function Circle({ bgColor, borderColor, text = "default text" }: CircleProp) {
  // number나 string로 value를 받고 싶다면 이렇게 지정
  // state 타입을 바꾸는 일은 드물긴하다
  const [value, setValue] = useState<number | string>(0);
  // Optional props. borderColor가 없다면 bgColor를 보내라(default값)
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
