import { dispatch } from '../../../CardMaker';
import { applyFileProject } from '../../../CardMakerFunctions';
import { getCardMakerFromFile } from '../../../utils/utils';
import { RefObject, useEffect } from 'react';
import { getCardMaker } from '../../../CardMaker';

export function useFileProject(
  inputFile: RefObject<HTMLInputElement>,
  downloadFile: RefObject<HTMLAnchorElement>
): void {

  async function handlerChangeInputFile(event: any): Promise<void> {
    const file = event.target.files[0];
    dispatch(applyFileProject, await getCardMakerFromFile(file))
  }

  function handlerClickSaveToJson(event: Event): void {
    let link = event.target as HTMLAnchorElement;
    const cardMaker = getCardMaker();
    const json = JSON.stringify(
      {
        ...cardMaker,
        history: {
          currentIndex: 0,
          listState: [cardMaker.canvas]
        }
      }
    );
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