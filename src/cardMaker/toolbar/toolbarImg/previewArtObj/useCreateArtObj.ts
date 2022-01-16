import { RefObject, useEffect } from "react";
import { verify } from "../../../../utils/permisions";

export function useCreateArtObj(
  artObj: RefObject<HTMLElement>,
  src: string,
  createArtObjBlock: (src: string) => void) {

  useEffect(() => {

    const artObjPreview: HTMLElement | null = artObj.current;

    function handleClickArtObj() {
      createArtObjBlock(src);
    }


    verify(artObjPreview).addEventListener("click", handleClickArtObj);
    return () => {
      if (artObjPreview) artObjPreview.removeEventListener("click", handleClickArtObj);
    };
  }, [artObj, src, createArtObjBlock]);
}