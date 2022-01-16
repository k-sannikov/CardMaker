import { RefObject, useEffect } from "react";
import { getImgInformationFromFile } from "../../../utils/files";
import { verify } from "../../../utils/permisions";
import { store } from "../../../store/store";
import { Size } from "../../../store/types";

export function useBackgroungImg(
  inputFile: RefObject<HTMLInputElement>,
  setBackgroundImg: (src: string, width: number, height: number) => void,
  inputBackgroundImg: (src: string, width: number, height: number) => void,
  setModal: (state: boolean) => void
) {

  useEffect(() => {

    const canvasSize: Size = {
      width: store.getState().canvas.width,
      height: store.getState().canvas.height,
    };

    const input: HTMLInputElement | null = inputFile.current;
    async function handlerChange(): Promise<void> {

      if (input) {
        const files: FileList | null = input.files;
        try {
          if (files) {
            const img: HTMLImageElement = await getImgInformationFromFile(files[0]);
            if ((canvasSize.width < img.width) || (canvasSize.height < img.height)) {
              inputBackgroundImg(img.src, img.width, img.height)
              setModal(true);
            } else {
              setBackgroundImg(img.src, img.width, img.height);
            }
          }
        } catch {
          alert("Ошибка при импорте изображения. Проверьте исходный файл и повторите попытку");
        }
        input.value = "";
      }

    }


    verify(input).addEventListener("change", handlerChange);
    return () => {
      if (input) input.removeEventListener("change", handlerChange);
    };
  }, [inputFile, setBackgroundImg, inputBackgroundImg, setModal]);
}