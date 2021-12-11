import styles from './CardMaker.module.css';
import Header from './header/Header';
import Canvas from './canvas/Canvas';
import { CardMaker as CardMakerType } from "../CardMakerTypes";

type CardMakerProps = {
  cardMaker: CardMakerType,
}

function CardMaker(props: CardMakerProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Canvas canvas={props.cardMaker.canvas} viewModel={props.cardMaker.viewModel} />
      </main>
    </>
  );
}

export default CardMaker;
