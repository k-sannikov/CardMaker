import { connect } from "react-redux";
import styles from "./TopToolbar.module.css";
import Navbar from "./navbar/Navbar";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.mainLabel}>Card Maker</div>
      <Navbar />
    </header >
  );
}

export default connect()(Header);
