import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// styled component와 같이 쓰려면 이렇게 써야 함
const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  height: 200px;
  border-radius: 45px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 50px;
  width: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: (custom: any) => ({
    scale: 1.1,
    originX: custom === "1" ? 1 : custom === "2" ? 0 : custom === "3" ? 1 : 0,
    originY: custom === "1" ? 1 : custom === "2" ? 1 : custom === "3" ? 0 : 0,
  }),
};

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  const [id, setId] = useState<null | string>(null);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            custom={n}
            variants={boxVariants}
            whileHover="hover"
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
          >
            {n === "2" ? (
              !clicked ? (
                <Circle layoutId="circle" style={{ borderRadius: 50 }} />
              ) : null
            ) : null}

            {n === "3" ? (
              clicked ? (
                <Circle layoutId="circle" style={{ borderRadius: 50 }} />
              ) : null
            ) : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box layoutId={id} style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <button onClick={toggleClicked}>Click me</button>
    </Wrapper>
  );
}

export default App;
