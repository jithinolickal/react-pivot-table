import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ItemContainer = styled.div`
  padding: 10px;
  margin: 10px;
  display: flex;
  background: #c4c4c4;
  border-radius: 5px;
  justify-content: center;
`;
const ItemText = styled.div`
  font-size: 14px;
  line-height: 16px;

  color: #ffffff;
`;

function Item(props) {
  return (
    <Draggable
      draggableId={props.item.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <ItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ItemText>{props.item.content}</ItemText>
        </ItemContainer>
      )}
    </Draggable>
  );
}

export default Item;
