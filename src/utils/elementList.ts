import { Block } from '../store/types';

// проверка выделен ли блок
export function isSelectedBlock(id: string | null): boolean {
  return Boolean(id)
}

// установка значений полю/полям одного элемента из списка элементов
export function setComponentFields(listBlock: Block[], id: string, modifiableFields: object): Block[] {
  let newlistBlock: Block[] = [];
  listBlock.forEach((component: Block) => {
    if (component.id === id) {
      newlistBlock.push({
        ...component,
        ...modifiableFields,
      });
    } else {
      newlistBlock.push(component);
    }
  });
  return newlistBlock;
}

// получить индекс элемента по id
export function getIndexById(listBlock: Block[], id: string): number {
  let foundIndex: number = -1;
  listBlock.forEach((block: Block, index: number) => {
    if (block.id === id) {
      foundIndex = index;
    }
  });
  return foundIndex;
}



