import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
`;

// styled component와 같이 쓰려면 이렇게 써야 함
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 45px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  /* display: grid;
  grid-template-columns: repeat(2, 1fr); */
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// vaiantes는 애니메이션의 무대? 같은것
// https://www.framer.com/docs/animation
// 물리 수치를 설정할 수 있다
// const myVars = {
//   start: { scale: 0 },
//   end: { scale: 1, rotateZ: 360, transition: { type: "spring", bounce: 0.8 } },
// };

// const boxVariants = {
//   start: {
//     opacity: 0,
//     scale: 0.5,
//   },
//   end: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       duration: 0.5,
//       bounce: 0.5,
//       delayChildren: 0.3,
//       // 순차적으로 나오게 자동으로 도와줌. 공식문서를 읽어보는게 좋은것같다
//       staggerChildren: 0.15,
//     },
//   },
// };
// const circleVariants = {
//   start: {
//     opacity: 0,
//     // y와 x는 motion에서만 씀
//     y: 10,
//   },
//   end: {
//     opacity: 1,
//     y: 0,
//   },
// };

const boxVariants = {
  hover: {
    scale: 2,
    rotateZ: "90deg",
  },
  click: {
    scale: 1,
    borderRadius: "100px",
  },
  drag: {
    backgroundColor: "rgb(46, 204, 113)",
    transition: { duration: 10 },
  },
};

function App() {
  // ref .. 조각을 연결해준다는데
  // const biggerBoxRef = useRef<HTMLDivElement>(null);

  // value는 값을 가져다가 다른 숫자로 변경하는 걸 가능하게 해준다
  const x = useMotionValue(0);
  // x가 -800일때 2를 반환, 0일때 1 반환, 800일때 0 반환
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  useMotionValueEvent(rotateZ, "change", (l) => {
    console.log(l);
  });
  return (
    // {/* <Wrapper>
    //   <Box variants={boxVariants} initial="start" animate="end">
    //     부모 애니메이션이 자식에게도 계승됨 자식 컴포넌트의 initial이름과
    //     animate이름을 부모와 같게 하면 안적어도됨
    //     <Circle variants={circleVariants} />
    //     <Circle variants={circleVariants} />
    //     <Circle variants={circleVariants} />
    //     <Circle variants={circleVariants} />
    //   </Box>
    // </Wrapper> */}

    // {/* initial은 애니메이션 시작점에 넣을 설정 이름을 */}
    // {/* animation은 움직일 동작에 넣을 설정 이름을 기재 */}
    // {/* <Box variants={myVars} initial="start" animate="end" /> */}

    // {/* <Wrapper>
    //   <BiggerBox ref={biggerBoxRef}>
    //     <Box
    //       //drag라고 쓰기만 하면 되는거냐....
    //       //rgb로 써야 자연스럽게 변한
    //       drag
    //       // 드래그한 항목이 원위치로 가게 만듬
    //       dragSnapToOrigin
    //       dragConstraints={biggerBoxRef}
    //       // 마우스 커서와 물체가 작용하는 힘에 대한 함수..
    //       // 0은 힘이 없어서 박스 안에 걸림, 1은 힘이 좋아서 박스 밖까지 그냥 가져감
    //       dragElastic={0}
    //       variants={boxVariants}
    //       whileHover="hover"
    //       whileDrag="drag"
    //       whileTap="click"
    //     />
    //   </BiggerBox>
    // </Wrapper> */}

    <Wrapper>
      <Box style={{ x, rotateZ }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;
