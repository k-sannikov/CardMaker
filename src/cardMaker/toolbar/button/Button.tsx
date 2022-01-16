import styles from "./Button.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ForwardedRef, forwardRef } from "react";
import { connect } from "react-redux";

type ButtonProps = {
  label: string,
  icon: IconDefinition,
}

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
  <button
    className={styles.button}
    ref={ref}
  >
    <FontAwesomeIcon icon={props.icon} />
    <span className={styles.buttonText}>{props.label}</span>
  </button>
));

export default connect(null, null, null, { forwardRef: true })(Button);