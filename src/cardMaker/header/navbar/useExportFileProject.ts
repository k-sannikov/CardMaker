import { RefObject, useEffect } from 'react';
import { store } from '../../../store/store';
import { verify } from '../../../utils/permisions';

export function useExportFileProject(
  downloadFile: RefObject<HTMLAnchorElement>,
): void {

  function handlerClickSaveToJson(event: Event): void {
    let link = event.target as HTMLAnchorElement;
    const cardMaker = store.getState();
    const json = JSON.stringify({
      ...cardMaker,
      history: {
        listState: [cardMaker.canvas],
        currentIndex: 0,
      }
    });
    const file = new Blob([json], { type: 'application/json' });
    link.href = URL.createObjectURL(file);
    link.download = "Новый проект.json";
  }

  useEffect(() => {
    verify(downloadFile.current).addEventListener("click", handlerClickSaveToJson);
    return () => {
      if (downloadFile.current) {
        downloadFile.current.removeEventListener("click", handlerClickSaveToJson);
      }
    };
  }, []);
}