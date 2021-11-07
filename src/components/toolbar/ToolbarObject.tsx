import styles from '../../css/ToolbarObject.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons'

import type { MouseEvent } from 'react';

import { shiftUpBlock, shiftDownBlock, deleteComponent } from '../../CardMakerFunctions';
import { dispatch } from '../../CardMaker';
import { CardMaker, Block } from '../../CardMakerTypes';
import { getIndexById } from '../../utils/getIndexById'

type ToolbarObjectProps = {
  cardMaker: CardMaker,
}

function ToolbarObject(props: ToolbarObjectProps) {

  let listBlock: Block[] = props.cardMaker.canvas.listBlock;
  let idBlock: number | null = props.cardMaker.selectComponent;
  let length: number = listBlock.length;

  const onClickShiftUp = (event: MouseEvent<HTMLElement>) => {
    if (idBlock && (getIndexById(listBlock, idBlock) < length - 1)) {
      dispatch(shiftUpBlock);
    }
    event.stopPropagation()
  }
  
  const onClickShiftDown = (event: MouseEvent<HTMLElement>) => {
    if (idBlock && (getIndexById(listBlock, idBlock)) > 0) {
      dispatch(shiftDownBlock);
    }
    event.stopPropagation()
  }

  const onClickDelete = () => {
    if (idBlock) {
      dispatch(deleteComponent);
    }
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <div>
          <div className={styles.button_container}>
            <button className={styles.toolbar__button}
              id="button-shift-up"
              title="Переместить вперед"
              onClick={onClickShiftUp}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button className={styles.toolbar__button}
              id="button-shift-down"
              title="Переместить назад"
              onClick={onClickShiftDown}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
        </div>
        <div className={styles.toolbar__col}>
          <button className={styles.toolbar__button}
            onClick={onClickDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className={styles.toolbar__button_text}>Удалить</span>
          </button>
        </div>
      </div>
      <h2 className={styles.toolbar__label}>Объекты</h2>
    </div>
  );
}

export default ToolbarObject;
