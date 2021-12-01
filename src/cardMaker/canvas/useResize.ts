import { useEffect, RefObject, useContext } from 'react';
// import { dispatch } from '../../CardMaker';
// import { setPositionComponent } from '../../CardMakerFunctions';

import StoreContext from '../../StoreContext';
import { setSizeBlock } from '../../store/actionCreators/actionCreators';


type posType = {
  x: number,
  y: number,
}

type sizeType = {
  width: number,
  height: number,
}


export function useResize(
  point: RefObject<HTMLElement>,
  block: RefObject<HTMLElement>,
  defPos: posType,
  defSize: sizeType
): void {

  const store = useContext(StoreContext);

  let currentPos: posType;
  let startPos: posType;

  let rider = {
    x: 0,
    y: 0,
  }

  function handleMousedown(event: MouseEvent): void {
    rider = {
      x: (10 - event.offsetX),
      y: (10 - event.offsetY),
    }
    startPos = {
      x: event.pageX + (10 - event.offsetX),
      y: event.pageY + (10 - event.offsetY),
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  let shift: number = 0;
  let newWidth: number = 0;
  let newHeight: number = 0;

  function handleMouseMove(event: MouseEvent): void {
    event.preventDefault();
    currentPos = {
      x: defPos.x,
      y: defPos.y,
    };
    const delta = {
      x: event.pageX - startPos.x + rider.x,
      y: event.pageY - startPos.y + rider.y,
    }
    const newPos = {
      x: currentPos.x + delta.x,
      y: currentPos.y + delta.y
    }

    let prevPos = currentPos;
    currentPos = newPos;

    shift = Math.max(newPos.x - prevPos.x, newPos.y - prevPos.y)

    if (block.current) {
      // старая ширина
      const width: string = block.current.style.width;
      const prevWidth: number = Number(width.substring(0, width.length - 2));
      // старая высота
      const height: string = block.current.style.height;
      const prevHeight: number = Number(height.substring(0, height.length - 2));
      newWidth = defSize.width + shift;
      [newWidth, newHeight] = giveSize(newWidth, prevWidth, prevHeight)
      newWidth = newWidth < 20 ? 20 : newWidth;
      [newWidth, newHeight] = giveSize(newWidth, prevWidth, prevHeight)
      block.current.style.width = String(newWidth) + 'px';
      block.current.style.height = String(newHeight) + 'px';
    }
  }

  function giveSize(newWidth: number, prevWidth: number, prevHeight: number) {
    const coef: number = prevWidth / newWidth;
    newHeight = prevHeight / coef;
    return [newWidth, newHeight]
  }

  function handleMouseUp(): void {
    store.dispatch(setSizeBlock(newWidth, newHeight));
    if (point.current) {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }

  useEffect(() => {
    if (point.current) {
      point.current.addEventListener("mousedown", handleMousedown);
    }
    return () => {
      if (point.current) {
        point.current.removeEventListener("mousedown", handleMousedown);
      }
    };
  });
}