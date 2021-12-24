import { Block, BlockTypes } from '../types';
import { setComponentFields, getIndexById, isSelectedBlock } from '../../utils/elementList'
import { isShiftUpAvailable, isShiftDownAvailable } from '../../utils/permisions'
import { createGUID } from '../../utils/guid';

export type ListBlockAction = {
  type: 'NEW_CARD_MAKER',
} | {
  type: 'CREATE_TEXT_BLOCK',
  x: number,
  y: number,
} | {
  type: 'SET_SIZE_BLOCK',
  id: string,
  width: number,
  height: number,
} | {
  type: 'SET_TEXT_IN_TEXT_BLOCK',
  id: string,
  text: string,
} | {
  type: 'SET_FONT_FAMILY_TEXT',
  id: string,
  fontFamily: string,
} | {
  type: 'SET_BOLD_TEXT',
  id: string,
  isBold: boolean,
} | {
  type: 'SET_ITALIC_TEXT',
  id: string,
  isItalic: boolean,
} | {
  type: 'SET_UNDERLINE_TEXT',
  id: string,
  isUnderline: boolean,
} | {
  type: 'SET_SIZE_TEXT',
  id: string,
  size: number,
} | {
  type: 'SET_COLOR_TEXT',
  id: string,
  color: string,
} | {
  type: 'CREATE_IMG_BLOCK',
  width: number,
  height: number,
  src: string,
  x: number,
  y: number,
} | {
  type: 'CREATE_ART_OBJ_BLOCK',
  src: string,
  x: number,
  y: number,
} | {
  type: 'DELETE_BLOCK',
  id: string,
} | {
  type: 'SET_POSITION_BLOCK',
  id: string,
  x: number,
  y: number,
} | {
  type: 'SHIFT_UP_BLOCK',
  id: string,
} | {
  type: 'SHIFT_DOWN_BLOCK',
  id: string,
}

function listBlock(listBlock: Block[], action: ListBlockAction): Block[] {
  switch (action.type) {

    case 'NEW_CARD_MAKER':
      return [];

    case 'CREATE_TEXT_BLOCK':
      return [
        ...listBlock,
        {
          id: createGUID(),
          type: BlockTypes.text,
          color: '#000000',
          x: action.x - 45,
          y: action.y - 25,
          text: 'Текст',
          size: 30,
          bold: false,
          italic: false,
          underline: false,
          fontFamily: 'OpenSans',
        }
      ];

    case 'SET_SIZE_BLOCK':
      return setComponentFields(listBlock, action.id, {
        width: action.width,
        height: action.height,
      });

    case 'SET_TEXT_IN_TEXT_BLOCK':
      return setComponentFields(listBlock, action.id, {
        text: action.text,
      });

    case 'SET_FONT_FAMILY_TEXT':
      return setComponentFields(listBlock, action.id, {
        fontFamily: action.fontFamily,
      });

    case 'SET_BOLD_TEXT':
      return setComponentFields(listBlock, action.id, {
        bold: action.isBold,
      });

    case 'SET_ITALIC_TEXT':
      return setComponentFields(listBlock, action.id, {
        italic: action.isItalic,
      });

    case 'SET_UNDERLINE_TEXT':
      return setComponentFields(listBlock, action.id, {
        underline: action.isUnderline,
      });

    case 'SET_SIZE_TEXT':
      return setComponentFields(listBlock, action.id, {
        size: action.size,
      });

    case 'SET_COLOR_TEXT':
      return setComponentFields(listBlock, action.id, {
        color: action.color,
      });

    case 'CREATE_IMG_BLOCK':
      return [
        ...listBlock,
        {
          id: createGUID(),
          type: BlockTypes.img,
          width: action.width,
          height: action.height,
          x: action.x,
          y: action.y,
          src: action.src,
        }
      ];

    case 'CREATE_ART_OBJ_BLOCK':
      return [
        ...listBlock,
        {
          id: createGUID(),
          type: BlockTypes.artObj,
          width: 150,
          height: 150,
          x: action.x,
          y: action.y,
          src: action.src,
        }
      ];

    case 'DELETE_BLOCK':
      let copyListBlock: Block[] = [...listBlock];
      if (isSelectedBlock(action.id)) {
        copyListBlock.forEach((component, index) => {
          if (component.id === action.id) {
            copyListBlock.splice(index, 1);
            return false;
          }
        });
      }
      return copyListBlock;

    case 'SET_POSITION_BLOCK':
      return setComponentFields(listBlock, action.id, {
        x: action.x,
        y: action.y,
      });

    case 'SHIFT_UP_BLOCK':
      {
        let newListBlock: Block[] = [...listBlock];
        if (isShiftUpAvailable(action.id, listBlock)) {
          const id: string = action.id as string;
          const index: number = getIndexById(newListBlock, id);
          const flipValue: Block[] = [newListBlock[index + 1], newListBlock[index]];
          newListBlock.splice(index, 2, ...flipValue);
        }
        return newListBlock;
      }

    case 'SHIFT_DOWN_BLOCK':
      {
        let newListBlock: Block[] = [...listBlock];
        if (isShiftDownAvailable(action.id, listBlock)) {
          const id: string = action.id as string;
          const index: number = getIndexById(newListBlock, id);
          const flipValue: Block[] = [newListBlock[index], newListBlock[index - 1]];
          newListBlock.splice(index - 1, 2, ...flipValue);
        }
        return newListBlock;
      }

    default:
      return listBlock;
  }
}

export default listBlock;