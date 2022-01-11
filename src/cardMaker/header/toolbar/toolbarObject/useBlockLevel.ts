import { RefObject, useEffect } from "react";
import { verify } from "../../../../utils/permisions";

export function useBlockLevel(
  buttonUp: RefObject<HTMLButtonElement>,
  buttonDown: RefObject<HTMLButtonElement>,
  shiftUpBlock: () => void,
  shiftDownBlock: () => void): void {

  useEffect(() => {

    const btnUp = buttonUp.current;
    const btnDown = buttonDown.current;

    function handlerClickShiftUp(event: Event): void {
      event.preventDefault();
      shiftUpBlock();
    }
  
    function handlerClickShiftDown(event: Event): void {
      event.preventDefault();
      shiftDownBlock();
    }


    verify(btnUp).addEventListener("click", handlerClickShiftUp);
    verify(btnDown).addEventListener("click", handlerClickShiftDown);
    return () => {
      if (btnUp) btnUp.removeEventListener("click", handlerClickShiftUp);
      if (btnDown) btnDown.removeEventListener("click", handlerClickShiftDown);
    };
  }, [buttonUp, buttonDown, shiftUpBlock, shiftDownBlock]);
}


