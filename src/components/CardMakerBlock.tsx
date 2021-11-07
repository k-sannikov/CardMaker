import '../css/CardMaker.css';
import Header from './Header';
import CanvasElement from './canvasBlocks/CanvasBlock';
import { CardMaker } from "../CardMakerTypes";

type CardMakerProps = {
  cardMaker: CardMaker,
}

function CardMakerBlock(props: CardMakerProps) {
  return (
    <>
      <Header cardMaker={props.cardMaker} />
      <main className="main">
        <CanvasElement cardMaker={props.cardMaker} />
      </main>
    </>
  );
}

export default CardMakerBlock;
