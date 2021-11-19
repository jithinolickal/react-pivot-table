import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DataTable from "./DataTable";
import Item from "./Item";

const Container = styled.div`
  background-color: #eeeeee;
`;
const AvailableContainer = styled.div`
  padding: 0px 2%;
  background: #fcfcfc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  height: 100px;
  display: flex;
  align-items: center;
`;
const AvailableLabel = styled.div`
  font-size: 14px;
  line-height: 16px;
  padding-right: 1%;
  margin-right: 1%;
  border-right: 1px solid #e1e1e1;
`;
const AvailableItemContainer = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px dashed #000000;
  box-sizing: border-box;
  width: 100%;
  min-height:50%;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggedOver ? "#ebebeb" : "white")};
`;

const ColRowTableContainer = styled.div`
  margin-top: 1%;
  background-color: #fcfcfc;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 0.5%;
`;
const ColumnGroupContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
`;
const ColumnGroupSpace = styled.div`
  flex: 1;
  margin-left: auto;
`;
const ColumnGroup = styled.div`
  display: flex;
  flex: 9;
  margin-left: auto;
  background: #ffffff;
  border: 1px dashed #000000;
  box-sizing: border-box;
`;
const ColumnLabel = styled.div`
  font-size: 14px;
  line-height: 16px;
  padding: 0px 1%;
  margin-right: 1%;
  border-right: 1px solid #e1e1e1;
  display: flex;
  align-items: center;
`;
const ColumnItemGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 55px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggedOver ? "#ebebeb" : "white")};
`;

const RowTableContainer = styled.div`
  display: flex;
  min-height: 300px;
`;
const RowGroup = styled.div`
  flex: 1;
  background: #ffffff;
  border: 1px dashed #000000;
  box-sizing: border-box;
`;
const RowLabel = styled.div`
  padding: 10%;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 1%;
  border-bottom: 1px solid #e1e1e1;
  text-align: center;
`;
const RowItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50%;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggedOver ? "#ebebeb" : "white")};
`;

const TableContainer = styled.div`
  flex: 9;
  background: #ffffff;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.15);
  margin: 0px 5px;
`;

const InnerList = React.memo(({ columnItem, itemMap }) => {
  const items = columnItem.itemId.map((itemId) => itemMap[itemId]);
  return items.map((item, index) => (
    <Item key={item.id} item={item} index={index} />
  ));
});

function PivotTable({pivotData, tableData}) {
  const [state, setstate] = useState(pivotData);
  const [data, setData] = useState(tableData);


  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    // Check if location of draggable changed. if true, the user droped back into taken position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    console.log(start);
    console.log(finish);

    // Moving between same column
    if (start === finish) {
      const newItemIds = [...start.itemId];

      newItemIds.splice(source.index, 1); // Removes source index
      newItemIds.splice(destination.index, 0, draggableId); // Adds draggableId item at destination index

      const newColumn = { ...start, itemId: newItemIds }; // creates a new object for selected column with new task order

      // Sets state with new state without modifying other columns, but by adding only the new column value
      const newState = {
        ...state,
        columns: { ...state.columns, [newColumn.id]: newColumn },
      };
      setstate(newState);
      return; // Exit out of this iteration
    } else {
      // Moving from one column to another
      const startItemIds = [...start.itemId];
      startItemIds.splice(source.index, 1); // Removing item form first column
      const newStartColumn = { ...start, itemId: startItemIds }; // First column with spliced task list

      const finishItemIds = [...finish.itemId];
      finishItemIds.splice(destination.index, 0, draggableId); // Adds draggableId item at second column
      const newFinishColumn = { ...finish, itemId: finishItemIds }; // First column with spliced task list

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      };
      console.log(newState);
      setstate(newState);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Container>
        {/* Available */}
        <AvailableContainer>
          <AvailableLabel>AVAILABLE</AvailableLabel>
          <Droppable
            droppableId="availablePanel"
            direction="horizontal"
            //   type="available"
          >
            {(provided, snapshot) => (
              <AvailableItemContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggedOver={snapshot.isDraggingOver}
              >
                <InnerList
                  columnItem={state.columns["availablePanel"]}
                  itemMap={state.items}
                  index={state.columns["availablePanel"].index}
                />

                {provided.placeholder}
              </AvailableItemContainer>
            )}
          </Droppable>
        </AvailableContainer>

        <ColRowTableContainer>
          {/* Column */}
          <ColumnGroupContainer>
            <ColumnGroupSpace></ColumnGroupSpace>
            <ColumnGroup>
              <ColumnLabel>COLUMN</ColumnLabel>
              <Droppable
                droppableId="columnPanel"
                direction="horizontal"
                //   type="columnPanel"
              >
                {(provided, snapshot) => (
                  <ColumnItemGroup
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggedOver={snapshot.isDraggingOver}
                  >
                    <InnerList
                      columnItem={state.columns["columnPanel"]}
                      itemMap={state.items}
                      index={state.columns["columnPanel"].index}
                    />
                    {provided.placeholder}
                  </ColumnItemGroup>
                )}
              </Droppable>
            </ColumnGroup>
          </ColumnGroupContainer>

          <RowTableContainer>
            {/* Row */}
            <RowGroup>
              <RowLabel>ROW</RowLabel>
              <Droppable
                droppableId="rowPanel"
                direction="vertical"
                //   type="rowPanel"
              >
                {(provided, snapshot) => (
                  <RowItemGroup
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggedOver={snapshot.isDraggingOver}
                  >
                    <InnerList
                      columnItem={state.columns["rowPanel"]}
                      itemMap={state.items}
                      index={state.columns["rowPanel"].index}
                    />
                    {provided.placeholder}
                  </RowItemGroup>
                )}
              </Droppable>
            </RowGroup>
            <TableContainer><DataTable pivotState={state} tableData={data}/></TableContainer>
          </RowTableContainer>
        </ColRowTableContainer>
      </Container>
    </DragDropContext>
  );
}

export default PivotTable;
