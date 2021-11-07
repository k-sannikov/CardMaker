import styles from '../css/Header.module.css';
import Navbar from './Navbar';
import Toolbar from './toolbar/Toolbar';
import { CardMaker } from '../CardMakerTypes';

type HeaderProps = {
  cardMaker: CardMaker,
}
function Header(props: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.panel}>
        <Navbar />
        <Toolbar cardMaker={props.cardMaker} />
      </div>
    </header >
  );
}

export default Header;
