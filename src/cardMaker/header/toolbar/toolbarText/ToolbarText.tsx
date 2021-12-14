import styles from './ToolbarText.module.css';
import { faBold, faItalic, faUnderline, faFont } from '@fortawesome/free-solid-svg-icons'
import ButtonEditText from './buttonEditText/ButtonEditText';
import ColorPicker from '../colorPicker/ColorPicker';
import { useCreateText } from './useCreateText';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { createTextBlock } from '../../../../store/actionCreators/textBlockActionCreators';

type ToolbarTextProps = {
  createTextBlock: () => void,
}

function ToolbarText(props: ToolbarTextProps) {
  const addButton = useRef<HTMLButtonElement>(null);
  useCreateText(addButton, props.createTextBlock);
  return (
    <div className={styles.toolbar}>

      <div className={styles.toolbar__row}>
        <select name="" id="" className={styles.toolbar__fontFamily}>
          <option className={styles.fantazyor} value="">Fantazyor</option>
          <option className={styles.piroucyrillic} value="">Piroucyrillic</option>
          <option className={styles.phenomena} value="">Phenomena</option>
          <option className={styles.sunday} value="">Sunday</option>
          <option className={styles.kurale} value="">Kurale</option>
          <option className={styles.sensei} value="">Sensei</option>
          <option className={styles.borsok} value="">Borsok</option>
          <option className={styles.summer} value="">Summer</option>
          <option className={styles.underdog} value="">Underdog</option>
          <option className={styles.montserrat} value="">Montserrat</option>
          <option className={styles.openSans} value="">OpenSans</option>
          <option className={styles.comfortaa} value="">Comfortaa</option>
          <option className={styles.rubik} value="">Rubik</option>
          <option className={styles.marta} value="">Marta</option>
        </select>
        <ButtonEditText icon={faFont} ref={addButton} />
      </div>

      <div className={styles.toolbar__row}>
        <select name="" id="" className={styles.toolbar__fontSize}>
          <option value="">14</option>
          <option value="">16</option>
        </select>
        <ButtonEditText icon={faBold} />
        <ButtonEditText icon={faItalic} />
        <ButtonEditText icon={faUnderline} />
        <div className={styles.colorPickerBox}>
          <ColorPicker ref={null} />
        </div>
      </div>

      <label className={styles.toolbar__label}>Текст</label>
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    createTextBlock: () => dispatch(createTextBlock()),
  }
}

export default connect(null, mapDispatchToProps)(ToolbarText);
