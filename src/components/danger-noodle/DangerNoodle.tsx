import { Square } from "./Square";
import React, { useEffect, useState } from "react";
import produce from "immer";
import styled from "styled-components";

const GRID_SIZE = 10;

function createGrid() {
  return Array.from({ length: GRID_SIZE }).map(() =>
    Array.from({ length: GRID_SIZE }, () => null as null | string)
  );
}

export function DangerNoodle() {
  const initialGrid = createGrid();
  initialGrid[0][0] = "X";
  const [grid, setGrid] = useState(initialGrid);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    document.addEventListener("keydown", logKey);
    return () => {
      document.removeEventListener("keydown", logKey);
    };
  });
  const logKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      if (y === 0) {
        return;
      }
      const newGrid = produce(grid, (draft) => {
        draft[y][x] = null;
        draft[y - 1][x] = "X";
      });
      setGrid(newGrid);
      setY(y - 1);
    }
    if (e.key === "ArrowDown") {
      if (y === 9) {
        return;
      }
      const newGrid = produce(grid, (draft) => {
        draft[y][x] = null;
        draft[y + 1][x] = "X";
      });
      setGrid(newGrid);
      setY(y + 1);
    }
    if (e.key === "ArrowLeft") {
      if (x === 0) {
        return;
      }
      const newGrid = produce(grid, (draft) => {
        draft[y][x] = null;
        draft[y][x - 1] = "X";
      });
      setGrid(newGrid);
      setX(x - 1);
    }
    if (e.key === "ArrowRight") {
      if (x === 9) {
        return;
      }
      const newGrid = produce(grid, (draft) => {
        draft[y][x] = null;
        draft[y][x + 1] = "X";
      });
      setGrid(newGrid);
      setX(x + 1);
    }
  };
  const board = grid.map((row, i) => {
    return (
      <tr key={"row_" + i}>
        {row.map((col, j) => {
          return <Square key={i + "_" + j} value={col} />;
        })}
      </tr>
    );
  });
  return (
    <DivWrapper>
      <table cellSpacing="0">
        <tbody>{board}</tbody>
      </table>
    </DivWrapper>
  );
}

const DivWrapper = styled.div`
  display: flex;
  margin: auto;
  text-align: center;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
