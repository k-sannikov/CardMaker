import styles from "./AddImgButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ForwardedRef, forwardRef } from "react";
import { connect } from "react-redux";

type NavButtonProps = {
  label: string,
  title: string,
  icon: IconDefinition,
}

const AddImgButton = forwardRef((props: NavButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
  <button
    ref={ref}
    className={styles.button}
    title={props.title}>
    <FontAwesomeIcon icon={props.icon} size="lg" />
    {props.label !== "" &&
      <span className={styles.button__text}>{props.label}</span>
    }
  </button>
));

export default connect(null, null, null, { forwardRef: true })(AddImgButton);