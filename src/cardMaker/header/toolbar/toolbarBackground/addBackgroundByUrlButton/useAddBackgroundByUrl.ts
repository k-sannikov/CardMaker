import { RefObject, useEffect } from "react";
import { inputBackgroundImg, setBackgroundImg } from "../../../../../store/actionCreators/canvasActionCreators";
import { store } from "../../../../../store/store";

export function useAddBackgroundByUrl(
  image: RefObject<HTMLImageElement>,
  url: string,
  setModal: (value: boolean) => void,
) {

  useEffect(() => {

    const photo: HTMLImageElement | null = image.current;

    async function handlerClick() {

      try {
        const img = new Image();
        img.src = url;
        await img.decode();
        if ((store.getState().canvas.width < img.width) || (store.getState().canvas.height < img.height)) {
          store.dispatch(inputBackgroundImg(img.src, img.width, img.height));
          setModal(true)
        } else {
          store.dispatch(setBackgroundImg(img.src, img.width, img.height));
        }
      } catch {
        alert("Текст ошибки")
      }
    }

    if (photo) photo.addEventListener("click", handlerClick);
    return () => {
      if (photo) photo.removeEventListener("click", handlerClick)
    }
  }, [image, setModal, url]);
}