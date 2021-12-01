import { RefObject, useContext, useEffect } from "react";
import StoreContext from '../../../../StoreContext';
import { createTextBlock } from '../../../../store/actionCreators/actionCreators';


export function useCreateText(button: RefObject<HTMLButtonElement>) {
  const store = useContext(StoreContext);
  function handleClickButton() {
    store.dispatch(createTextBlock());
  }

  useEffect(() => {
    if (button.current) {
      button.current.addEventListener("click", handleClickButton);
    }

    return () => {
      if (button.current) {
        button.current.removeEventListener("click", handleClickButton);
      }
    };
  });
}