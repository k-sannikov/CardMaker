import { RefObject, useEffect } from "react";
import { verify } from "../../../../../utils/permisions";

export function useEditFontSize(
  size: number | null,
  input: RefObject<HTMLInputElement>,
  setSizeText: (size: number) => void,
  inputSizeText: (size: number) => void) {

  function handleInput(event: Event) {
    const target = event.target as HTMLOptionElement;
    inputSizeText(Number(target.value));
  }

  function handleBlur(event: Event) {
    const target = event.target as HTMLOptionElement;
    setSizeText(Number(target.value));
  }
  
  function handleClick(event: Event) {
    event.stopImmediatePropagation();
  }

  useEffect(() => {
    verify(input.current).addEventListener("input", handleInput);
    verify(input.current).addEventListener("blur", handleBlur);
    verify(input.current).addEventListener("click", handleClick);
    return () => {
      if (input.current) {
        input.current.removeEventListener("input", handleInput);
        input.current.removeEventListener("blur", handleBlur);
        input.current.removeEventListener("click", handleClick);
      }
    };
  }, []);

  useEffect(() => {
    verify(input.current).value = size ? String(size) : "10";
  }, [size]);
}