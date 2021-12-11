import { getCanvasFromFile } from '../../../utils/utils';
import { RefObject, useContext, useEffect } from 'react';

import StoreContext from '../../../StoreContext';
import { applyFileProject } from '../../../store/actionCreators/cardMakerActionCreators';

export function useImportFileProject(
  inputFile: RefObject<HTMLInputElement>,
  downloadFile: RefObject<HTMLAnchorElement>
): void {

  const store = useContext(StoreContext);

  async function handlerChangeInputFile(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(files);
    store.dispatch(applyFileProject(await getCanvasFromFile(files[0])))
    target.value = '';
  }

  function handlerClickSaveToJson(event: Event): void {
    let link = event.target as HTMLAnchorElement;
    const cardMaker = store.getState();
    const json = JSON.stringify(cardMaker.canvas);
    const file = new Blob([json], { type: 'application/json' });
    link.href = URL.createObjectURL(file);
    link.download = "Новый проект.json";
  }

  useEffect(() => {
    if (inputFile.current) {
      inputFile.current.addEventListener("change", handlerChangeInputFile);
    }
    if (downloadFile.current) {
      downloadFile.current.addEventListener("click", handlerClickSaveToJson);
    }

    return () => {
      if (inputFile.current) {
        inputFile.current.removeEventListener("change", handlerChangeInputFile);
      }
      if (downloadFile.current) {
        downloadFile.current.removeEventListener("click", handlerClickSaveToJson);
      }
    };
  }, []);
}