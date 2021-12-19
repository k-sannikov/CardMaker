import { RefObject, useEffect } from "react";
import { verify } from "../../../../../utils/permisions";

export function useEditStateText(
  button: RefObject<HTMLButtonElement>,
  enabled: boolean | null,
  modifyFn: (() => void) | ((enabled: boolean) => void),
  param: boolean) {

  function handleClickButton(event: Event) {
    if (enabled !== null) {
      modifyFn(!enabled)
      event.preventDefault();
    } else if (!param) {
      modifyFn(true)
    }
  }

  useEffect(() => {
    verify(button.current).addEventListener("click", handleClickButton);
    return () => {
      if (button.current) {
        button.current.removeEventListener("click", handleClickButton);
      }
    };
  }, [enabled, param]);
}