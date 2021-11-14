import styles from './Header.module.css';
import Navbar from './navbar/Navbar';
import Toolbar from './toolbar/Toolbar';

function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.panel}>
        <Navbar />
        <Toolbar />
      </div>
    </header >
  );
}

export default Header;
