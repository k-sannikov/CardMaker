import styles from './Canvas.module.css';
import { ReactElement } from 'react';
import Img from './img/Img'
import Text from './text/Text'
import ArtObj from './artObj/ArtObj'
import Filter from './filter/Filter'
import DeleteArea from './deleteArea/DeleteArea'
import {
  Block as BlockType,
  ArtObj as ArtObjType,
  Img as ImgType,
  Text as TextType,
  Canvas as CanvasType,
  CardMaker as CardMakerType,
} from '../../CardMakerTypes';

type CanvasProps = {
  cardMaker: CardMakerType,
}

function Canvas(props: CanvasProps) {
  const canvas: CanvasType = props.cardMaker.canvas;
  let background: string = '#fff';
  if (canvas.background.color) {
    background = canvas.background.color;
  } else if (canvas.background.src) {
    background = 'url(' + canvas.background.src + ')';
  }

  const canvasStyle = {
    width: canvas.width,
    height: canvas.height,
    background: background,
  };


  let listBlock: ReactElement[] = getListBlock(canvas.listBlock);
  return (
    <div id="canvas" className={styles.canvas} style={canvasStyle}>
      {canvas.deleteArea &&
        <DeleteArea canvas={canvas} />
      }
      <Filter canvas={canvas} />
      {listBlock}
    </div>
  );
}

function getListBlock(listBlock: BlockType[]): ReactElement[] {
  let newListBlock: ReactElement[] = [];
  listBlock.forEach((block: BlockType) => {
    switch (block.type) {
      case 'text':
        newListBlock.push(<Text text={block as TextType}
          key={block.id} />);
        break;
      case 'img':
        newListBlock.push(<Img img={block as ImgType}
          key={block.id} />);
        break;
      case 'artObj':
        newListBlock.push(<ArtObj artObj={block as ArtObjType}
          key={block.id} />);
        break;
    }
  });
  return newListBlock;
}

export default Canvas;