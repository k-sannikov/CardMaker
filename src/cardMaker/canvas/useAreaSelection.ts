import { useEffect, RefObject } from 'react';
import { Position } from '../../store/types';
import { verify } from '../../utils/permisions';

export function useAreaSelection(
  canvas: RefObject<HTMLDivElement>,
  area: RefObject<HTMLDivElement>,
  areaSelection: (x: number, y: number, width: number, height: number) => void,
  resetAreaSelection: () => void): void {

  useEffect(() => {

    const field = canvas.current;
    const selectArea = area.current;

    let startPos: Position;
    let startOffsetPos: Position;

    const div: HTMLDivElement = document.createElement("div");
    div.style.position = 'absolute';
    div.style.zIndex = '1';
    div.style.pointerEvents = 'none';

    function handleMousedown(event: MouseEvent): void {
      
      if (!event.defaultPrevented && event.target === field) {
        startPos = {
          x: event.pageX,
          y: event.pageY,
        };

        startOffsetPos = {
          x: event.offsetX,
          y: event.offsetY,
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        div.style.border = '1px dashed red';
        div.style.width = '0px';
        div.style.height = '0px';

        div.style.left = event.offsetX + 'px';
        div.style.top = event.offsetY + 'px';
        if (field) field.appendChild(div);
      }
    }


    function handleMouseMove(event: MouseEvent): void {

      if (!event.defaultPrevented) {

        const delta = {
          x: Math.abs(event.pageX - startPos.x),
          y: Math.abs(event.pageY - startPos.y)
        }

        let moving: Position = { x: 0, y: 0 };

        if (startPos.x >= event.pageX && startPos.y >= event.pageY) { // левый верхний
          moving = { x: -delta.x, y: -delta.y };
        } else if (startPos.x <= event.pageX && startPos.y >= event.pageY) { // правый верхний
          moving = { x: 0, y: -delta.y };
        } else if (startPos.x >= event.pageX && startPos.y <= event.pageY) { // левый нижний
          moving = { x: -delta.x, y: 0 };
        }

        div.style.width = delta.x + 'px';
        div.style.height = delta.y + 'px';

        div.style.left = startOffsetPos.x + moving.x + 'px';
        div.style.top = startOffsetPos.y + moving.y + 'px';
      }
    }

    function handleMouseUp(): void {

      if (div.offsetWidth > 2 && div.offsetHeight > 2) {
        areaSelection(div.offsetLeft, div.offsetTop, div.offsetWidth, div.offsetHeight);
      }
      div.remove();

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

    }

    function handleMousedownDocument(event: Event): void {
      if (!event.defaultPrevented && area.current) {
        event.preventDefault();
        if (area.current !== event.target) {
          resetAreaSelection();
        }
      }
    }

    function handleMousedownArea(event: MouseEvent) {
      event.preventDefault();
    }

    
    verify(field).addEventListener("mousedown", handleMousedown);
    if (selectArea) selectArea.addEventListener("mousedown", handleMousedownArea);
    document.addEventListener("mousedown", handleMousedownDocument);
    return () => {
      if (field) field.removeEventListener("mousedown", handleMousedown);
      if (selectArea) selectArea.removeEventListener("mousedown", handleMousedownArea);
      document.removeEventListener("mousedown", handleMousedownDocument);
    };
  }, [canvas, area, areaSelection, resetAreaSelection]);
}