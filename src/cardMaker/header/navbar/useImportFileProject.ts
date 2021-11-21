import { dispatch } from '../../../CardMaker';
import { applyFileProject } from '../../../CardMakerFunctions';
import { getCanvasFromFile } from '../../../utils/utils';
import { FormEvent, RefObject, useEffect } from 'react';
import { getCardMaker } from '../../../CardMaker';

export function useImportFileProject(
  inputFile: RefObject<HTMLInputElement>,
  downloadFile: RefObject<HTMLAnchorElement>
): void {

  async function handlerChangeInputFile(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    dispatch(applyFileProject, await getCanvasFromFile(files[0]))
  }

  function handlerClickSaveToJson(event: Event): void {
    let link = event.target as HTMLAnchorElement;
    const cardMaker = getCardMaker();
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