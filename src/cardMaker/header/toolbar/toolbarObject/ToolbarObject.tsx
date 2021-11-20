import styles from './ToolbarObject.module.css';
import { faArrowUp, faArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button';
import { useBlockLevel } from './useBlockLevel';
import { useBlockDelete } from './useBlockDelete';
import { RefObject, useRef } from 'react';

function ToolbarObject() {
  let buttonUp = useRef<HTMLButtonElement>(null);
  let buttonDown = useRef<HTMLButtonElement>(null);
  let buttonDelete = useRef<HTMLButtonElement>(null);
  useBlockLevel(buttonUp, buttonDown);
  useBlockDelete(buttonDelete);
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <div>
          <div className={styles.button_container}>
            <Button
              ref={buttonUp as RefObject<HTMLButtonElement>}
              label=""
              title="Переместить вперед"
              icon={faArrowUp}
            />
            <Button
              ref={buttonDown as RefObject<HTMLButtonElement>}
              label=""
              title="Переместить назад"
              icon={faArrowDown}
            />
          </div>
        </div>
        <div className={styles.toolbar__col}>
          <Button
            ref={buttonDelete as RefObject<HTMLButtonElement>}
            label="Удалить"
            title="Удалить"
            icon={faTrash}
          />
        </div>
      </div>
      <label className={styles.toolbar__label}>Объекты</label>
    </div>
  );
}

export default ToolbarObject;
