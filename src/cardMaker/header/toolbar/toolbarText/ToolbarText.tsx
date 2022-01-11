import styles from "./ToolbarText.module.css";
import { faBold, faItalic, faUnderline, faFont } from "@fortawesome/free-solid-svg-icons"
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { createTextBlock, setBoldText, setItalicText, setUnderlineText } from "../../../../store/actionCreators/textBlockActionCreators";
import ButtonEditText from "./buttonEditText/ButtonEditText";
import ColorPicker from "./colorPicker/ColorPicker";
import InputNumber from "./inputNumber/InputNumber";
import SelectFontFamily from "./selectFontFamily/SelectFontFamily";


type ToolbarTextProps = {
  createTextBlock: () => void,
  setBoldText: (isBold: boolean) => void,
  setItalicText: (isItalic: boolean) => void,
  setUnderlineText: (isUnderline: boolean) => void,
  bold: boolean | null,
  italic: boolean | null,
  underline: boolean | null,
}

function ToolbarText(props: ToolbarTextProps) {
  return (
    <div className={styles.toolbar}>

      <div className={styles.toolbar__row}>
        <SelectFontFamily />
        <ButtonEditText icon={faFont} enabled={null} modifyFn={props.createTextBlock} param={false} />
      </div>

      <div className={styles.toolbar__row}>
        <InputNumber />

        <ButtonEditText icon={faBold} enabled={props.bold} modifyFn={props.setBoldText}  param={true}/>
        <ButtonEditText icon={faItalic} enabled={props.italic} modifyFn={props.setItalicText}  param={true}/>
        <ButtonEditText icon={faUnderline} enabled={props.underline} modifyFn={props.setUnderlineText}  param={true}/>
        <div className={styles.colorPickerBox}>
          <ColorPicker />
        </div>
      </div>

      <label className={styles.toolbar__label}>Текст</label>
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    bold: state.viewModel.text.bold,
    italic: state.viewModel.text.italic,
    underline: state.viewModel.text.underline,
  }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    createTextBlock: () => dispatch(createTextBlock()),
    setBoldText: (isBold: boolean) => dispatch(setBoldText(isBold)),
    setItalicText: (isItalic: boolean) => dispatch(setItalicText(isItalic)),
    setUnderlineText: (isUnderline: boolean) => dispatch(setUnderlineText(isUnderline)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarText);
