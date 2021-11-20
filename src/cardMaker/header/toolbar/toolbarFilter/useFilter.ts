import { setFilter } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';
import { CardMaker as CardMakerType, Filter as FilterType } from '../../../../CardMakerTypes';
import { RefObject, useEffect } from 'react';
import { getCardMaker } from '../../../../CardMaker';

export function useFilter(
  inputColor: RefObject<HTMLInputElement>,
  inputRange: RefObject<HTMLInputElement>) : void{
  const cardMaker: CardMakerType = getCardMaker();
  const filter: FilterType = cardMaker.canvas.filter;

  function handleInputFilter(): void {
    if (inputRange.current && inputColor.current) {
      let filterDivElement: HTMLDivElement = document.getElementById('filter') as HTMLDivElement;
      const opacity: string = inputRange.current.value;
      const color: string = inputColor.current.value;
      filterDivElement.style.opacity = opacity;
      filterDivElement.style.background = color;
    }

  }

  function handleBlurFilter(): void {
    if (inputRange.current && inputColor.current) {
      const opacity: string = inputRange.current.value;
      const color: string = inputColor.current.value;
      dispatch(setFilter, { color, opacity });
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