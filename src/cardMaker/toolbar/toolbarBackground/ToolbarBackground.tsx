import styles from "./ToolbarBackground.module.css";
import { faDownload, faGlobe, faRetweet } from "@fortawesome/free-solid-svg-icons"
import ColorPicker from "../colorPicker/ColorPicker";
import FileImgButton from "./fileImgButton/FileImgButton";
import { useRef } from "react";
import { useBackgroungColor } from "./useBackgroungColor";
import { AppDispatch, RootState } from "../../../store/store";
import {
  inputBackgroundColor,
  resetBackground,
  setBackgroundColor
} from "../../../store/actionCreators/canvasActionCreators";
import { connect } from "react-redux";
import { Background } from "../../../store/types";
import AddBackgroundByUrlButton from "./addBackgroundByUrlButton/AddBackgroundByUrlButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ToolbarBackgroundProps = {
  resetBackground: () => void,
  inputBackgroundColor: (color: string) => void,
  setBackgroundColor: (color: string) => void,
  background: Background,
}

function ToolbarBackground(props: ToolbarBackgroundProps) {

  const inputColor = useRef<HTMLInputElement>(null);
  const buttonReset = useRef<HTMLButtonElement>(null);

  useBackgroungColor(
    props.resetBackground,
    props.inputBackgroundColor,
    props.setBackgroundColor,
    props.background,
    inputColor,
    buttonReset
  );

  return (
    <div className={styles.toolbar}>
      <FileImgButton
        label="C компьютера"
        icon={faDownload}
      />
      <AddBackgroundByUrlButton
        label="Из Pixels"
        icon={faGlobe}
      />

      <div className={styles.row}>
        <label className={styles.label}>Цвет фона:</label>
        <ColorPicker ref={inputColor} />
        <button ref={buttonReset} className={styles.reset}>
          <FontAwesomeIcon icon={faRetweet} />
        </button>
      </div>

    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  background: state.canvas.background,
})


const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    resetBackground: () => dispatch(resetBackground()),
    inputBackgroundColor: (color: string) => dispatch(inputBackgroundColor(color)),
    setBackgroundColor: (color: string) => dispatch(setBackgroundColor(color)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarBackground);
