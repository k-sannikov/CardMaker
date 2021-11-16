import { dispatch } from '../../../CardMaker';
import { applyFileProject } from '../../../CardMakerFunctions';
import { getCardMakerFromFile } from '../../../utils/utils';
import { MouseEvent, MutableRefObject, useEffect } from 'react';
import { getCardMaker } from '../../../CardMaker';

export function useFileProject(
  inputFile: MutableRefObject<HTMLInputElement>,
  downloadFile: MutableRefObject<any>
) {
  useEffect(() => {
    inputFile.current.addEventListener("change", handlerChangeInputFile);
    downloadFile.current.addEventListener("click", handlerClickSaveToJson);

    async function handlerChangeInputFile(event: any) {
      const file = event.target.files[0];
      dispatch(applyFileProject, await getCardMakerFromFile(file))
    }

    function handlerClickSaveToJson(event: MouseEvent<HTMLAnchorElement>) {
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
    return () => {
      inputFile.current.removeEventListener("change", handlerChangeInputFile);
      downloadFile.current.removeEventListener("click", handlerClickSaveToJson);
    };
  }, []);
}