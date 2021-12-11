import { useEffect, RefObject, useContext, } from 'react';
import { CardMaker as CardMakerType, Background as BackgroundType } from '../../../../store/types';
import StoreContext from '../../../../StoreContext';
import {
  resetBackground,
  setBackgroundColor,
  inputBackgroundColor,
} from '../../../../store/actionCreators/canvasActionCreators';

export function useStateBackgroungColor(
  inputColor: RefObject<HTMLInputElement>,
  buttonReset: RefObject<HTMLButtonElement>): void {
  const store = useContext(StoreContext);
  const cardMaker: CardMakerType = store.getState();
  const background: BackgroundType = cardMaker.canvas.background;

  function handlerClickResetColor(): void {
    store.dispatch(resetBackground());
  }

  function handlerInputColor(event: Event): void {
    const inputColor = event.target as HTMLInputElement;
    store.dispatch(inputBackgroundColor(inputColor.value))
  }

  function handleerBlurColor(event: Event): void {
    const inputColor = event.target as HTMLInputElement;
    const color: string = inputColor.value;
    store.dispatch(setBackgroundColor(color));
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