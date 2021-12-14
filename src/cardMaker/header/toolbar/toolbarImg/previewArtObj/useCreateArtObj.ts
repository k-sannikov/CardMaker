import { RefObject, useEffect } from "react";

export function useCreateArtObj(
  artObj: RefObject<HTMLElement>,
  src: string,
  createArtObjBlock: (src: string) => void) {

  function handleClickArtObj() {
    createArtObjBlock(src);
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