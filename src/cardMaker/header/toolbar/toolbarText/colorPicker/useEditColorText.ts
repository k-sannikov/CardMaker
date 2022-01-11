import { RefObject, useEffect } from "react";
import { verify } from "../../../../../utils/permisions";

export function useEditColorText(
  color: string | null,
  colorPicker: RefObject<HTMLInputElement>,
  setColorText: (color: string) => void,
  inputColorText: (color: string) => void) {

  useEffect(() => {

    const inputColor = colorPicker.current;

    verify(inputColor).value = color ? color : "#000000";

    function handleInput(event: Event) {
      const target = event.target as HTMLOptionElement;
      inputColorText(target.value);
    }
  
    function handleChange(event: Event) {
      const target = event.target as HTMLOptionElement;
      setColorText(target.value);
    }
    
    function handleClick(event: Event) {
      event.stopImmediatePropagation();
    }


    verify(inputColor).addEventListener("input", handleInput);
    verify(inputColor).addEventListener("change", handleChange);
    verify(inputColor).addEventListener("click", handleClick);
    return () => {
      if (inputColor) {
        inputColor.removeEventListener("input", handleInput);
        inputColor.removeEventListener("change", handleChange);
        inputColor.removeEventListener("click", handleClick);
      }
    };
  }, [color, colorPicker, setColorText, inputColorText]);
}