import styles from './ToolbarCanvas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, MutableRefObject, useRef } from 'react';
import { useStateCanvasSize } from './useStateCanvasSize';

function ToolbarCanvas() {
  const onChangeRange = (event: ChangeEvent<HTMLInputElement>) => {
    document.getElementById('canvas')!.style.transform = 'scale(' + event.target.value + ')';
  }

  const inputWidth = useRef<HTMLInputElement>(null);
  const inputHeight = useRef<HTMLInputElement>(null);
  useStateCanvasSize(inputWidth, inputHeight);

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <input type="range" min="0.2" max="2" step="0.1" defaultValue="1"
          className={styles.input_range}
          onChange={onChangeRange}
        />
      </div>
      <div className={styles.toolbar__row}>
        <input type="number" className={styles.input_number} min="0"
          ref={inputWidth}
        />
        <FontAwesomeIcon icon={faTimes} className={styles.label} />
        <input type="number" className={styles.input_number} min="0"
          ref={inputHeight}
        />
      </div>

      <label className={styles.toolbar__label}>Холст</label>
    </div>
  );
}

export default ToolbarCanvas;
