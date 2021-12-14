import { Filter as FilterType } from '../../../../store/types';
import { RefObject, useEffect } from 'react';

export function useStateFilter(
  inputColor: RefObject<HTMLInputElement>,
  inputRange: RefObject<HTMLInputElement>,
  inputFilter: (color: string, opacity: number) => void,
  setFilter: (color: string, opacity: number) => void,
  filter: FilterType,) : void{

  function handleInputFilter(): void {
    if (inputRange.current && inputColor.current) {
      const color: string = inputColor.current.value;
      const opacity: number = Number(inputRange.current.value);
      inputFilter(color, opacity);
    }
  }

  function handleBlurFilter(): void {
    if (inputRange.current && inputColor.current) {
      const opacity: number = Number(inputRange.current.value);
      const color: string = inputColor.current.value;
      setFilter(color, opacity);
    }
  }

  useEffect(() => {
    if (inputColor.current) {
      inputColor.current.value = filter.color;
    }
    if (inputRange.current) {
      inputRange.current.value = String(filter.opacity);
    }
  }, [filter]);

  useEffect(() => {
    if (inputColor.current) {
      inputColor.current.addEventListener("input", handleInputFilter);
      inputColor.current.addEventListener("blur", handleBlurFilter);
    }
    if (inputRange.current) {
      inputRange.current.addEventListener("input", handleInputFilter);
      inputRange.current.addEventListener("blur", handleBlurFilter);
    }

    return () => {
      if (inputColor.current) {
        inputColor.current.removeEventListener("input", handleInputFilter);
        inputColor.current.removeEventListener("blur", handleBlurFilter);
      }
      if (inputRange.current) {
        inputRange.current.removeEventListener("input", handleInputFilter);
        inputRange.current.removeEventListener("blur", handleBlurFilter);
      }
    };
  }, []);

}