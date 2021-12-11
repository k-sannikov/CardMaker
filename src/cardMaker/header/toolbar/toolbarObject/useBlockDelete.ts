import { RefObject, useContext, useEffect } from 'react';

import StoreContext from '../../../../StoreContext';
import { deleteBlock } from '../../../../store/actionCreators/blockActionCreators';

export function useBlockDelete(buttonDelete: RefObject<HTMLButtonElement>): void {
  const store = useContext(StoreContext);

  function handlerMousedownDelete(): void {
    store.dispatch(deleteBlock());
  }

  useEffect(() => {
    if (buttonDelete.current) {
      buttonDelete.current.addEventListener("mousedown", handlerMousedownDelete);
    }
    return () => {
      if (buttonDelete.current) {
        buttonDelete.current.removeEventListener("mousedown", handlerMousedownDelete);
      }
    };
  }, []);
}


