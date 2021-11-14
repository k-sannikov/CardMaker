import styles from './ColorPicker.module.css';
import { ChangeEvent, FocusEvent, forwardRef } from 'react';

type ColorPickerBackground = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onBlur: (event: FocusEvent<HTMLInputElement>) => void,
}

const ColorPicker = forwardRef((props: ColorPickerBackground, ref: any) => (
  <input type="color"
    ref={ref}
    className={styles.input__color}
    onChange={props.onChange}
    onBlur={props.onBlur}
  />
));

export default ColorPicker;
