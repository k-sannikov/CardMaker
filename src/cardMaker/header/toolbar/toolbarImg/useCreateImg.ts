import { RefObject, useContext, useEffect } from "react";
import { getImgInformationFromFile } from './../../../../utils/utils';

import StoreContext from '../../../../StoreContext';
import { createImgBlock } from '../../../../store/actionCreators/imgBlockActionCreators';


export function useCreateImg(inputFile: RefObject<HTMLElement>) {
  const store = useContext(StoreContext);

  async function handlerChangeInput(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const imgInfo = await getImgInformationFromFile(files[0]);
    store.dispatch(createImgBlock(imgInfo.src, imgInfo.width, imgInfo.height))
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