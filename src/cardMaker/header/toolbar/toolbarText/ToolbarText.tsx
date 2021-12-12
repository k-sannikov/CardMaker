import styles from './ToolbarText.module.css';
import { faBold, faItalic, faUnderline, faFont } from '@fortawesome/free-solid-svg-icons'
import ButtonEditText from './buttonEditText/ButtonEditText';
import ColorPicker from '../colorPicker/ColorPicker';
import { useCreateText } from './useCreateText';
import { useRef } from 'react';
import { connect } from 'react-redux';

function ToolbarText() {
  const addButton = useRef<HTMLButtonElement>(null);
  useCreateText(addButton);
  return (
    <div className={styles.toolbar}>

      <div className={styles.toolbar__row}>
        <select name="" id="" className={styles.toolbar__fontFamily}>
          <option className={styles.bitter} value="">Bitter</option>
          <option className={styles.ptSerif} value="">PT Serif</option>
          <option className={styles.roboto} value="">Roboto</option>
          <option className={styles.ibmPlexMono} value="">IBM Plex Mono</option>
          <option className={styles.alegreyaSans} value="">Alegreya Sans</option>
          <option className={styles.cormorantGaramond} value="">Cormorant Garamond</option>
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

export default connect()(ToolbarText);
