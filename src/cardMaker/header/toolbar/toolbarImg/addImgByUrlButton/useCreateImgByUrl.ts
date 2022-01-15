import { RefObject, useEffect } from "react";
import { createImgBlock } from "../../../../../store/actionCreators/imgBlockActionCreators";
import { store } from "../../../../../store/store";

export function useCreateImgByUrl(
  img: RefObject<HTMLImageElement>,
  url: string,
  setModal: (value: boolean) => void,
) {
  useEffect(() => {
    const image: HTMLImageElement | null = img.current;
    async function handlerClick() {
      const newImage = new Image();
      newImage.src = url;
      await newImage.decode();
      store.dispatch(createImgBlock(newImage.src, newImage.width, newImage.height));
      setModal(false);
    }

    if (image) image.addEventListener("click", handlerClick);
    return () => {
      if (image) image.removeEventListener("click", handlerClick)
    }
  }, [img, url, setModal]);
}