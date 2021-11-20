import styles from './ToolbarFilter.module.css';
import ColorPicker from '../colorPicker/ColorPicker';
import { RefObject, useRef } from 'react';
import { useFilter } from './useFilter';

function ToolbarFilter() {
  const inputColor = useRef<HTMLInputElement>(null);
  const inputRange = useRef<HTMLInputElement>(null);
  useFilter(inputColor, inputRange);
  return (
    <div className={styles.toolbar}>
      <div className={styles.colorPickerBox}>
        <ColorPicker
          ref={inputColor as RefObject<HTMLInputElement>}
        />
      </div>
      <input type="range" min="0" max="0.5" step="0.05" className={styles.input_range}
        ref={inputRange}
      />
      <label className={styles.toolbar__label}>Фильтр</label>
    </div>
  );
}

export default ToolbarFilter;
