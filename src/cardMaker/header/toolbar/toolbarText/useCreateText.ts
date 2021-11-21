import { RefObject, useEffect } from "react";
import { dispatch } from '../../../../CardMaker';
import { createTextComponent } from '../../../../CardMakerFunctions';


export function useCreateText(button: RefObject<HTMLButtonElement>) {

  function handleClickButton() {
    dispatch(createTextComponent);
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