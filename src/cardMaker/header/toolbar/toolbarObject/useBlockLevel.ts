import { RefObject, useContext, useEffect } from 'react';
import StoreContext from '../../../../StoreContext';
import { shiftUpBlock, shiftDownBlock } from '../../../../store/actionCreators/blockActionCreators';

export function useBlockLevel(
  buttonUp: RefObject<HTMLButtonElement>,
  buttonDown: RefObject<HTMLButtonElement>): void {

  const store = useContext(StoreContext);
  
  function handlerMousedownShiftUp(event: Event): void {
    event.preventDefault();
    store.dispatch(shiftUpBlock());
  }

  function handlerMousedownShiftDown(event: Event): void {
    event.preventDefault();
    store.dispatch(shiftDownBlock());
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


