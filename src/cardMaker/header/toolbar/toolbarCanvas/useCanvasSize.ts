import { CardMaker as CardMakerType } from '../../../../CardMakerTypes';
import { setCanvasSize } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';
import { MutableRefObject, useEffect } from 'react';
import { getCardMaker } from '../../../../CardMaker';

export function useCanvasSize(
  inputWidth: MutableRefObject<HTMLInputElement>,
  inputHeight: MutableRefObject<HTMLInputElement>) {

  const cardMaker: CardMakerType = getCardMaker();
  const width: number = cardMaker.canvas.width;
  const height: number = cardMaker.canvas.height;

  useEffect(() => {
    inputWidth.current.value = String(width);
    inputHeight.current.value = String(height);
  }, [width, height]);

  useEffect(() => {
    function handleInputSize() {
      let canvasDivElement: HTMLDivElement = document.getElementById('canvas') as HTMLDivElement;
      canvasDivElement.style.width = inputWidth.current.value + 'px';
      canvasDivElement.style.height = inputHeight.current.value + 'px';
    }
    function handleBlurSize() {
      const width: number = Number(inputWidth.current.value);
      const height: number = Number(inputHeight.current.value);
      dispatch(setCanvasSize, { width, height });
    }
    inputWidth.current.addEventListener("input", handleInputSize);
    inputWidth.current.addEventListener("blur", handleBlurSize);
    inputHeight.current.addEventListener("input", handleInputSize);
    inputHeight.current.addEventListener("blur", handleBlurSize);
    return () => {
      inputWidth.current.removeEventListener("input", handleInputSize);
      inputWidth.current.removeEventListener("blur", handleBlurSize);
      inputHeight.current.removeEventListener("input", handleInputSize);
      inputHeight.current.removeEventListener("blur", handleBlurSize);
    };
  }, []);

}