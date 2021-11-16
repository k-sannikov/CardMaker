import { Block, CardMaker, } from '../CardMakerTypes';

// проверка доступности операции undo
export function isUndoAvailable(cardMaker: CardMaker): boolean {
  let length = cardMaker.history.listState.length;
  let index = cardMaker.history.currentIndex;
  return length > 1 && index > 0;
}

// проверка доступности операции redo
export function isRedoAvailable(cardMaker: CardMaker): boolean {
  let length = cardMaker.history.listState.length;
  let index = cardMaker.history.currentIndex;
  return index + 1 < length;
}

// проверка выделен ли блок
export function isSelectedBlock(cardMaker: CardMaker): boolean {
  return Boolean(cardMaker.selectBlock)
}

// проверка доступности операции перемещения слоя вверх
export function isShiftUpAvailable(cardMaker: CardMaker): boolean {
  const id: number|null = cardMaker.selectBlock;
  const length: number = cardMaker.canvas.listBlock.length;
  return Boolean(id && getIndexById(cardMaker.canvas.listBlock, id) < length - 1)
}

// проверка доступности операции перемещения слоя вниз
export function isShiftDownAvailable(cardMaker: CardMaker): boolean {
  const id: number|null = cardMaker.selectBlock;
  return Boolean(id && getIndexById(cardMaker.canvas.listBlock, id) > 0)
}

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

// получить индекс элемента по id
export function getIndexById(listBlock: Block[], id: number): number {
  let foundIndex: number = -1;
  listBlock.forEach((block: Block, index: number) => {
    if (block.id === id) {
      foundIndex = index;
    }
  });
  return foundIndex;
}

// конвертирование файла изображения в src стоку base64
type ImgInfo = {
  width: number,
  height: number,
  src: string,
}
export async function getImgInformationFromFile(fileImg: File): Promise<ImgInfo> {
  const fileImgPromise = new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(fileImg);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  const img = new Image();
  img.src = await fileImgPromise as string;
  await img.decode();
  return {
    width: img.width,
    height: img.height,
    src: img.src,
  }
}

export async function getCardMakerFromFile(file: File): Promise<CardMaker> {
  const filePromise = new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  const json = await filePromise as string;
  return await JSON.parse(json) as CardMaker;
}
