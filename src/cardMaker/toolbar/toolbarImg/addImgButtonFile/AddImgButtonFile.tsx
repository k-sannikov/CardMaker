import styles from "./AddImgButtonFile.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ForwardedRef, forwardRef } from "react";
import { connect } from "react-redux";

type NavButtonProps = {
  label: string,
  icon: IconDefinition,
}

const AddImgButton = forwardRef((props: NavButtonProps, ref: ForwardedRef<HTMLInputElement>) => (
  <button className={styles.button}>
    <label htmlFor="input-file-img" className={styles.icon}>
      <FontAwesomeIcon icon={props.icon} />
    </label>
    <input
      className={styles.inputFile}
      type="file"
      accept=".png,.jpg,.jfif,.jpe,.jpeg"
      ref={ref}
      id="input-file-img"
    />
    <label className={styles.buttonText}
      htmlFor="input-file-img">
      {props.label}
    </label>
  </button>
));

export default connect(null, null, null, { forwardRef: true })(AddImgButton);