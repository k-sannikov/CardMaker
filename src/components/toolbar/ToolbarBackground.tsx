import styles from '../../css/ToolbarBackground.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faGlobe, faRetweet } from '@fortawesome/free-solid-svg-icons'

import { setBackgroundColor, resetBackground } from '../../CardMakerFunctions';
import { dispatch } from '../../CardMaker';
import { Canvas } from '../../CardMakerTypes';

import { useEffect, ChangeEvent, FocusEvent } from 'react';

type ToolbarBackgroundProps = {
  canvas: Canvas,
}

function ToolbarBackground(props: ToolbarBackgroundProps) {
  useEffect(() => {
    let bgColorInputElement: HTMLInputElement = document.getElementById("bg-color") as HTMLInputElement;
    bgColorInputElement.value = props.canvas.background.color ? props.canvas.background.color : '#ffffff';
  });

  const onChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    let canvasDivElement: HTMLDivElement = document.getElementById('canvas') as HTMLDivElement;
    canvasDivElement.style.background = event.target.value;
  }

  const onBlurColor = (event: FocusEvent<HTMLInputElement>) => {
    const color: string = event.target.value;
    dispatch(setBackgroundColor, color);
  }

  const onClickResetColor = () => {
    dispatch(resetBackground);
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <div className={styles.toolbar__col1}>
          <div className={styles.button_container}>
            <button className={styles.toolbar__button}>
              <FontAwesomeIcon icon={faDownload} />
              <span className={styles.toolbar__button_text}>C компьютера</span>
            </button>
            <button className={styles.toolbar__button}>
              <FontAwesomeIcon icon={faGlobe} />
              <span className={styles.toolbar__button_text}>Из Pixels</span>
            </button>
          </div>
        </div>
        <div className={styles.toolbar__col2}>
          <input type="color" className={styles.input__color} id="bg-color"
            onChange={onChangeColor}
            onBlur={onBlurColor}
          />
          <button className={styles.toolbar__button + ' ' + styles.toolbar__button_reset}
            onClick={onClickResetColor}
          >
            <FontAwesomeIcon icon={faRetweet} />
            <span className={styles.toolbar__button_text}>Сброс</span>
          </button>
        </div>
      </div>
      <label className={styles.toolbar__label}>Фон</label>
    </div>
  );
}

export default ToolbarBackground;
