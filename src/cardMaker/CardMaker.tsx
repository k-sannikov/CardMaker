import styles from './CardMaker.module.css';
import Header from './header/Header';
import Canvas from './canvas/Canvas';
import { connect } from 'react-redux';

function CardMaker() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Canvas />
      </main>
    </>
  );
}

export default connect()(CardMaker);
