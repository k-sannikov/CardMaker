import { Block } from '../CardMakerTypes';

// установка значений полю/полям одного элемента из списка элементов
export function setComponentFields(listBlock: Block[], id: number, modifiableFields: object): Block[] {
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