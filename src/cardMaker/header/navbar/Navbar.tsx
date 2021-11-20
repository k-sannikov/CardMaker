import styles from './Navbar.module.css';
import { faClone, faUndo, faRedo, faFileExport, faImage, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { faPiedPiperSquare } from '@fortawesome/free-brands-svg-icons'
import NavButton from './navButton/NavButton';
import NavLinkButton from './navButton/NavLinkButton';
import NavFileButton from './navButton/NavFileButton';
import { RefObject, useRef } from 'react';
import { useFileProject } from './useFileProject';
import { useHistory } from './useHistory';

function Navbar() {
  let buttonUndo = useRef<HTMLButtonElement>(null);
  let buttonRedo = useRef<HTMLButtonElement>(null);
  useHistory(buttonUndo, buttonRedo);

  let inputFile = useRef<HTMLInputElement>(null);
  let downloadFile = useRef<HTMLAnchorElement>(null);
  useFileProject(inputFile, downloadFile);

  return (
    <nav className={styles.navbar}>
      <NavFileButton label="Открыть" icon={faFolderOpen} ref={inputFile as RefObject<HTMLInputElement>} />
      <NavButton label="Новая" icon={faPiedPiperSquare} />
      <NavButton label="в jpg/png" icon={faImage} />
      <NavLinkButton label="в json" icon={faFileExport} ref={downloadFile as RefObject<HTMLAnchorElement>} />
      <NavButton label="Шаблоны" icon={faClone} />
      <NavButton label="" icon={faUndo} ref={buttonUndo} />
      <NavButton label="" icon={faRedo} ref={buttonRedo} />
    </nav>
  );
}

export default Navbar;
