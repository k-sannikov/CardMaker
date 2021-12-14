import { useEffect, RefObject } from 'react';
import { Position } from '../../store/types';

export function useDragAndDrop(
  block: RefObject<HTMLElement>,
  defPos: Position,
  setPositionBlock: (x: number, y: number) => void
): void {

  let startPos: Position;

  function handleMousedown(event: MouseEvent): void {
    
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  let newPos: Position;
  function handleMouseMove(event: MouseEvent): void {
    if (!event.defaultPrevented) {

      const delta = {
        x: event.pageX - startPos.x,
        y: event.pageY - startPos.y
      }

      newPos = {
        x: defPos.x + delta.x,
        y: defPos.y + delta.y
      }

      if (block.current) {
        block.current.style.left = String(newPos.x) + 'px';
        block.current.style.top = String(newPos.y) + 'px';
      }

    }

  }

  function handleMouseUp(): void {
    if (newPos) {
      setPositionBlock(newPos.x, newPos.y);
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