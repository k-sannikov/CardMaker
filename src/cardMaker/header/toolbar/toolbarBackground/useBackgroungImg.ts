import { RefObject, useEffect } from "react";
import { getImgInformationFromFile } from '../../../../utils/files';
import { verify } from "../../../../utils/permisions";
import { store } from "../../../../store/store";
import { Size } from "../../../../store/types";

export function useBackgroungImg(
  inputFile: RefObject<HTMLElement>,
  setBackgroundImg: (src: string) => void,
  inputBackgroundImg: (width: number, height: number, src: string) => void,
  setModal: (state: boolean) => void
) {

  const canvasSize: Size = {
    width: store.getState().canvas.width,
    height: store.getState().canvas.height,
  };

  useEffect(() => {
    const fieldFile = inputFile.current;
    async function handlerChange(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      const imgInfo = await getImgInformationFromFile(files[0]);

      if ((canvasSize.width < imgInfo.width) || (canvasSize.height < imgInfo.height)) {
        inputBackgroundImg(imgInfo.width, imgInfo.height, imgInfo.src)
        setModal(true);
      } else {
        setBackgroundImg(imgInfo.src);
      }

      target.value = '';
    }


    verify(fieldFile).addEventListener("change", handlerChange);
    return () => {
      if (fieldFile) fieldFile.removeEventListener("change", handlerChange);
    };
  }, [inputFile, canvasSize, setModal]);
}