import { RefObject, useEffect } from "react";
import { getImgInformationFromFile } from '../../../../utils/files';
import { verify } from "../../../../utils/permisions";

export function useCreateImg(
  inputFile: RefObject<HTMLElement>,
  createImgBlock: (src: string, width: number, height: number) => void) {

  useEffect(() => {

    const fieldFile = inputFile.current;

    async function handlerChangeInput(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;

      try {
        const imgInfo = await getImgInformationFromFile(files[0]);
        createImgBlock(imgInfo.src, imgInfo.width, imgInfo.height);
      } catch {
        alert('Текст ошибки')
      }
      
      target.value = '';
    }


    verify(fieldFile).addEventListener("change", handlerChangeInput);
    return () => {
      if (fieldFile) fieldFile.removeEventListener("change", handlerChangeInput);
    };
  }, [inputFile, createImgBlock]);
}