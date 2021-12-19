import { RefObject, useEffect } from 'react';
import { verify } from '../../../../utils/permisions';

export function useStateCanvasSize(
  inputWidth: RefObject<HTMLInputElement>,
  inputHeight: RefObject<HTMLInputElement>,
  inputCanvasSize: (width: number, height: number) => void,
  setCanvasSize: (width: number, height: number) => void,
  width: number,
  height: number): void {

  function handleChangeSize(): void {
    if (inputWidth.current && inputHeight.current) {
      const width: number = Number(inputWidth.current.value);
      const height: number = Number(inputHeight.current.value);
      inputCanvasSize(width, height);
    }
  }

  function handleBlurSize(): void {
    if (inputWidth.current && inputHeight.current) {
      const width: number = Number(inputWidth.current.value);
      const height: number = Number(inputHeight.current.value);
      setCanvasSize(width, height);
    }
  }

  useEffect(() => {
    verify(inputWidth.current).value = String(width);
    verify(inputHeight.current).value = String(height);
  }, [width, height]);

  useEffect(() => {
    verify(inputWidth.current).addEventListener("change", handleChangeSize);
    verify(inputWidth.current).addEventListener("blur", handleBlurSize);
    verify(inputHeight.current).addEventListener("change", handleChangeSize);
    verify(inputHeight.current).addEventListener("blur", handleBlurSize);
    return () => {
      if (inputWidth.current) {
        inputWidth.current.removeEventListener("change", handleChangeSize);
        inputWidth.current.removeEventListener("blur", handleBlurSize);
      }
      if (inputHeight.current) {
        inputHeight.current.removeEventListener("change", handleChangeSize);
        inputHeight.current.removeEventListener("blur", handleBlurSize);
      }
    };
  }, []);

}