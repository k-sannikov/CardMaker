import { RefObject, useEffect } from "react";

export function useCreateText(button: RefObject<HTMLButtonElement>, createTextBlock: () => void,) {

  function handleClickButton() {
    createTextBlock();
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