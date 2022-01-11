import styles from "./ToolbarCanvas.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react";
import { useStateCanvasSize } from "./useStateCanvasSize";
import { connect } from "react-redux";
import { inputCanvasSize, setCanvasSize } from "../../../../store/actionCreators/canvasActionCreators";
import { AppDispatch, RootState } from "../../../../store/store";

type ToolbarCanvasProps = {
  inputCanvasSize: (width: number, height: number) => void,
  setCanvasSize: (width: number, height: number) => void,
  width: number,
  height: number,
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

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <input type="number" className={styles.input_number} min="0"
          ref={inputWidth}
        />
        <FontAwesomeIcon icon={faTimes} className={styles.label} />
        <input type="number" className={styles.input_number} min="0"
          ref={inputHeight}
        />
      </div>

      <label className={styles.toolbar__label}>Холст</label>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarCanvas);
