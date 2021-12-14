import { useEffect, RefObject } from 'react';
import { Position, Size } from '../../store/types';

export function useResize(
  setSizeBlock: (width: number, height: number) => void,
  setPositionBlock: (x: number, y: number) => void,
  pointLT: RefObject<HTMLElement>,
  pointRT: RefObject<HTMLElement>,
  pointLB: RefObject<HTMLElement>,
  pointRB: RefObject<HTMLElement>,
  block: RefObject<HTMLElement>,
  defPos: Position,
  defSize: Size
): void {

  let startPos: Position;
  let point: string;

  function handleMousedown(event: MouseEvent): void {
    switch (event.target) {
      case pointLT.current:
        point = 'LT';
        break;
      case pointRT.current:
        point = 'RT';
        break;
      case pointLB.current:
        point = 'LB';
        break;
      case pointRB.current:
        point = 'RB';
        break;
    }

    startPos = { x: event.pageX + (5 - event.offsetX), y: event.pageY + (5 - event.offsetX) };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  let newWidth: number;
  let newHeight: number;
  let prevWidth: number = defSize.width;
  let prevHeight: number = defSize.height;
  let newPos: Position;

  function handleMouseMove(event: MouseEvent): void {
    event.preventDefault();

    const delta = {
      x: event.pageX - startPos.x,
      y: event.pageY - startPos.y,
    }

    if (block.current) {
      // перемещение при изменении размеров
      let moving: Position = { x: 0, y: 0 };
      switch (point) {
        case 'LT':
          [newWidth, newHeight] = calculateSize({ x: -delta.x, y: -delta.y }, prevWidth, prevHeight);
          moving = { x: defSize.width - newWidth, y: defSize.height - newHeight };
          break;
        case 'RT':
          [newWidth, newHeight] = calculateSize({ x: delta.x, y: -delta.y }, prevWidth, prevHeight);
          moving = { x: 0, y: defSize.height - newHeight };
          break;
        case 'LB':
          [newWidth, newHeight] = calculateSize({ x: -delta.x, y: delta.y }, prevWidth, prevHeight);
          moving = { x: defSize.width - newWidth, y: 0 };
          break;
        case 'RB':
          [newWidth, newHeight] = calculateSize(delta, prevWidth, prevHeight);
          break;
      }

      block.current.style.width = String(newWidth) + 'px';
      block.current.style.height = String(newHeight) + 'px';

      newPos = { x: defPos.x + moving.x, y: defPos.y + moving.y }

      block.current.style.left = String(newPos.x) + 'px';
      block.current.style.top = String(newPos.y) + 'px';
    }

    prevWidth = newWidth;
    prevHeight = newHeight;
  }

  function calculateSize(delta: Position, prevWidth: number, prevHeight: number) {
    if ((delta.x / prevWidth) < (delta.y / prevHeight)) {
      let shift = delta.y
      newHeight = defSize.height + shift;
      newHeight = newHeight < 20 ? 20 : newHeight;
      newWidth = (prevWidth * newHeight) / prevHeight;
    } else {
      let shift = delta.x
      newWidth = defSize.width + shift;
      newWidth = newWidth < 20 ? 20 : newWidth;
      newHeight = (prevHeight * newWidth) / prevWidth;
    }
    return [newWidth, newHeight];
  }

  function handleMouseUp(): void {
    setSizeBlock(newWidth, newHeight);
    setPositionBlock(newPos.x, newPos.y);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  useEffect(() => {
    if (pointLT.current) {
      pointLT.current.addEventListener("mousedown", handleMousedown);
    }
    if (pointRT.current) {
      pointRT.current.addEventListener("mousedown", handleMousedown);
    }
    if (pointLB.current) {
      pointLB.current.addEventListener("mousedown", handleMousedown);
    }
    if (pointRB.current) {
      pointRB.current.addEventListener("mousedown", handleMousedown);
    }
    return () => {
      if (pointLT.current) {
        pointLT.current.removeEventListener("mousedown", handleMousedown);
      }
      if (pointRT.current) {
        pointRT.current.removeEventListener("mousedown", handleMousedown);
      }
      if (pointLB.current) {
        pointLB.current.removeEventListener("mousedown", handleMousedown);
      }
      if (pointRB.current) {
        pointRB.current.removeEventListener("mousedown", handleMousedown);
      }
    };
  });
}