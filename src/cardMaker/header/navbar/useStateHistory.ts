import { RefObject, useContext, useEffect } from 'react';

import StoreContext from '../../../StoreContext';
import { undo, redo } from '../../../store/actionCreators/historyActionCreators';

export function useStateHistory(
  buttonUndo: RefObject<HTMLButtonElement>,
  buttonRedo: RefObject<HTMLButtonElement>
): void {
  
  const store = useContext(StoreContext);

  function handlerClickUndo(): void {
    store.dispatch(undo());
  }
  function handlerClickRedo(): void {
    store.dispatch(redo());
  }

  useEffect(() => {
    if (buttonUndo.current) {
      buttonUndo.current.addEventListener("click", handlerClickUndo);
    }
    if (buttonRedo.current) {
      buttonRedo.current.addEventListener("click", handlerClickRedo);
    }
    return () => {
      if (buttonUndo.current) {
        buttonUndo.current.removeEventListener("click", handlerClickUndo);
      }
      if (buttonRedo.current) {
        buttonRedo.current.removeEventListener("click", handlerClickRedo);
      }
    };
  }, []);
}