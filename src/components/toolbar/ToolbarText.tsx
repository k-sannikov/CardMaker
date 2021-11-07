import styles from '../../css/ToolbarText.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons'

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

        <button className={styles.toolbar__button}>
          <FontAwesomeIcon icon={faBold} />
        </button>

        <button className={styles.toolbar__button}>
          <FontAwesomeIcon icon={faItalic} />
        </button>

        <button className={styles.toolbar__button}>
          <FontAwesomeIcon icon={faUnderline} />
        </button>

        <input type="color" className={styles.toolbar__button} />
      </div>
      <label className={styles.toolbar__label}>Текст</label>
    </div>
  );
}

export default ToolbarText;
