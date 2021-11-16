import { resetBackground, setBackgroundColor } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';
import { useEffect, ChangeEvent, FocusEvent, MutableRefObject } from 'react';
import { CardMaker as CardMakerType, Background as BackgroundType } from '../../../../CardMakerTypes';
import { getCardMaker } from '../../../../CardMaker';

export function useBackgroungColor(
  inputColor: MutableRefObject<any>,
  buttonReset: MutableRefObject<HTMLButtonElement>) {
  const cardMaker: CardMakerType = getCardMaker();
  const background: BackgroundType = cardMaker.canvas.background;


  useEffect(() => {
    inputColor.current.addEventListener("input", handlerInputColor);
    inputColor.current.addEventListener("blur", handleerBlurColor);
    buttonReset.current.addEventListener("click", handlerClickResetColor);

    function handlerClickResetColor() {
      dispatch(resetBackground);
    }

    function handlerInputColor(event: ChangeEvent<HTMLInputElement>) {
      let canvasDivElement: HTMLDivElement = document.getElementById('canvas') as HTMLDivElement;
      canvasDivElement.style.background = event.target.value;
    }

    function handleerBlurColor(event: FocusEvent<HTMLInputElement>) {
      const color: string = event.target.value;
      dispatch(setBackgroundColor, color);
    }

    return () => {
      inputColor.current.removeEventListener("input", handlerInputColor);
      inputColor.current.removeEventListener("blur", handleerBlurColor);
      buttonReset.current.removeEventListener("click", handlerClickResetColor);
    };
  }, []);

  useEffect(() => {
    inputColor.current.value = background.color ? background.color : '#ffffff';
  }, [background]);


}