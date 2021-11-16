import styles from './ToolbarObject.module.css';
import { faArrowUp, faArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button';
import { useObject } from './useObject';
import { MutableRefObject, useRef } from 'react';

function ToolbarObject() {
  let buttonUp = useRef<HTMLButtonElement>(null);
  let buttonDown = useRef<HTMLButtonElement>(null);
  let buttonDelete = useRef<HTMLButtonElement>(null);
  useObject(
    buttonUp as MutableRefObject<HTMLButtonElement>,
    buttonDown as MutableRefObject<HTMLButtonElement>,
    buttonDelete as MutableRefObject<HTMLButtonElement>
  );
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <div>
          <div className={styles.button_container}>
            <Button
              ref={buttonUp as MutableRefObject<HTMLButtonElement>}
              label=""
              title="Переместить вперед"
              icon={faArrowUp}
            />
            <Button
              ref={buttonDown as MutableRefObject<HTMLButtonElement>}
              label=""
              title="Переместить назад"
              icon={faArrowDown}
            />
          </div>
        </div>
        <div className={styles.toolbar__col}>
          <Button
            ref={buttonDelete as MutableRefObject<HTMLButtonElement>}
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
