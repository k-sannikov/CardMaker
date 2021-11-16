import { MouseEvent, MutableRefObject, useEffect } from 'react';
import { shiftUpBlock, shiftDownBlock, deleteComponent } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';

export function useObject(
  buttonUp: MutableRefObject<any>,
  buttonDown: MutableRefObject<any>,
  buttonDelete: MutableRefObject<HTMLButtonElement>) {

  useEffect(() => {
    buttonUp.current.addEventListener("click", handlerClickShiftUp);
    buttonDown.current.addEventListener("click", handlerClickShiftDown);
    buttonDelete.current.addEventListener("click", handlerClickDelete);

    function handlerClickShiftUp(event: MouseEvent<HTMLElement>) {
      dispatch(shiftUpBlock);
      event.stopPropagation();
    }

    function handlerClickShiftDown(event: MouseEvent<HTMLElement>) {
      dispatch(shiftDownBlock);
      event.stopPropagation();
    }

    function handlerClickDelete() {
      dispatch(deleteComponent);
    }
    return () => {
      buttonUp.current.removeEventListener("click", handlerClickShiftUp);
      buttonDown.current.removeEventListener("click", handlerClickShiftDown);
      buttonDelete.current.removeEventListener("click", handlerClickDelete);
    };
  }, []);
}


