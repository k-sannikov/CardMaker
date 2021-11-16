import { useEffect } from "react";
import { dispatch } from '../../CardMaker';
import { resetSelectedComponent,  } from '../../CardMakerFunctions';

export function useCanvas() {
  useEffect(() => {
    document.addEventListener("click", handleClickDocument);
    function handleClickDocument() {
      dispatch(resetSelectedComponent);
    }
    return () => {
      document.removeEventListener("click", handleClickDocument);
    };
  }, []);
}



