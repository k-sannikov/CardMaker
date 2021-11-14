import styles from './ToolbarCanvas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useRef } from 'react';
import { useCanvasSize } from './useCanvasSize';

function ToolbarCanvas() {
  const onChangeRange = (event: ChangeEvent<HTMLInputElement>) => {
    document.getElementById('canvas')!.style.transform = 'scale(' + event.target.value + ')';
  }

  const inputWidth: any = useRef(null);
  const inputHeight: any = useRef(null);

  useCanvasSize(inputWidth, inputHeight);

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

      <h2 className={styles.toolbar__label}>Холст</h2>
    </div>
  );
}

export default ToolbarCanvas;
