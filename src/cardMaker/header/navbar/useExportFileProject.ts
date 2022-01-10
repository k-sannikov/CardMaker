import { RefObject, useEffect } from 'react';
import { store } from '../../../store/store';
import { verify } from '../../../utils/permisions';

export function useExportFileProject(downloadButton: RefObject<HTMLButtonElement>): void {

  useEffect(() => {

    const button = downloadButton.current;

    function handlerClickSaveToJson(event: Event): void {
      const cardMaker = store.getState();
      const json = JSON.stringify({
        ...cardMaker,
        history: {
          listState: [cardMaker.canvas],
          currentIndex: 0,
        }
      });
      const file = new Blob([json], { type: 'application/json' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = "Новый проект.json";
      link.click();
    }

    
    verify(button).addEventListener("click", handlerClickSaveToJson);
    return () => {
      if (button) button.removeEventListener("click", handlerClickSaveToJson);
    };
  }, [downloadButton]);
}