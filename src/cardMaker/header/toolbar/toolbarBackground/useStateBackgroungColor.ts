import { useEffect, RefObject } from 'react';
import { Background as BackgroundType } from '../../../../store/types';

export function useStateBackgroungColor(
  resetBackground: () => void,
  inputBackgroundColor: (color: string) => void,
  setBackgroundColor: (color: string) => void,
  background: BackgroundType,
  inputColor: RefObject<HTMLInputElement>,
  buttonReset: RefObject<HTMLButtonElement>): void {

  function handlerClickResetColor(): void {
    resetBackground();
  }

  function handlerInputColor(event: Event): void {
    const inputColor = event.target as HTMLInputElement;
    inputBackgroundColor(inputColor.value);
  }

  function handleerBlurColor(event: Event): void {
    const inputColor = event.target as HTMLInputElement;
    const color: string = inputColor.value;
    setBackgroundColor(color);
  }

  useEffect(() => {
    if (inputColor.current) {
      inputColor.current.addEventListener("input", handlerInputColor);
      inputColor.current.addEventListener("blur", handleerBlurColor);
    }
    if (buttonReset.current) {
      buttonReset.current.addEventListener("click", handlerClickResetColor);
    }
    return () => {
      if (inputColor.current) {
        inputColor.current.removeEventListener("input", handlerInputColor);
        inputColor.current.removeEventListener("blur", handleerBlurColor);
      }
      if (buttonReset.current) {
        buttonReset.current.removeEventListener("click", handlerClickResetColor);
      }

    };
  }, []);

  // изменение цвета input на белый при сбросе фона
  useEffect(() => {
    if (inputColor.current) {
      inputColor.current.value = background.color ? background.color : '#ffffff';
    }
  }, [background]);


}