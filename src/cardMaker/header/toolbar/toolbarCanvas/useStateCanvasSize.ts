import { RefObject, useEffect } from "react";
import { verify } from "../../../../utils/permisions";

export function useStateCanvasSize(
  inputWidth: RefObject<HTMLInputElement>,
  inputHeight: RefObject<HTMLInputElement>,
  inputCanvasSize: (width: number, height: number) => void,
  setCanvasSize: (width: number, height: number) => void,
  width: number,
  height: number
  ): void {

  useEffect(() => {
    const fieldWidth = inputWidth.current;
    const fieldHeight = inputHeight.current;

    verify(fieldWidth).value = String(width);
    verify(fieldHeight).value = String(height);

    function handleChangeSize(): void {
      if (fieldWidth && fieldHeight) {
        const width: number = Number(fieldWidth.value);
        const height: number = Number(fieldHeight.value);
        inputCanvasSize(width, height);
      }
    }

    function handleBlurSize(): void {
      if (fieldWidth && fieldHeight) {
        const width: number = Number(fieldWidth.value);
        const height: number = Number(fieldHeight.value);
        setCanvasSize(width, height);
      }
    }


    verify(fieldWidth).addEventListener("change", handleChangeSize);
    verify(fieldWidth).addEventListener("blur", handleBlurSize);
    verify(fieldHeight).addEventListener("change", handleChangeSize);
    verify(fieldHeight).addEventListener("blur", handleBlurSize);
    return () => {
      if (fieldWidth) {
        fieldWidth.removeEventListener("change", handleChangeSize);
        fieldWidth.removeEventListener("blur", handleBlurSize);
      }
      if (fieldHeight) {
        fieldHeight.removeEventListener("change", handleChangeSize);
        fieldHeight.removeEventListener("blur", handleBlurSize);
      }
    };
  }, [inputWidth, inputHeight, inputCanvasSize, setCanvasSize, width, height]);
}