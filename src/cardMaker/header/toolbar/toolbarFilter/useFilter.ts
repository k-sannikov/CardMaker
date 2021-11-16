import { setFilter } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';
import { CardMaker as CardMakerType, Filter as FilterType } from '../../../../CardMakerTypes';
import { MutableRefObject, useEffect } from 'react';
import { getCardMaker } from '../../../../CardMaker';

export function useFilter(
  inputColor: MutableRefObject<HTMLInputElement>,
  inputRange: MutableRefObject<HTMLInputElement>) {
  const cardMaker: CardMakerType = getCardMaker();
  const filter: FilterType = cardMaker.canvas.filter;

  useEffect(() => {
    inputColor.current.value = filter.color;
    inputRange.current.value = String(filter.opacity);
  }, [filter]);

  useEffect(() => {
    inputColor.current.addEventListener("input", handleInputFilter);
    inputRange.current.addEventListener("input", handleInputFilter);
    inputColor.current.addEventListener("blur", handleBlurFilter);
    inputRange.current.addEventListener("blur", handleBlurFilter);

    function handleInputFilter() {
      let filterDivElement: HTMLDivElement = document.getElementById('filter') as HTMLDivElement;
      const opacity: string = inputRange.current.value;
      const color: string = inputColor.current.value;
      filterDivElement.style.opacity = opacity;
      filterDivElement.style.background = color;
    }

    function handleBlurFilter() {
      const opacity: string = inputRange.current.value;
      const color: string = inputColor.current.value;
      dispatch(setFilter, { color, opacity });
    }

    return () => {
      inputColor.current.removeEventListener("input", handleInputFilter);
      inputRange.current.removeEventListener("input", handleInputFilter);
      inputColor.current.removeEventListener("blur", handleBlurFilter);
      inputRange.current.removeEventListener("blur", handleBlurFilter);
    };
  }, []);

}