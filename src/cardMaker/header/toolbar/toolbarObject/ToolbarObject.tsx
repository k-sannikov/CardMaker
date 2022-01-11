import styles from "./ToolbarObject.module.css";
import { faArrowUp, faArrowDown, faTrash } from "@fortawesome/free-solid-svg-icons"
import Button from "../button/Button";
import { useBlockLevel } from "./useBlockLevel";
import { useBlockDelete } from "./useBlockDelete";
import { useRef } from "react";
import { connect } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { deleteBlock, shiftDownBlock, shiftUpBlock } from "../../../../store/actionCreators/blockActionCreators";

type ToolbarObjectProps = {
  shiftUpBlock: () => void,
  shiftDownBlock: () => void,
  deleteBlock: () => void,
}

function ToolbarObject(props: ToolbarObjectProps) {
  const buttonUp = useRef<HTMLButtonElement>(null);
  const buttonDown = useRef<HTMLButtonElement>(null);
  const buttonDelete = useRef<HTMLButtonElement>(null);
  useBlockLevel(buttonUp, buttonDown, props.shiftUpBlock, props.shiftDownBlock);
  useBlockDelete(buttonDelete, props.deleteBlock);
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <div>
          <div className={styles.button_container}>
            <Button
              ref={buttonUp}
              label=""
              title="Переместить вперед"
              icon={faArrowUp}
            />
            <Button
              ref={buttonDown}
              label=""
              title="Переместить назад"
              icon={faArrowDown}
            />
          </div>
        </div>
        <div className={styles.toolbar__col}>
          <Button
            ref={buttonDelete}
            label="Удалить"
            title="Удалить"
            icon={faTrash}
          />
        </div>
      </div>
      <label className={styles.toolbar__label}>Объекты</label>
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    shiftUpBlock: () => dispatch(shiftUpBlock()),
    shiftDownBlock: () => dispatch(shiftDownBlock()),
    deleteBlock: () => dispatch(deleteBlock()),
  }
}

export default connect(null, mapDispatchToProps)(ToolbarObject);
