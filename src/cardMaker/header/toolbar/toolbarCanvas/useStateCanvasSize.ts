import { CardMaker as CardMakerType } from '../../../../CardMakerTypes';
import { RefObject, useContext, useEffect } from 'react';
import StoreContext from '../../../../StoreContext';
import { setCanvasSize, inputCanvasSize } from '../../../../store/actionCreators/canvasActionCreators';

export function useStateCanvasSize(
  inputWidth: RefObject<HTMLInputElement>,
  inputHeight: RefObject<HTMLInputElement>): void {

  const store = useContext(StoreContext);

  const cardMaker: CardMakerType = store.getState();
  const width: number = cardMaker.canvas.width;
  const height: number = cardMaker.canvas.height;

  function handleInputSize(): void {
    if (inputWidth.current && inputHeight.current) {
      const width: number = Number(inputWidth.current.value);
      const height: number = Number(inputHeight.current.value);
      store.dispatch(inputCanvasSize(width, height))
    }
  }
  
  function handleBlurSize(): void {
    if (inputWidth.current && inputHeight.current) {
      const width: number = Number(inputWidth.current.value);
      const height: number = Number(inputHeight.current.value);
      store.dispatch(setCanvasSize(width, height));
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