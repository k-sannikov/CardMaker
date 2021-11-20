import { CardMaker as CardMakerType } from '../../../../CardMakerTypes';
import { setCanvasSize } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';
import { RefObject, useEffect } from 'react';
import { getCardMaker } from '../../../../CardMaker';

export function useCanvasSize(
  inputWidth: RefObject<HTMLInputElement>,
  inputHeight: RefObject<HTMLInputElement>): void {

  const cardMaker: CardMakerType = getCardMaker();
  const width: number = cardMaker.canvas.width;
  const height: number = cardMaker.canvas.height;

  function handleInputSize(): void {
    if (inputWidth.current && inputHeight.current) {
      let canvasDivElement: HTMLDivElement = document.getElementById('canvas') as HTMLDivElement;
      canvasDivElement.style.width = inputWidth.current.value + 'px';
      canvasDivElement.style.height = inputHeight.current.value + 'px';
    }
  }
  function handleBlurSize(): void {
    if (inputWidth.current && inputHeight.current) {
      const width: number = Number(inputWidth.current.value);
      const height: number = Number(inputHeight.current.value);
      dispatch(setCanvasSize, { width, height });
    }
  }

  useEffect(() => {
    if (inputWidth.current) {
      inputWidth.current.value = String(width);
    }
    if (inputHeight.current) {
      inputHeight.current.value = String(height);
    }
  }, [width, height]);

  useEffect(() => {
    if (inputWidth.current) {
      inputWidth.current.addEventListener("input", handleInputSize);
      inputWidth.current.addEventListener("blur", handleBlurSize);
    }
    if (inputHeight.current) {
      inputHeight.current.addEventListener("input", handleInputSize);
      inputHeight.current.addEventListener("blur", handleBlurSize);
    }
    return () => {
      if (inputWidth.current) {
        inputWidth.current.removeEventListener("input", handleInputSize);
        inputWidth.current.removeEventListener("blur", handleBlurSize);
      }
      if (inputHeight.current) {
        inputHeight.current.removeEventListener("input", handleInputSize);
        inputHeight.current.removeEventListener("blur", handleBlurSize);
      }
    };
  }, []);

}