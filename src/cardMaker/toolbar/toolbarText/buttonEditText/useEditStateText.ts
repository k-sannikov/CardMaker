import { RefObject, useEffect } from "react";
import { verify } from "../../../../utils/permisions";

export function useEditStateText(
  button: RefObject<HTMLButtonElement>,
  enabled: boolean | null,
  modifyFn: (() => void) | ((enabled: boolean) => void),
  param: boolean) {

  useEffect(() => {

    const btn: HTMLButtonElement | null = button.current;

    function handleClickButton(event: Event) {
      if (enabled !== null) {
        modifyFn(!enabled)
        event.preventDefault();
      } else if (!param) {
        modifyFn(true)
      }
    }


    verify(btn).addEventListener("click", handleClickButton);
    return () => {
      if (btn) btn.removeEventListener("click", handleClickButton);
    };
  }, [button, modifyFn, enabled, param]);
}