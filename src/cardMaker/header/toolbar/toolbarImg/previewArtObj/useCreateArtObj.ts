import { RefObject, useEffect } from "react";
import { dispatch } from '../../../../../CardMaker';
import { createArtObjComponent } from '../../../../../CardMakerFunctions';


export function useCreateArtObj(artObj: RefObject<HTMLElement>, src: string) {

  function handleClickArtObj() {
    dispatch(createArtObjComponent, src);
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