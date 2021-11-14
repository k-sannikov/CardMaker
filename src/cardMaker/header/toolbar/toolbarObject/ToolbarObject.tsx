import styles from './ToolbarObject.module.css';
import { faArrowUp, faArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons'

import type { MouseEvent } from 'react';

import { shiftUpBlock, shiftDownBlock, deleteComponent } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';
import Button from '../button/Button';

function ToolbarObject() {

  const onClickShiftUp = (event: MouseEvent<HTMLElement>) => {
    dispatch(shiftUpBlock);
    event.stopPropagation();
  }

  const onClickShiftDown = (event: MouseEvent<HTMLElement>) => {
    dispatch(shiftDownBlock);
    event.stopPropagation();
  }

  const onClickDelete = () => {
    dispatch(deleteComponent);
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <div>
          <div className={styles.button_container}>
            <Button
              label=""
              title="Переместить вперед"
              icon={faArrowUp}
              onClick={onClickShiftUp}
            />
            <Button
              label=""
              title="Переместить назад"
              icon={faArrowDown}
              onClick={onClickShiftDown}
            />
            {/* <button className={styles.toolbar__button}
              id="button-shift-down"
              title="Переместить назад"
              onClick={onClickShiftDown}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button> */}
          </div>
        </div>
        <div className={styles.toolbar__col}>
          <Button
            label="Удалить"
            title="Удалить"
            icon={faTrash}
            onClick={onClickDelete}
          />
        </div>
      </div>
      <h2 className={styles.toolbar__label}>Объекты</h2>
    </div>
  );
}

export default ToolbarObject;
