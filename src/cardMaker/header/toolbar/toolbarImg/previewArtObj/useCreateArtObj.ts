import { RefObject, useEffect } from "react";
import { verify } from "../../../../../utils/permisions";

export function useCreateArtObj(
  artObj: RefObject<HTMLElement>,
  src: string,
  createArtObjBlock: (src: string) => void) {

  function handleClickArtObj() {
    createArtObjBlock(src);
  }

  useEffect(() => {
    verify(artObj.current).addEventListener("click", handleClickArtObj);
    return () => {
      if (artObj.current) {
        artObj.current.removeEventListener("click", handleClickArtObj);
      }
    };

  });
}