import { RefObject, useEffect } from 'react';
import { verify } from '../../../../utils/permisions';

export function useBlockLevel(
  buttonUp: RefObject<HTMLButtonElement>,
  buttonDown: RefObject<HTMLButtonElement>,
  shiftUpBlock: () => void,
  shiftDownBlock: () => void): void {

  function handlerClickShiftUp(event: Event): void {
    event.preventDefault();
    shiftUpBlock();
  }

  function handlerClickShiftDown(event: Event): void {
    event.preventDefault();
    shiftDownBlock();
  }

  useEffect(() => {
    verify(buttonUp.current).addEventListener("click", handlerClickShiftUp);
    verify(buttonDown.current).addEventListener("click", handlerClickShiftDown);
    return () => {
      if (buttonUp.current) {
        buttonUp.current.removeEventListener("click", handlerClickShiftUp);
      }
      if (buttonDown.current) {
        buttonDown.current.removeEventListener("click", handlerClickShiftDown);
      }
    };
  }, []);
}


