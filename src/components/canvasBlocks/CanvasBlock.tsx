import styles from '../../css/canvasBlocks/Canvas.module.css';
import stylesBlock from '../../css/canvasBlocks/Block.module.css';
import type { MouseEvent, ReactElement } from 'react';
import ImgBlock from './ImgBlock'
import TextBlock from './TextBlock'
import ArtObjBlock from './ArtObjBlock'
import FilterBlock from './FilterBlock'
import DeleteAreaBlock from './DeleteAreaBlock'

import { setSelectedComponent, resetSelectedComponent } from '../../CardMakerFunctions';
import { dispatch } from '../../CardMaker';

import {
  Block,
  // ActionHistory,
  // Template,
  // SetOfArtObject,
  BlockArtObj,
  BlockImg,
  BlockText,
  // Block,
  // Component,
  // Background,
  // Filter,
  Canvas,
  CardMaker,
} from '../../CardMakerTypes';

type CanvasBlockProps = {
  cardMaker: CardMaker,
}

function CanvasBlock(props: CanvasBlockProps) {
  // снятие выделения 
  document.onclick = (event) => {
    let block: HTMLElement = event.target as HTMLElement;
    // снять выделение если клик был не по кнопке из списка dontReaction и не по выделенному элементу
    if (Number(block.id) !== props.cardMaker.selectComponent) {
      let selectedBlock: HTMLElement = document.getElementById(String(props.cardMaker.selectComponent)) as HTMLElement;
      selectedBlock?.classList.remove(stylesBlock.selected);
      if (props.cardMaker.selectComponent !== null) {
        dispatch(resetSelectedComponent, Number(block.id));
      }
    }
  }

  // выделение элемента
  const onClickBlock = (event: MouseEvent<HTMLElement>) => {
    if (props.cardMaker.selectComponent !== null) {
      let selectedBlock: HTMLElement = document.getElementById(String(props.cardMaker.selectComponent)) as HTMLElement;
      selectedBlock?.classList.remove(stylesBlock.selected);
    }
    let block: HTMLElement = event.target as HTMLElement;
    block.classList.add(stylesBlock.selected);
    dispatch(setSelectedComponent, Number(block.id));
  }

  const canvas: Canvas = props.cardMaker.canvas;
  let background: string = '#fff';
  if (canvas.background.color !== null) {
    background = canvas.background.color;
  } else if (canvas.background.src !== null) {
    background = 'url(' + canvas.background.src + ')';
  }

  const canvasStyle = {
    width: canvas.width,
    height: canvas.height,
    background: background,
  };

  let listBlock: ReactElement[] = [];
  canvas.listBlock.forEach((block: Block) => {
    switch (block.type) {
      case 'text':
        listBlock.push(<TextBlock text={block as BlockText}
          key={block.id}
          id={block.id}
          onClick={onClickBlock} />);
        break;
      case 'img':
        listBlock.push(<ImgBlock img={block as BlockImg}
          key={block.id}
          id={block.id}
          onClick={onClickBlock} />);
        break;
      case 'artObj':
        listBlock.push(<ArtObjBlock artObj={block as BlockArtObj}
          key={block.id}
          id={block.id}
          onClick={onClickBlock} />);
        break;
    }
  });

  return (
    <div id="canvas" className={styles.canvas} style={canvasStyle}>
      {canvas.deleteArea !== null &&
        <DeleteAreaBlock canvas={canvas} />
      }
      <FilterBlock canvas={canvas} />
      {listBlock}
    </div>
  );
}

export default CanvasBlock;