import { RefObject, useEffect } from 'react';

export function useStateCanvasSize(
  inputWidth: RefObject<HTMLInputElement>,
  inputHeight: RefObject<HTMLInputElement>,
  inputCanvasSize: (width: number, height: number) => void,
  setCanvasSize: (width: number, height: number) => void,
  width: number,
  height: number): void {

  function handleInputSize(): void {
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