import styles from "./ColorPicker.module.css";
import { useRef } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { inputColorText, setColorText } from "../../../../store/actionCreators/textBlockActionCreators";
import { useEditColorText } from "./useEditColorText";

type ColorPickerProps = {
  setColorText: (color: string) => void,
  inputColorText: (color: string) => void,
  color: string | null
}

function ColorPicker(props: ColorPickerProps) {
  const colorPicker = useRef<HTMLInputElement>(null);
  useEditColorText(props.color, colorPicker, props.setColorText, props.inputColorText);
  return (
    <input type="color"
      ref={colorPicker}
      className={styles.input}
    />
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    color: state.viewModel.text.color,
  }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setColorText: (color: string) => dispatch(setColorText(color)),
    inputColorText: (color: string) => dispatch(inputColorText(color)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
