import { RefObject, useEffect } from "react";
import { verify } from "../../../../../utils/permisions";

export function useEditColorText(
  color: string | null,
  colorPicker: RefObject<HTMLInputElement>,
  setColorText: (color: string) => void,
  inputColorText: (color: string) => void) {

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

  useEffect(() => {
    verify(colorPicker.current).addEventListener("input", handleInput);
    verify(colorPicker.current).addEventListener("change", handleChange);
    verify(colorPicker.current).addEventListener("click", handleClick);
    return () => {
      if (colorPicker.current) {
        colorPicker.current.removeEventListener("input", handleInput);
        colorPicker.current.removeEventListener("change", handleChange);
        colorPicker.current.removeEventListener("click", handleClick);
      }
    };
  }, []);

  useEffect(() => {
    verify(colorPicker.current).value = color ? color : '#000000';
  }, [color]);
}