import { resetBackground, setBackgroundColor } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';
import { useEffect, RefObject, } from 'react';
import { CardMaker as CardMakerType, Background as BackgroundType } from '../../../../CardMakerTypes';
import { getCardMaker } from '../../../../CardMaker';

export function useStateBackgroungColor(
  inputColor: RefObject<HTMLInputElement>,
  buttonReset: RefObject<HTMLButtonElement>): void {
  const cardMaker: CardMakerType = getCardMaker();
  const background: BackgroundType = cardMaker.canvas.background;

  function handlerClickResetColor(): void {
    dispatch(resetBackground);
  }

  function handlerInputColor(event: Event): void {
    let canvasDivElement: HTMLDivElement = document.getElementById('canvas') as HTMLDivElement;
    const inputColor = event.target as HTMLInputElement;
    canvasDivElement.style.background = inputColor.value;
  }

  function handleerBlurColor(event: Event): void {
    const inputColor = event.target as HTMLInputElement;
    const color: string = inputColor.value;
    dispatch(setBackgroundColor, color);
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