import styles from "./DropdownMenu.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux";

type DropdownMenuProps = {
  minWidth: number,
  label: string,
  icon: IconDefinition,
  children: React.ReactElement[],
}
function DropdownMenu(props: DropdownMenuProps) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        <FontAwesomeIcon icon={props.icon} />
        <span className={styles.dropdownText}>{props.label}</span>
      </button>
      <div className={styles.dropdownContent} style={{ minWidth: props.minWidth }}>
        {props.children}
      </div>
    </div>
  );
}

export default connect()(DropdownMenu);
