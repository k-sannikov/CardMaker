import { RefObject, useEffect } from "react";
import { verify } from "../../../../utils/permisions";

export function useCreateText(button: RefObject<HTMLButtonElement>, createTextBlock: () => void,) {

  useEffect(() => {

    function handleClickButton() {
      createTextBlock();
    }


    verify(button.current).addEventListener("click", handleClickButton);
    return () => {
      if (button.current) button.current.removeEventListener("click", handleClickButton);
    };
  }, [button, createTextBlock]);
}