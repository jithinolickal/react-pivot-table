import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Table = styled.table`
  border: 1px solid lightgrey;
  border-collapse: collapse;
  width: 100%;
`;
const Th = styled.th`
  border: 1px solid lightgrey;
  border-collapse: collapse;
`;
const Td = styled.td`
  border: 1px solid lightgrey;
  border-collapse: collapse;
`;

function DataTable({ pivotState, tableData }) {
  const [columnFileds, setColumnFileds] = useState([]);
  const [rowFileds, setRowFileds] = useState([]);
  // const [localPivotState, setLocalPivotState] = useState(pivotState);
  // const [data, setData] = useState(tableData);

  useEffect(() => {
    // console.log(JSON.stringify(generateColumnFields(tableData)));
    setColumnFileds(generateRowColumnFields(pivotState.columns.columnPanel));
    setRowFileds(generateRowColumnFields(pivotState.columns.rowPanel));
  }, [pivotState]);

  const generateRowColumnFields = (value) => {
    console.log(value.itemId);
    console.log(tableData);
    let newColumnFieldsArray = [];
    tableData.forEach((item) => {
      value.itemId.forEach((el) => {
        console.log(newColumnFieldsArray, item[el]);
        console.log("len", newColumnFieldsArray.length);
        // !newColumnFieldsArray.includes(item[el]) &&
        if(!newColumnFieldsArray.some(element=> element.value === item[el])){
          newColumnFieldsArray.push({type : el, value : item[el]});
        }
      });
    });
    console.log("newColumnFieldsArray", newColumnFieldsArray);
    return newColumnFieldsArray;
  };
  // const generateRowFields = (value) => {
  //   console.log(value.itemId);
  //   console.log(tableData);
  //   let newColumnFieldsArray = [];
  //   tableData.forEach((item) => {
  //     value.itemId.forEach((el) => {
  //       console.log(item[el]);
  //       !newColumnFieldsArray.includes(item[el]) &&
  //         newColumnFieldsArray.push(item[el]);
  //     });
  //   });
  //   console.log("newRowFieldsArray", newColumnFieldsArray);
  //   return newColumnFieldsArray;
  // };

  console.log(columnFileds);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <Th></Th>
            {/* <Th colspan="2" >Hi2</Th>
          <Th>Hi3</Th>
          <Th>Hi4</Th> */}
            {columnFileds.length>0 && columnFileds.map((item, index) => (
              <Th key={index}>{item.value}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowFileds.length>0 && rowFileds.map((item, index) => (
            <tr key={index}>
              <Th>{item.value}</Th> {/* Row Header */}
              {tableData.map((element, index) => {
                // if(columnFileds.length>0 && (element[columnFileds[0].type] === columnFileds[0].value && element[item.type] === item.value)){

                if(columnFileds.length>0 && (columnFileds.some(i=>(element[i.type] === i.value && element[item.type] === item.value)))){
                  return <Td key={index}>{element.total}</Td>
                }
              })}
            </tr>
          ))}
          
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;
