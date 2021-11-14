import styles from './Navbar.module.css';
import { faClone, faUndo, faRedo, faFileExport, faImage } from '@fortawesome/free-solid-svg-icons'
import { faPiedPiperSquare } from '@fortawesome/free-brands-svg-icons'
import NavButton from './navButton/NavButton';
import { dispatch } from '../../../CardMaker';
import { undo, redo } from '../../../CardMakerFunctions';

function Navbar() {

  function onClickUndo() {
    dispatch(undo);
  }

  function onClickRedo() {
    dispatch(redo);
  }

  return (
    <nav className={styles.navbar}>
      <NavButton label="Новая" icon={faPiedPiperSquare} onClick={() => console.log('Новая')}/>
      <NavButton label="в jpg/png" icon={faImage} onClick={() => console.log('Сохранить как')}/>
      <NavButton label="в json" icon={faFileExport} onClick={() => console.log('Сохранить как')}/>
      <NavButton label="Шаблоны" icon={faClone} onClick={() => console.log('Шаблоны')}/>
      <NavButton label="" icon={faUndo} onClick={() => onClickUndo()} />
      <NavButton label="" icon={faRedo} onClick={() => onClickRedo()} />
    </nav>
  );
}

export default Navbar;
