import { useEffect, RefObject } from 'react';
import { dispatch } from '../../CardMaker';
import { setPositionComponent } from '../../CardMakerFunctions';

type posType = {
  x: number,
  y: number,
}
export function useDragAndDrop(block: RefObject<HTMLElement>, defPos: posType): void {
  let currentPos: posType;
  let startPos: posType;

  function handleMousedown(event: MouseEvent): void {
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent): void {
    currentPos = {
      x: defPos.x,
      y: defPos.y,
    };
    const delta = {
      x: event.pageX - startPos.x,
      y: event.pageY - startPos.y
    }
    const newPos = {
      x: currentPos.x + delta.x,
      y: currentPos.y + delta.y
    }
    currentPos = newPos;
    if (block.current) {
      block.current.style.left = String(newPos.x) + 'px';
      block.current.style.top = String(newPos.y) + 'px';
    }
  }

  function handleMouseUp(): void {
    if (currentPos) {
      dispatch(setPositionComponent, {
        newX: currentPos.x,
        newY: currentPos.y,
      });
    } else {
      dispatch(setPositionComponent, {
        newX: defPos.x,
        newY: defPos.y,
      });
    }
    if (block.current) {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }

  useEffect(() => {
    if (block.current) {
      block.current.addEventListener("mousedown", handleMousedown);
    }
    return () => {
      if (block.current) {
        block.current.removeEventListener("mousedown", handleMousedown);
      }
    };
  });
}