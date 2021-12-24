import styles from './Navbar.module.css';
import { faClone, faUndo, faRedo, faFileExport, faImage, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import NavButton from './navButton/NavButton/NavButton';
import NavLinkButton from './navButton/NavLinkButton/NavLinkButton';
import NavFileButton from './navButton/NavFileButton/NavFileButton';
import { RefObject, useRef } from 'react';
import { useImportFileProject } from './useImportFileProject';
import { useStateHistory } from './useStateHistory';
import { connect } from 'react-redux';
import { undo, redo } from '../../../store/actionCreators/historyActionCreators';
import { applyFileProject } from '../../../store/actionCreators/cardMakerActionCreators';
import { CardMaker as CardMakerType } from '../../../store/types';
import { AppDispatch } from '../../../store/store';
import { useExportFileProject } from './useExportFileProject';
import NewProjectButton from './navButton/NewProjectButton/NewProjectButton';

type NavbarProps = {
  undo: () => void,
  redo: () => void,
  applyFileProject: (file: CardMakerType) => void,
}

function Navbar(props: NavbarProps) {
  const buttonUndo = useRef<HTMLButtonElement>(null);
  const buttonRedo = useRef<HTMLButtonElement>(null);
  useStateHistory(
    buttonUndo,
    buttonRedo,
    props.undo,
    props.redo,
  );

  const inputFile = useRef<HTMLInputElement>(null);
  const downloadFile = useRef<HTMLAnchorElement>(null);

  useImportFileProject(inputFile, props.applyFileProject);
  useExportFileProject(downloadFile);


  return (
    <>
      <nav className={styles.navbar}>
        <NavFileButton label="Открыть" icon={faFolderOpen} ref={inputFile as RefObject<HTMLInputElement>} />
        <NewProjectButton />
        <NavButton label="в jpg/png" icon={faImage} />
        <NavLinkButton label="в json" icon={faFileExport} ref={downloadFile as RefObject<HTMLAnchorElement>} />
        <NavButton label="Шаблоны" icon={faClone} />
        <NavButton label="" icon={faUndo} ref={buttonUndo} />
        <NavButton label="" icon={faRedo} ref={buttonRedo} />
      </nav>
    </>
  );
}
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo()),
    applyFileProject: (file: CardMakerType) => dispatch(applyFileProject(file)),
  }
}

export default connect(null, mapDispatchToProps)(Navbar);
