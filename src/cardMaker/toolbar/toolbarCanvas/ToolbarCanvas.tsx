import styles from "./ToolbarCanvas.module.css";
import { useRef } from "react";
import { useStateCanvasSize } from "./useStateCanvasSize";
import { connect } from "react-redux";
import { inputCanvasSize, setCanvasSize } from "../../../store/actionCreators/canvasActionCreators";
import { AppDispatch, RootState } from "../../../store/store";
import { faEraser } from "@fortawesome/free-solid-svg-icons"
import Button from "../button/Button";
import { deleteAreaSelection, resetAreaSelection } from "../../../store/actionCreators/canvasActionCreators";
import { useDeleteArea } from "./useDeleteArea";

type ToolbarCanvasProps = {
  inputCanvasSize: (width: number, height: number) => void,
  setCanvasSize: (width: number, height: number) => void,
  width: number,
  height: number,
  deleteAreaSelection: () => void,
  resetAreaSelection: () => void,
}

function ToolbarCanvas(props: ToolbarCanvasProps) {

  const inputWidth = useRef<HTMLInputElement>(null);
  const inputHeight = useRef<HTMLInputElement>(null);
  useStateCanvasSize(
    inputWidth,
    inputHeight,
    props.inputCanvasSize,
    props.setCanvasSize,
    props.width,
    props.height,
  );

  const buttonDelete = useRef<HTMLButtonElement>(null);

  useDeleteArea(buttonDelete, props.deleteAreaSelection, props.resetAreaSelection);

  return (
    <div className={styles.toolbar}>

      <div className={styles.row}>
        <label className={styles.label}>Ширина:</label>
        <input type="number" className={styles.inputNumber} min="0" ref={inputWidth} />
        <span className={styles.unitsLabel}>px</span>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>Высота:</label>
        <input type="number" className={styles.inputNumber} min="0" ref={inputHeight} />
        <span className={styles.unitsLabel}>px</span>
      </div>

      <Button
        ref={buttonDelete}
        label="Удалить область"
        icon={faEraser}
      />

    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  width: state.canvas.width,
  height: state.canvas.height,
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    inputCanvasSize: (width: number, height: number) => dispatch(inputCanvasSize(width, height)),
    setCanvasSize: (width: number, height: number) => dispatch(setCanvasSize(width, height)),
    deleteAreaSelection: () => dispatch(deleteAreaSelection()),
    resetAreaSelection: () => dispatch(resetAreaSelection()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarCanvas);
