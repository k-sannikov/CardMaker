import { useEffect, RefObject } from 'react';
import { Position } from '../../store/types';
import { verify } from '../../utils/permisions';

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

      verify(block.current).style.left = String(newPos.x) + 'px';
      verify(block.current).style.top = String(newPos.y) + 'px';

    }
  }

  function handleMouseUp(): void {
    if (newPos) {
      setPositionBlock(newPos.x, newPos.y);
    }
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  useEffect(() => {
    verify(block.current).addEventListener("mousedown", handleMousedown);
    return () => {
      if (block.current) {
        block.current.removeEventListener("mousedown", handleMousedown);
      }
    };
  });
}