import { RefObject, useEffect } from "react";
import { getImgInformationFromFile } from '../../../../utils/files';


export function useCreateImg(
  inputFile: RefObject<HTMLElement>,
  createImgBlock: (src: string, width: number, height: number) => void) {

  async function handlerChangeInput(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const imgInfo = await getImgInformationFromFile(files[0]);
    createImgBlock(imgInfo.src, imgInfo.width, imgInfo.height);
    target.value = '';
  }

  useEffect(() => {
    if (inputFile.current) {
      inputFile.current.addEventListener("change", handlerChangeInput);
    }

    return () => {
      if (inputFile.current) {
        inputFile.current.removeEventListener("change", handlerChangeInput);
      }
    };

  });
}