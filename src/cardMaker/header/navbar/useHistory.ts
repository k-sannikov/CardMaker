import { MutableRefObject, useEffect } from 'react';
import { dispatch } from '../../../CardMaker';
import { undo, redo } from '../../../CardMakerFunctions';

export function useHistory(
  buttonUndo: MutableRefObject<HTMLButtonElement>,
  buttonRedo: MutableRefObject<HTMLButtonElement>
) {
  useEffect(() => {
    buttonUndo.current.addEventListener("click", handlerClickUndo);
    buttonRedo.current.addEventListener("click", handlerClickRedo);
    function handlerClickUndo() {
      dispatch(undo);
    }
    function handlerClickRedo() {
      dispatch(redo);
    }
    return () => {
      buttonUndo.current.removeEventListener("click", handlerClickUndo);
      buttonRedo.current.removeEventListener("click", handlerClickRedo);
    };
  }, []);
}