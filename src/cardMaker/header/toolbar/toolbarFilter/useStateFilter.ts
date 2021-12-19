import { Filter as FilterType } from '../../../../store/types';
import { RefObject, useEffect } from 'react';
import { verify } from '../../../../utils/permisions';

export function useStateFilter(
  inputColor: RefObject<HTMLInputElement>,
  inputRange: RefObject<HTMLInputElement>,
  inputFilter: (color: string, opacity: number) => void,
  setFilter: (color: string, opacity: number) => void,
  filter: FilterType,): void {

  function handleInputFilter(): void {
    if (inputRange.current && inputColor.current) {
      const color: string = inputColor.current.value;
      const opacity: number = Number(inputRange.current.value);
      inputFilter(color, opacity);
    }
  }

  function handleChangeFilter(): void {
    if (inputRange.current && inputColor.current) {
      const opacity: number = Number(inputRange.current.value);
      const color: string = inputColor.current.value;
      setFilter(color, opacity);
    }
  }

  useEffect(() => {
    verify(inputColor.current).value = filter.color;
    verify(inputRange.current).value = String(filter.opacity);
  }, [filter]);

  useEffect(() => {
    verify(inputColor.current).addEventListener("input", handleInputFilter);
    verify(inputColor.current).addEventListener("change", handleChangeFilter);
    verify(inputRange.current).addEventListener("input", handleInputFilter);
    verify(inputRange.current).addEventListener("change", handleChangeFilter);
    return () => {
      if (inputColor.current) {
        inputColor.current.removeEventListener("input", handleInputFilter);
        inputColor.current.removeEventListener("change", handleChangeFilter);
      }
      if (inputRange.current) {
        inputRange.current.removeEventListener("input", handleInputFilter);
        inputRange.current.removeEventListener("change", handleChangeFilter);
      }
    };
  }, []);
}