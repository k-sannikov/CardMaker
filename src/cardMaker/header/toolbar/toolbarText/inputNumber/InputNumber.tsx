import styles from "./InputNumber.module.css";
import { connect } from "react-redux";
import { useEditFontSize } from "./useEditFontSize";
import { useRef } from "react";
import { AppDispatch, RootState } from "../../../../../store/store";
import { inputSizeText, setSizeText } from "../../../../../store/actionCreators/textBlockActionCreators";

type InputNumberProps = {
  size: number | null,
  tempSize: number | null,
  setSizeText: (size: number) => void,
  inputSizeText: (size: number) => void,
}

function InputNumber(props: InputNumberProps) {
  const inputNumber = useRef<HTMLInputElement>(null);
  useEditFontSize(props.size, inputNumber, props.setSizeText, props.inputSizeText);

  return (
    <input type="number"
      ref={inputNumber}
      className={styles.input__number}
      min={10}
      max={150}
      step={1}
    />
  )
}

function mapStateToProps(state: RootState) {
  return {
    size: state.viewModel.text.size,
    tempSize: state.viewModel.text.tempSize,
  }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setSizeText: (size: number) => dispatch(setSizeText(size)),
    inputSizeText: (size: number) => dispatch(inputSizeText(size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputNumber);
