import { Filter } from "../../../store/types";
import { RefObject, useEffect } from "react";
import { verify } from "../../../utils/permisions";

export function useStateFilter(
  inputColor: RefObject<HTMLInputElement>,
  inputRange: RefObject<HTMLInputElement>,
  inputFilter: (color: string, opacity: number) => void,
  setFilter: (color: string, opacity: number) => void,
  filter: Filter): void {

  useEffect(() => {

    const fieldColor: HTMLInputElement | null = inputColor.current;
    const fieldRange: HTMLInputElement | null = inputRange.current;

    verify(fieldColor).value = filter.color;
    verify(fieldRange).value = String(filter.opacity);

    function handleInputFilter(): void {
      if (fieldRange && fieldColor) {
        const color: string = fieldColor.value;
        const opacity: number = Number(fieldRange.value);
        inputFilter(color, opacity);
      }
    }

    function handleChangeFilter(): void {
      if (fieldRange && fieldColor) {
        const opacity: number = Number(fieldRange.value);
        const color: string = fieldColor.value;
        setFilter(color, opacity);
      }
    }

    verify(fieldColor).addEventListener("input", handleInputFilter);
    verify(fieldColor).addEventListener("change", handleChangeFilter);
    verify(fieldRange).addEventListener("input", handleInputFilter);
    verify(fieldRange).addEventListener("change", handleChangeFilter);
    return () => {
      if (fieldColor) {
        fieldColor.removeEventListener("input", handleInputFilter);
        fieldColor.removeEventListener("change", handleChangeFilter);
      }
      if (fieldRange) {
        fieldRange.removeEventListener("input", handleInputFilter);
        fieldRange.removeEventListener("change", handleChangeFilter);
      }
    };
  }, [inputColor, inputRange, inputFilter, setFilter, filter]);
}