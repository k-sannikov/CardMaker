import { useEffect, RefObject } from 'react';
import { Background as BackgroundType } from '../../../../store/types';
import { verify } from '../../../../utils/permisions';

export function useBackgroungColor(
  resetBackground: () => void,
  inputBackgroundColor: (color: string) => void,
  setBackgroundColor: (color: string) => void,
  background: BackgroundType,
  inputColor: RefObject<HTMLInputElement>,
  buttonReset: RefObject<HTMLButtonElement>): void {

  useEffect(() => {

    const input = inputColor.current;
    const button = buttonReset.current;

    function handlerClickResetColor(): void {
      resetBackground();
    }
  
    function handlerInputColor(event: Event): void {
      const inputColor = event.target as HTMLInputElement;
      inputBackgroundColor(inputColor.value);
    }
  
    function handleerChangeColor(event: Event): void {
      const inputColor = event.target as HTMLInputElement;
      const color: string = inputColor.value;
      setBackgroundColor(color);
    }


    verify(input).addEventListener("input", handlerInputColor);
    verify(input).addEventListener("change", handleerChangeColor);
    verify(button).addEventListener("click", handlerClickResetColor);
    return () => {
      if (input) {
        input.removeEventListener("input", handlerInputColor);
        input.removeEventListener("change", handleerChangeColor);
      }
      if (button) button.removeEventListener("click", handlerClickResetColor);

    };
  }, [resetBackground, inputBackgroundColor, setBackgroundColor, background, inputColor, buttonReset]);

  // изменение цвета input на белый при сбросе фона
  useEffect(() => {
    const input = inputColor.current;
    verify(input).value = background.color ? background.color : '#ffffff';
  }, [inputColor, background]);


}