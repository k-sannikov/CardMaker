import { RefObject, useEffect } from "react";
import { verify } from "../../../../../utils/permisions";

export function useSelectFont(
  select: RefObject<HTMLSelectElement>,
  setFontFamilyText: (fontFamily: string) => void) {

  useEffect(() => {

    const selectFontFamily = select.current;
    
    function handleClick(event: Event) {
      event.stopImmediatePropagation();
    }

    function handleChange(event: Event) {
      const target = event.target as HTMLOptionElement;
      setFontFamilyText(target.value);
    }

    
    verify(selectFontFamily).addEventListener("click", handleClick);
    verify(selectFontFamily).addEventListener("change", handleChange);
    return () => {
      if (selectFontFamily) {
        selectFontFamily.removeEventListener("click", handleClick);
        selectFontFamily.removeEventListener("change", handleChange);
      }
    };
  }, [select, setFontFamilyText]);
}