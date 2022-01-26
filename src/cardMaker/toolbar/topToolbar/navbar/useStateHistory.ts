import { RefObject, useEffect } from "react";
import { verify } from "../../../../utils/permisions";

export function useStateHistory(
  buttonUndo: RefObject<HTMLButtonElement>,
  buttonRedo: RefObject<HTMLButtonElement>,
  undo: () => void,
  redo: () => void,
): void {


  useEffect(() => {

    const btnUndo: HTMLButtonElement | null = buttonUndo.current;
    const btnRedo: HTMLButtonElement | null = buttonRedo.current;

    function handlerClickUndo(): void {
      undo();
    }
  
    function handlerClickRedo(): void {
      redo();
    }
  
    function handlerKeydown(event: KeyboardEvent): void {
      if (event.code === "KeyZ" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        undo();
      }
      if (event.code === "KeyY" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        redo();
      }
    }
    
    
    verify(btnUndo).addEventListener("click", handlerClickUndo);
    verify(btnRedo).addEventListener("click", handlerClickRedo);
    document.addEventListener("keydown", handlerKeydown);
    return () => {
      if (btnUndo) btnUndo.removeEventListener("click", handlerClickUndo);
      if (btnRedo) btnRedo.removeEventListener("click", handlerClickRedo);
      document.removeEventListener("keydown", handlerKeydown);
    };
  }, [buttonUndo, buttonRedo, undo, redo]);
}