import { useContext, useEffect } from "react";
import StoreContext from '../../StoreContext';
import { resetSelectedBlock } from '../../store/actionCreators/blockActionCreators';

export function useRemoveSelectedBlock (): void {
  const store = useContext(StoreContext);
  function handleMousedownDocument(event: Event): void {
    if (!event.defaultPrevented) {
      store.dispatch(resetSelectedBlock());
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleMousedownDocument);
    return () => {
      document.removeEventListener("mousedown", handleMousedownDocument);
    };
  }, []);
}