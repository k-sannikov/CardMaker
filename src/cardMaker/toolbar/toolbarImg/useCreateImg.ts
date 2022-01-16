import { RefObject, useEffect } from "react";
import { getImgInformationFromFile } from "../../../utils/files";
import { verify } from "../../../utils/permisions";

export function useCreateImg(
  inputFile: RefObject<HTMLInputElement>,
  createImgBlock: (src: string, width: number, height: number) => void) {

  useEffect(() => {

    const input = inputFile.current;

    async function handlerChangeInput(): Promise<void> {

      if (input) {
        const files: FileList | null = input.files;
        try {
          if (files) {
            const img: HTMLImageElement = await getImgInformationFromFile(files[0]);
            createImgBlock(img.src, img.width, img.height);
          }
        } catch {
          alert("Ошибка при импорте изображения. Проверьте исходный файл и повторите попытку");
        }
        input.value = "";
      }
    }


    verify(input).addEventListener("change", handlerChangeInput);
    return () => {
      if (input) input.removeEventListener("change", handlerChangeInput);
    };
  }, [inputFile, createImgBlock]);
}