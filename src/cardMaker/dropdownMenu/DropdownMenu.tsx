import styles from "./DropdownMenu.module.css";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux";

type DropdownMenuProps = {
  minWidth: number,
  label: string,
  icon: IconDefinition,
  sizeIcon: SizeProp,
  children: React.ReactElement[],
}
function DropdownMenu(props: DropdownMenuProps) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        <FontAwesomeIcon icon={props.icon} size={props.sizeIcon} />
        {props.label !== "" &&
          <span className={styles.dropdown_text}>{props.label}</span>
        }
      </button>
      <div className={styles.dropdown_content} style={{minWidth: props.minWidth}}>
        {props.children}
      </div>
    </div>
  );
}

export default connect()(DropdownMenu);
