import styles from './ToolbarText.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons'
import ButtonEditText from './buttonEditText/ButtonEditText';

function ToolbarText() {
  return (
    <div className={styles.toolbar}>

      <div className={styles.toolbar__row}>
        <select name="" id="" className={styles.toolbar__fontFamily}>
          <option value="">Calibri</option>
          <option value="">Arial</option>
        </select>
      </div>

      <div className={styles.toolbar__row}>
        <select name="" id="" className={styles.toolbar__fontSize}>
          <option value="">14</option>
          <option value="">16</option>
        </select>
        <ButtonEditText icon={faBold} onClick={() => console.log('Bold')} />
        <ButtonEditText icon={faItalic} onClick={() => console.log('Italic')} />
        <ButtonEditText icon={faUnderline} onClick={() => console.log('Underline')} />
        <input type="color" className={styles.toolbar__button} />
      </div>

      <label className={styles.toolbar__label}>Текст</label>
    </div>
  );
}

export default ToolbarText;
