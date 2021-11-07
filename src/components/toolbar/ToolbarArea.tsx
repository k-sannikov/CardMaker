import styles from '../../css/ToolbarArea.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVectorSquare, faEraser } from '@fortawesome/free-solid-svg-icons'

function ToolbarArea() {
  return (
    <div className={styles.toolbar}>
      <button className={styles.toolbar__button}>
        <FontAwesomeIcon icon={faVectorSquare} />
        <span className={styles.toolbar__button_text}>Выделение</span>
      </button>
      <button className={styles.toolbar__button}>
        <FontAwesomeIcon icon={faEraser} />
        <span className={styles.toolbar__button_text}>Удаление</span>
      </button>
      <h2 className={styles.toolbar__label}>Область</h2>
    </div>
  );
}

export default ToolbarArea;
