import styles from './ToolbarCanvas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react';
import { useStateCanvasSize } from './useStateCanvasSize';

function ToolbarCanvas() {

  const inputWidth = useRef<HTMLInputElement>(null);
  const inputHeight = useRef<HTMLInputElement>(null);
  useStateCanvasSize(inputWidth, inputHeight);

  return (
    <div className={styles.toolbar}>
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
