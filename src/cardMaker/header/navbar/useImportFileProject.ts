import { getProjectFromFile } from "../../../utils/files";
import { RefObject, useEffect } from "react";
import { CardMaker } from "../../../store/types";
import { verify } from "../../../utils/permisions";

export function useImportFileProject(
  inputFile: RefObject<HTMLInputElement>,
  applyFileProject: (file: CardMaker) => void): void {

  useEffect(() => {

    const input: HTMLInputElement | null = inputFile.current;

    async function handlerChangeInputFile(): Promise<void> {

      if (input) {
        const files: FileList | null = input.files;
        try {
          if (files) {
            applyFileProject(await getProjectFromFile(files[0]))
          }
        } catch {
          alert("Ошибка при импорте проекта. Проверьте исходный фаил и повторите попытку")
        }
        input.value = "";
      }
      
    }


    verify(input).addEventListener("change", handlerChangeInputFile);
    return () => {
      if (input) input.removeEventListener("change", handlerChangeInputFile);
    };
  }, [inputFile, applyFileProject]);
}