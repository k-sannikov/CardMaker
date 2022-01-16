import styles from "./CardMaker.module.css";
import Header from "./header/Header";
import Canvas from "./canvas/Canvas";
import { connect } from "react-redux";
import Toolbar from "./toolbar/Toolbar";

function CardMaker() {
  return (
    <>
      <main className={styles.main}>
        <Canvas />
      </main>
      <Header />
      <Toolbar />
    </>
  );
}

export default connect()(CardMaker);
