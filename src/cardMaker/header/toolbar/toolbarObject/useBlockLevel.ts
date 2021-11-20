import { RefObject, useEffect } from 'react';
import { shiftUpBlock, shiftDownBlock } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';

export function useBlockLevel(
  buttonUp: RefObject<HTMLButtonElement>,
  buttonDown: RefObject<HTMLButtonElement>): void {

  function handlerClickShiftUp(event: Event): void {
    event.preventDefault();
    dispatch(shiftUpBlock);
  }

  function handlerClickShiftDown(event: Event): void {
    event.preventDefault();
    dispatch(shiftDownBlock);
  }

  useEffect(() => {
    if (buttonUp.current) {
      buttonUp.current.addEventListener("click", handlerClickShiftUp);
    }
    if (buttonDown.current) {
      buttonDown.current.addEventListener("click", handlerClickShiftDown);
    }
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


