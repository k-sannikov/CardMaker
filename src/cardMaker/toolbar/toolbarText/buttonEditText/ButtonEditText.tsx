import styles from "./ButtonEditText.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react";
import { connect } from "react-redux";
import { useEditStateText } from "./useEditStateText";

type ButtonEditTextProps = {
  icon: IconDefinition,
  enabled: boolean | null,
  modifyFn: ((enabled: boolean) => void) | (() => void),
  param: boolean,
}

function ButtonEditText(props: ButtonEditTextProps) {
  const button = useRef<HTMLButtonElement>(null);

  useEditStateText(button, props.enabled, props.modifyFn, props.param);

  return (
    <button className={`${styles.button} ${props.enabled ? styles.active : ""}`} ref={button}>
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
};


export default connect()(ButtonEditText);