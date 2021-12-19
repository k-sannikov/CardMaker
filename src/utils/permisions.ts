import { ActionHistory, Block } from '../store/types';
import { getIndexById } from './elementList';

// провера доступности операции undo
export function isUndoAvailable(history: ActionHistory): boolean {
  let length = history.listState.length;
  let index = history.currentIndex;
  return length > 1 && index > 0;
}

// проверка доступности операции redo
export function isRedoAvailable(history: ActionHistory): boolean {
  let length = history.listState.length;
  let index = history.currentIndex;
  return index + 1 < length;
}

// проверка доступности операции перемещения слоя вверх
export function isShiftUpAvailable(id: string | null, listBlock: Block[]): boolean {
  const length: number = listBlock.length;
  return Boolean(id && getIndexById(listBlock, id) < length - 1)
}

// проверка доступности операции перемещения слоя вниз
export function isShiftDownAvailable(id: string | null, listBlock: Block[]): boolean {
  return Boolean(id && getIndexById(listBlock, id) > 0)
}

// проверка на !null значение
export function verify<T>(value: T | null | undefined): T {
  if (!value) {
    throw new Error('Assertion failed');
  }
  return value;
}