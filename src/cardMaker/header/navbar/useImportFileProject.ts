import { getProjectFromFile } from '../../../utils/files';
import { RefObject, useEffect } from 'react';
import { CardMaker as CardMakerType } from '../../../store/types';
import { verify } from '../../../utils/permisions';

export function useImportFileProject(
  inputFile: RefObject<HTMLInputElement>,
  applyFileProject: (file: CardMakerType) => void,
): void {

  async function handlerChangeInputFile(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    applyFileProject(await getProjectFromFile(files[0]))
    target.value = '';
  }

  useEffect(() => {
    verify(inputFile.current).addEventListener("change", handlerChangeInputFile);
    return () => {
      if (inputFile.current) {
        inputFile.current.removeEventListener("change", handlerChangeInputFile);
      }
    };
  }, []);
}