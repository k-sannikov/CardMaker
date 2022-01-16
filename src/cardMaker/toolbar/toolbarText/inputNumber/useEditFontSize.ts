import { RefObject, useEffect } from "react";
import { verify } from "../../../../utils/permisions";

export function useEditFontSize(
  size: number | null,
  input: RefObject<HTMLInputElement>,
  setSizeText: (size: number) => void,
  inputSizeText: (size: number) => void) {

  useEffect(() => {

    const defSize: number = 10;

    const fieldSize: HTMLInputElement | null = input.current;

    verify(fieldSize).value = size ? String(size) : `${defSize}`;

    function handleInput(event: Event) {
      const target = event.target as HTMLOptionElement;
      if (Number(target.value) > defSize) {
        inputSizeText(Number(target.value));
      } else {
        inputSizeText(defSize);
      }
    }

    function handleBlur(event: Event) {
      const target = event.target as HTMLOptionElement;
      if (Number(target.value) > defSize) {
        setSizeText(Number(target.value));
      } else {
        setSizeText(defSize);
      }
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