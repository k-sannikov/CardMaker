import { useEffect, RefObject, useContext } from 'react';

import StoreContext from '../../StoreContext';
import { setPositionBlock } from '../../store/actionCreators/blockActionCreators';
import { Position } from '../../CardMakerTypes';

export function useDragAndDrop(block: RefObject<HTMLElement>, defPos: Position): void {
  const store = useContext(StoreContext);

  let currentPos: Position;
  let startPos: Position;

  function handleMousedown(event: MouseEvent): void {
    startPos = {
      x: event.pageX,
      y: event.pageY,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent): void {
    console.log();
    if (!event.defaultPrevented) {
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

  }

  function handleMouseUp(): void {
    if (currentPos) {
      store.dispatch(setPositionBlock(currentPos.x, currentPos.y));
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