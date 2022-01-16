import { useEffect, RefObject } from "react";
import { Position } from "../../store/types";
import { verify } from "../../utils/permisions";

export function useDragAndDrop(
  block: RefObject<HTMLElement>,
  defPos: Position,
  setPositionBlock: (x: number, y: number) => void
): void {


  useEffect(() => {

    const currentBlock: HTMLElement | null = block.current;

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
        event.preventDefault();
        const delta: Position = {
          x: event.pageX - startPos.x,
          y: event.pageY - startPos.y
        }
        newPos = {
          x: defPos.x + delta.x,
          y: defPos.y + delta.y
        }
        verify(currentBlock).style.left = `${newPos.x}px`;
        verify(currentBlock).style.top = `${newPos.y}px`;
      }
    }

    function handleMouseUp(): void {
      if (newPos) {
        setPositionBlock(newPos.x, newPos.y);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }


    if (currentBlock) currentBlock.addEventListener("mousedown", handleMousedown);
    return () => {
      if (currentBlock) currentBlock.removeEventListener("mousedown", handleMousedown);
    };
  }, [block, defPos, setPositionBlock]);
}