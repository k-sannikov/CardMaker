import { RefObject, useEffect } from "react"
import { verify } from "../../../utils/permisions";

export function useDeleteArea(
  buttonDelete: RefObject<HTMLButtonElement>,
  deleteAreaSelection: () => void,
  resetAreaSelection: () => void) {

    useEffect(() => {

      const button: HTMLButtonElement | null = buttonDelete.current;

      function handleClickButton() {
        deleteAreaSelection();
        resetAreaSelection();
      }
      function handleMousedownButton(event: MouseEvent) {
        event.preventDefault();
      }
  
  
      verify(button).addEventListener("click", handleClickButton);
      verify(button).addEventListener("mousedown", handleMousedownButton);
      return () => {
        if (button) button.removeEventListener("click", handleClickButton);
        if (button) button.removeEventListener("mousedown", handleMousedownButton);
      };
    }, [buttonDelete, deleteAreaSelection, resetAreaSelection]);
  }