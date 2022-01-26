import { RefObject, useEffect } from "react";
import { store } from "../../../../store/store";
import { CardMaker } from "../../../../store/types";
import { verify } from "../../../../utils/permisions";

export function useExportFileProject(downloadButton: RefObject<HTMLButtonElement>): void {

  useEffect(() => {

    const button: HTMLButtonElement | null = downloadButton.current;

    function handlerClickSaveToJson(): void {
      const cardMaker: CardMaker = store.getState();
      const json: string = JSON.stringify({
        ...cardMaker,
        selectBlock: null,
        history: {
          listState: [cardMaker.canvas],
          currentIndex: 0,
        }
      });
      const file: Blob = new Blob([json], { type: "application/json" });
      const link: HTMLAnchorElement = document.createElement("a");
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