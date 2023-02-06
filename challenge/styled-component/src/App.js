// keyframes를 넣어야 애니메이션 만들기 용이
import styled, { keyframes } from "styled-components";

// const Hamster = styled.div`
//   /* display: flex; */
// `;

// const Box = styled.div`
//   background-color: ${(props) => props.bgColor};
//   width: 100px;
//   height: 100px;
// `;

// // styled component의 확장. Box의 스타일을 전부 가져와서 적용시켜라
// const Circle = styled(Box)`
//   border-radius: 50px;
// `;

// const Btn = styled.button`
//   width: 100px;
//   height: 30px;
//   background-color: salmon;
//   border: dotted 1px;
// `;

// // 컴포넌트를 생성할 때 속성값 설정
// const Input = styled.input.attrs({ required: true, minLength: 10 })`
//   background-color: aliceblue;
// `;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  // theme의 속성값을 가져와서 씀
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  // theme의 속성값을 가져와서 씀
  color: ${(props) => props.theme.textColor};
`;

const animation = keyframes`
  0%{
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50%{
    transform: rotate(-360deg);
    border-radius: 100px;
  }
  100%{
    border-radius: 0px;
  }
`;

const Emoji = styled.p`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${animation} 1.5s linear infinite;
  // 자식을 이런식으로 안에 넣어서 사용할 수 있다.
  /* span{
    font-size: 36px;
  } */

  // 컴포넌트도 이런식으로 선택할 수 있다.
  ${Emoji} {
    // hover처리
    &:hover {
      font-size: 98px;
    }
    &:active {
      opacity: 0;
    }
  }
  // 이렇게도 가능
  ${Emoji}:hover {
    font-size: 98px;
  }
`;

function App() {
  // return (
  //   // 리액트의 인라인 방식. 가독성이 좋지 않음. 파악하기가 어렵다
  //   // <div style={{ display: "flex" }}>
  //   //   <div style={{ backgroundColor: "tomato", width: 100, height: 100 }}></div>
  //   //   <div style={{ backgroundColor: "pink", width: 100, height: 100 }}></div>
  //   // </div>

  //   styled component 사용
  //   <Hamster as="header">
  //     <Box bgColor="teal" />
  //     <Circle bgColor="pink" />
  //     <Btn>Log in</Btn>
  //     {/* HTML속성을 변경하고 싶으면 as를 쓴다 */}
  //     <Btn as="a" href="#">
  //       Log in
  //     </Btn>
  //     <Input />
  //     <Input />
  //     <Input />
  //   </Hamster>
  // );

  // return (
  //   <Wrapper>
  //     <Box>
  //       <Emoji>^//^</Emoji>
  //     </Box>
  //     <Emoji>ㅇ0ㅇ</Emoji>
  //   </Wrapper>
  // );

  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default App;
