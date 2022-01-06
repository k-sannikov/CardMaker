import { RefObject, useEffect } from "react";
import { getImgInformationFromFile } from '../../../../utils/files';
import { verify } from "../../../../utils/permisions";
import { store } from "../../../../store/store";
import { Size } from "../../../../store/types";

export function useBackgroungImg(
  inputFile: RefObject<HTMLElement>,
  setBackgroundImg: (src: string, width: number, height: number) => void,
  inputBackgroundImg: (src: string, width: number, height: number) => void,
  setModal: (state: boolean) => void
) {

  useEffect(() => {

    const canvasSize: Size = {
      width: store.getState().canvas.width,
      height: store.getState().canvas.height,
    };

    const fieldFile = inputFile.current;
    async function handlerChange(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;

      try {
        const imgInfo = await getImgInformationFromFile(files[0]);
        if ((canvasSize.width < imgInfo.width) || (canvasSize.height < imgInfo.height)) {
          inputBackgroundImg(imgInfo.src, imgInfo.width, imgInfo.height)
          setModal(true);
        } else {
          setBackgroundImg(imgInfo.src, imgInfo.width, imgInfo.height);
        }
      } catch {
        alert('Текст ошибки')
      }
      
      target.value = '';
    }


    verify(fieldFile).addEventListener("change", handlerChange);
    return () => {
      if (fieldFile) fieldFile.removeEventListener("change", handlerChange);
    };
  }, [inputFile, setBackgroundImg, inputBackgroundImg, setModal]);
}