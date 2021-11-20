import styles from './ToolbarBackground.module.css';
import { faDownload, faGlobe, faRetweet } from '@fortawesome/free-solid-svg-icons'
import ColorPicker from '../colorPicker/ColorPicker';
import Button from '../button/Button';
import { RefObject, useRef } from 'react';
import { useStateBackgroungColor } from './useStateBackgroungColor';

function ToolbarBackground() {
  const inputColor = useRef<HTMLInputElement>(null);
  const buttonReset = useRef<HTMLButtonElement>(null);
  useStateBackgroungColor(inputColor, buttonReset);
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
            <ColorPicker ref={inputColor as RefObject<HTMLInputElement>} />
          </div>
          <Button
            label="Сброс"
            title="Сброс"
            icon={faRetweet}
            ref={buttonReset as RefObject<HTMLButtonElement>}
          />
        </div>
      </div>
      <label className={styles.toolbar__label}>Фон</label>
    </div>
  );
}

export default ToolbarBackground;
