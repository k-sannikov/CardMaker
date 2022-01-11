import styles from "./Button.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ForwardedRef, forwardRef } from "react";
import { connect } from "react-redux";

type ButtonProps = {
  label: string,
  title: string,
  icon: IconDefinition,
}

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
  <button
    className={styles.button}
    ref={ref}
    title={props.title}
    style={{ textAlign: props.label === "" ? "center" : "left" }}
  >
    <FontAwesomeIcon icon={props.icon} />
    {props.label !== "" &&
      <span className={styles.button_text}>{props.label}</span>
    }
  </button>
));

export default connect(null, null, null, { forwardRef: true })(Button);