import { getProjectFromFile } from '../../../utils/files';
import { RefObject, useEffect } from 'react';
import { CardMaker as CardMakerType } from '../../../store/types';
import { verify } from '../../../utils/permisions';

export function useImportFileProject(
  inputFile: RefObject<HTMLInputElement>,
  applyFileProject: (file: CardMakerType) => void): void {

  useEffect(() => {

    const input = inputFile.current;

    async function handlerChangeInputFile(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      try {
        applyFileProject(await getProjectFromFile(files[0]))
      } catch {
        alert('Текст ошибки')
      }

      target.value = '';
    }

    
    verify(input).addEventListener("change", handlerChangeInputFile);
    return () => {
      if (input) input.removeEventListener("change", handlerChangeInputFile);
    };
  }, [inputFile, applyFileProject]);
}