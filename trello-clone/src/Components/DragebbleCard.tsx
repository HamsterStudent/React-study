import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 10px;
`;

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDragabbleCardProps) {
  return (
    // Draggable의 key 와 draggableId는 같아야한다
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(hamster) => (
        <Card
          ref={hamster.innerRef}
          {...hamster.dragHandleProps}
          {...hamster.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

// react.memo는 prop가 변하지 않는다면 컴포넌트를 렌더링하지 말라고 명령
export default React.memo(DraggableCard);
