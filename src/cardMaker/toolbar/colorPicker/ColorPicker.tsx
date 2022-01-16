import styles from "./ColorPicker.module.css";
import { ForwardedRef, forwardRef } from "react";
import { connect } from "react-redux";

const ColorPicker = forwardRef((props: {}, ref: ForwardedRef<HTMLInputElement>) => (
  <input type="color"
    ref={ref}
    className={styles.input__color}
  />
));

export default connect(null, null, null, { forwardRef: true })(ColorPicker);
