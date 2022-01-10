import { RefObject, useEffect } from "react";
import { verify } from "../../../../../utils/permisions";

export function useEditFontSize(
  size: number | null,
  input: RefObject<HTMLInputElement>,
  setSizeText: (size: number) => void,
  inputSizeText: (size: number) => void) {

  useEffect(() => {

    const fieldSize = input.current;

    verify(fieldSize).value = size ? String(size) : "10";

    function handleInput(event: Event) {
      const target = event.target as HTMLOptionElement;
      inputSizeText(Number(target.value));
    }
  
    function handleBlur(event: Event) {
      const target = event.target as HTMLOptionElement;
      setSizeText(Number(target.value));
    }
    
    function handleClick(event: Event) {
      event.preventDefault();
    }


    verify(fieldSize).addEventListener("input", handleInput);
    verify(fieldSize).addEventListener("blur", handleBlur);
    verify(fieldSize).addEventListener("click", handleClick);
    return () => {
      if (fieldSize) {
        fieldSize.removeEventListener("input", handleInput);
        fieldSize.removeEventListener("blur", handleBlur);
        fieldSize.removeEventListener("click", handleClick);
      }
    };
  }, [size, input, setSizeText, inputSizeText]);
}