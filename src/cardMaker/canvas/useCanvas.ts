import { useEffect } from "react";
import { dispatch } from '../../CardMaker';
import { resetSelectedComponent, } from '../../CardMakerFunctions';

export function useCanvas(): void {
  function handleClickDocument(event: Event): void {
    if (!event.defaultPrevented) {
      dispatch(resetSelectedComponent);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickDocument);
    return () => {
      document.removeEventListener("click", handleClickDocument);
    };
  }, []);
}



