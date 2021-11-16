import styles from './ColorPicker.module.css';
import { ForwardedRef, forwardRef } from 'react';

const ColorPicker = forwardRef((props: {}, ref: ForwardedRef<HTMLInputElement>) => (
  <input type="color"
    ref={ref}
    className={styles.input__color}
  />
));

export default ColorPicker;
