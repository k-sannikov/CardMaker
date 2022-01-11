import { useEffect, RefObject } from "react";
import { Position, Size } from "../../store/types";
import { verify } from "../../utils/permisions";
import { calcHeightByWidth, calcWidthByHeight } from "../../utils/size";

export function useResize(
  setSizeBlock: (width: number, height: number) => void,
  setPositionBlock: (x: number, y: number) => void,
  LT: RefObject<HTMLElement>,
  RT: RefObject<HTMLElement>,
  LB: RefObject<HTMLElement>,
  RB: RefObject<HTMLElement>,
  block: RefObject<HTMLElement>,
  defPos: Position,
  defSize: Size
): void {


  useEffect(() => {

    const currentBlock = block.current;
    const pointLT = LT.current;
    const pointRT = RT.current;
    const pointLB = LB.current;
    const pointRB = RB.current;

    let startPos: Position;
    let point: string;

    function handleMousedown(event: MouseEvent): void {
      event.preventDefault();
      switch (event.target) {
        case pointLT:
          point = "LT";
          break;
        case pointRT:
          point = "RT";
          break;
        case pointLB:
          point = "LB";
          break;
        case pointRB:
          point = "RB";
          break;
      }

      startPos = {
        x: event.pageX + (5 - event.offsetX),
        y: event.pageY + (5 - event.offsetY)
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    let newWidth: number = defSize.width;
    let newHeight: number = defSize.height;
    let prevWidth: number = defSize.width;
    let prevHeight: number = defSize.height;
    let newPos: Position;

    function handleMouseMove(event: MouseEvent): void {
      event.preventDefault();
      const delta = {
        x: event.pageX - startPos.x,
        y: event.pageY - startPos.y,
      }

      // перемещение при изменении размеров
      let moving: Position = { x: 0, y: 0 };
      switch (point) {
        case "LT":
          [newWidth, newHeight] = calculateSize({ x: -delta.x, y: -delta.y }, prevWidth, prevHeight);
          moving = { x: defSize.width - newWidth, y: defSize.height - newHeight };
          break;
        case "RT":
          [newWidth, newHeight] = calculateSize({ x: delta.x, y: -delta.y }, prevWidth, prevHeight);
          moving = { x: 0, y: defSize.height - newHeight };
          break;
        case "LB":
          [newWidth, newHeight] = calculateSize({ x: -delta.x, y: delta.y }, prevWidth, prevHeight);
          moving = { x: defSize.width - newWidth, y: 0 };
          break;
        case "RB":
          [newWidth, newHeight] = calculateSize(delta, prevWidth, prevHeight);
          break;
      }

      verify(currentBlock).style.width = `${newWidth}px`;
      verify(currentBlock).style.height = `${newHeight}px`;

      newPos = {
        x: defPos.x + moving.x,
        y: defPos.y + moving.y
      }

      verify(currentBlock).style.left = `${newPos.x}px`;
      verify(currentBlock).style.top = `${newPos.y}px`;

      prevWidth = newWidth;
      prevHeight = newHeight;
    }

    function calculateSize(delta: Position, prevWidth: number, prevHeight: number) {
      if ((delta.x / prevWidth) < (delta.y / prevHeight)) {
        newHeight = defSize.height + delta.y;
        newHeight = newHeight < 20 ? 20 : newHeight;
        newWidth = calcWidthByHeight(prevWidth, prevHeight, newHeight);
      } else {
        newWidth = defSize.width + delta.x;
        newWidth = newWidth < 20 ? 20 : newWidth;
        newHeight = calcHeightByWidth(prevWidth, prevHeight, newWidth);
      }
      return [newWidth, newHeight];
    }

    function handleMouseUp(): void {
      setSizeBlock(newWidth, newHeight);
      if (newPos) setPositionBlock(newPos.x, newPos.y);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    
    verify(pointLT).addEventListener("mousedown", handleMousedown);
    verify(pointRT).addEventListener("mousedown", handleMousedown);
    verify(pointLB).addEventListener("mousedown", handleMousedown);
    verify(pointRB).addEventListener("mousedown", handleMousedown);
    return () => {
      if (pointLT) pointLT.removeEventListener("mousedown", handleMousedown);
      if (pointRT) pointRT.removeEventListener("mousedown", handleMousedown);
      if (pointLB) pointLB.removeEventListener("mousedown", handleMousedown);
      if (pointRB) pointRB.removeEventListener("mousedown", handleMousedown);
    };
  }, [setSizeBlock, setPositionBlock, LT, RT, LB, RB, block, defPos, defSize]);
}