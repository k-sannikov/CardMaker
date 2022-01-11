import { RefObject, useEffect } from "react";
import { getImgInformationFromFile } from "../../../../utils/files";
import { verify } from "../../../../utils/permisions";
import { store } from "../../../../store/store";
import { Size } from "../../../../store/types";

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

    const input = inputFile.current;
    async function handlerChange(): Promise<void> {

      if (input) {
        const files = input.files;
        try {
          if (files) {
            const img = await getImgInformationFromFile(files[0]);
            if ((canvasSize.width < img.width) || (canvasSize.height < img.height)) {
              inputBackgroundImg(img.src, img.width, img.height)
              setModal(true);
            } else {
              setBackgroundImg(img.src, img.width, img.height);
            }
          }
        } catch {
          alert("Текст ошибки")
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