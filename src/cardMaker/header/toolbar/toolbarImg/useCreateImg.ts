import { RefObject, useEffect } from "react";
import { dispatch } from '../../../../CardMaker';
import { createImgComponent } from '../../../../CardMakerFunctions';
import { getImgInformationFromFile } from './../../../../utils/utils';


export function useCreateImg(inputFile: RefObject<HTMLElement>) {

  async function handlerChangeInput(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const imgInfo = await getImgInformationFromFile(files[0]);
    dispatch(createImgComponent, {...imgInfo})
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