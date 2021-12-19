import { RefObject, useEffect } from "react";
import { verify } from "../../../../../utils/permisions";

export function useSelectFont(select: RefObject<HTMLSelectElement>, setFontFamilyText: (fontFamily: string) => void) {

  function handleClick(event: Event) {
    event.stopImmediatePropagation();
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLOptionElement;
    setFontFamilyText(target.value);
  }

  useEffect(() => {

    verify(select.current).addEventListener("click", handleClick);
    verify(select.current).addEventListener("change", handleChange);

    return () => {
      if (select.current) {
        select.current.removeEventListener("click", handleClick);
        select.current.removeEventListener("change", handleChange);
      }
    };
  }, []);
}