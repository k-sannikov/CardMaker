import styles from './ToolbarBackground.module.css';
import { faDownload, faGlobe, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { resetBackground } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';
import ColorPicker from '../colorPicker/ColorPickerBackground';
import Button from '../button/Button';

function ToolbarBackground() {
  const onClickResetColor = () => {
    dispatch(resetBackground);
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <div className={styles.toolbar__col1}>
          <div className={styles.button_container}>
            <Button
              label="C компьютера"
              title="C компьютера"
              icon={faDownload}
              onClick={() => console.log('C компьютера')}
            />
            <Button
              label="Из Pixels"
              title="Из Pixels"
              icon={faDownload}
              onClick={() => console.log('Из Pixels')}
            />
          </div>
        </div>
        <div className={styles.toolbar__col2}>
          <ColorPicker />
          <Button
            label="Сброс"
            title="Сброс"
            icon={faRetweet}
            onClick={onClickResetColor}
          />
        </div>
      </div>
      <label className={styles.toolbar__label}>Фон</label>
    </div>
  );
}

export default ToolbarBackground;
