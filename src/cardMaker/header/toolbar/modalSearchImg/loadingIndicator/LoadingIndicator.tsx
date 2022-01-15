import { ForwardedRef, forwardRef } from "react";
import { connect } from "react-redux";
import styles from "./LoadingIndicator.module.css";

const LoadingIndicator = forwardRef((props: {}, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={styles.cssloadSpinBox} ref={ref}></div>
  )
});

export default connect(null, null, null, { forwardRef: true })(LoadingIndicator);