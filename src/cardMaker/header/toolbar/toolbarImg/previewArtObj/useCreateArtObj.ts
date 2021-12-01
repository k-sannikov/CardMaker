import { RefObject, useContext, useEffect } from "react";
import StoreContext from '../../../../../StoreContext';
import { createArtObjBlock } from '../../../../../store/actionCreators/actionCreators';

export function useCreateArtObj(artObj: RefObject<HTMLElement>, src: string) {
  const store = useContext(StoreContext);

  function handleClickArtObj() {
    store.dispatch(createArtObjBlock(src));
  }

  useEffect(() => {
    if (artObj.current) {
      artObj.current.addEventListener("click", handleClickArtObj);
    }

    return () => {
      if (artObj.current) {
        artObj.current.removeEventListener("click", handleClickArtObj);
      }
    };

  });
}