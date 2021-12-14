import { RefObject, useEffect } from 'react';

export function useBlockLevel(
  buttonUp: RefObject<HTMLButtonElement>,
  buttonDown: RefObject<HTMLButtonElement>,
  shiftUpBlock: () => void,
  shiftDownBlock: () => void): void {
  
  function handlerMousedownShiftUp(event: Event): void {
    event.preventDefault();
    shiftUpBlock();
  }

  function handlerMousedownShiftDown(event: Event): void {
    event.preventDefault();
    shiftDownBlock();
  }

  useEffect(() => {
    if (buttonUp.current) {
      buttonUp.current.addEventListener("mousedown", handlerMousedownShiftUp);
    }
    if (buttonDown.current) {
      buttonDown.current.addEventListener("mousedown", handlerMousedownShiftDown);
    }
    return () => {
      if (buttonUp.current) {
        buttonUp.current.removeEventListener("mousedown", handlerMousedownShiftUp);
      }
      if (buttonDown.current) {
        buttonDown.current.removeEventListener("mousedown", handlerMousedownShiftDown);
      }
    };
  }, []);
}


