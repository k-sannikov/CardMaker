import styles from './ToolbarBackground.module.css';
import { faDownload, faGlobe, faRetweet } from '@fortawesome/free-solid-svg-icons'
import ColorPicker from '../colorPicker/ColorPicker';
import Button from '../button/Button';
import { MutableRefObject, useRef } from 'react';
import { useBackgroungColor } from './useBackgroungColor';

function ToolbarBackground() {
  const inputColor = useRef<HTMLInputElement>(null);
  const buttonReset = useRef<HTMLButtonElement>(null);
  useBackgroungColor(
    inputColor as MutableRefObject<HTMLInputElement>,
    buttonReset as MutableRefObject<HTMLButtonElement>
    );
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <div className={styles.toolbar__col1}>
          <div className={styles.button_container}>
            <Button
              label="C компьютера"
              title="C компьютера"
              icon={faDownload}
            />
            <Button
              label="Из Pixels"
              title="Из Pixels"
              icon={faGlobe}
            />
          </div>
        </div>
        <div className={styles.toolbar__col2}>
          <div className={styles.colorPickerBox}>
            <ColorPicker ref={inputColor as MutableRefObject<HTMLInputElement>} />
          </div>
          <Button
            label="Сброс"
            title="Сброс"
            icon={faRetweet}
            ref={buttonReset as MutableRefObject<HTMLButtonElement>}
          />
        </div>
      </div>
      <label className={styles.toolbar__label}>Фон</label>
    </div>
  );
}

export default ToolbarBackground;
