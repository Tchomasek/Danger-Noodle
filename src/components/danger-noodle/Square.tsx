import React from "react";
import styled from "styled-components";

const MyTd = styled.td`
  width: 50px;
  height: 50px;
  border: 1px solid black;
`;

export function Square(props: { value: string | null }) {
  return <MyTd>{props.value}</MyTd>;
}
