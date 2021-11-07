import styles from '../css/Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faClone, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'
import { faPiedPiperSquare } from '@fortawesome/free-brands-svg-icons'
import { dispatch, getCardMaker } from '../CardMaker';
import { undo, redo } from '../CardMakerFunctions';

function Navbar() {

  function onClickUndo() {
    let cardMaker = getCardMaker();
    let length = cardMaker.history.listState.length;
    let index = cardMaker.history.currentIndex;
    if (length > 1 && index > 0) {
      dispatch(undo);
    }
  }

  function onClickRedo() {
    let cardMaker = getCardMaker();
    let length = cardMaker.history.listState.length;
    let index = cardMaker.history.currentIndex;
    if (index + 1 < length) {
      dispatch(redo);
    }
  }

  return (
    <nav className={styles.navbar}>
      <button className={styles.navbar__button}>
        <FontAwesomeIcon icon={faPiedPiperSquare} />
        <span className={styles.navbar__button_text}>Новая</span>
      </button>
      <button className={styles.navbar__button}>
        <FontAwesomeIcon icon={faFileImage} />
        <span className={styles.navbar__button_text}>Сохранить как...</span>
      </button>

      <button className={styles.navbar__button}>
        <FontAwesomeIcon icon={faClone} />
        <span className={styles.navbar__button_text}>Шаблоны</span>
      </button>

      <button className={styles.navbar__button} onClick={() => onClickUndo()}>
        <FontAwesomeIcon icon={faUndo} />
      </button>
      <button className={styles.navbar__button} onClick={() => onClickRedo()}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </nav>
  );
}

export default Navbar;
