import styles from './Navbar.module.css';
import { faClone, faUndo, faRedo, faFileExport, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import NavButton from './navButton/NavButton/NavButton';
import NavFileButton from './navButton/NavFileButton/NavFileButton';
import { ReactElement, useRef } from 'react';
import { useImportFileProject } from './useImportFileProject';
import { useStateHistory } from './useStateHistory';
import { connect } from 'react-redux';
import { undo, redo } from '../../../store/actionCreators/historyActionCreators';
import { applyFileProject } from '../../../store/actionCreators/cardMakerActionCreators';
import { CardMaker as CardMakerType, templates } from '../../../store/types';
import { AppDispatch } from '../../../store/store';
import { useExportFileProject } from './useExportFileProject';
import NewProjectButton from './navButton/NewProjectButton/NewProjectButton';
import ExportImgButton from './navButton/ExportImgButton/ExportImgButton';
import DropdownMenu from '../../dropdownMenu/DropdownMenu';
import PreviewTemplate from './previewTemplate/PreviewTemplate';

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
  const downloadFile = useRef<HTMLButtonElement>(null);

  useImportFileProject(inputFile, props.applyFileProject);
  useExportFileProject(downloadFile);


  // формирование списка стикеров
  const srcList = Object.values(templates);
  const previewList: ReactElement[] = [];
  srcList.forEach((tmp, index) => {
    previewList.push(<PreviewTemplate name={tmp.name} srcImg={tmp.preview} srcJson={tmp.json} key={index} />);
  });


  return (
    <>
      <nav className={styles.navbar}>
        <NavFileButton label="Открыть" icon={faFolderOpen} ref={inputFile} />
        <NewProjectButton />
        <ExportImgButton />
        <NavButton label="в json" icon={faFileExport} ref={downloadFile} onClick={null} />
        <DropdownMenu minWidth={450} label="Шаблоны" icon={faClone} sizeIcon='1x'>
          {previewList}
        </DropdownMenu>
        <NavButton label="" icon={faUndo} ref={buttonUndo} onClick={null} />
        <NavButton label="" icon={faRedo} ref={buttonRedo} onClick={null} />
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
