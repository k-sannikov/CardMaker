import { useEffect } from "react";

export function useRemoveSelectedBlock(resetSelectedBlock: () => void): void {
  function handleMousedownDocument(event: Event): void {
    if (!event.defaultPrevented) {
      resetSelectedBlock();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleMousedownDocument);
    return () => {
      document.removeEventListener("mousedown", handleMousedownDocument);
    };
  }, []);
}