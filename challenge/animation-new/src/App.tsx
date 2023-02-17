import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useScroll,
} from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
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

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const svg = {
  start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
  end: { fill: "rgba(255,255,255,1)", pathLength: 1 },
};

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
  // motionValue는 리랜더링이 일어나지 않음
  const x = useMotionValue(0);
  // x가 -800일때 2를 반환, 0일때 1 반환, 800일때 0 반환
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ],
  );
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
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

    <Wrapper style={{ background: gradient }}>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          transition={{
            default: { duration: 5 },
            fill: { duration: 1, delay: 3 },
          }}
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg>
      {/* <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin /> */}
    </Wrapper>
  );
}

export default App;
