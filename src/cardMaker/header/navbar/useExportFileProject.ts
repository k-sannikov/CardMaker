import { RefObject, useEffect } from 'react';
import { store } from '../../../store/store';
import { verify } from '../../../utils/permisions';

export function useExportFileProject( downloadLink: RefObject<HTMLAnchorElement>): void {

  useEffect(() => {

    const link = downloadLink.current;

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

    
    verify(link).addEventListener("click", handlerClickSaveToJson);
    return () => {
      if (link) link.removeEventListener("click", handlerClickSaveToJson);
    };
  }, [downloadLink]);
}