import stylesDeleteArea from '../../css/canvasBlocks/DeleteArea.module.css';
import styles from '../../css/canvasBlocks/Block.module.css';
import { ReactElement } from 'react';
import { DeleteArea, Canvas } from '../../CardMakerTypes';

type DeleteAreaBlockProps = { canvas: Canvas }

function DeleteAreaBlock(props: DeleteAreaBlockProps) {
  const canvas: Canvas = props.canvas;


  let listBlock: ReactElement[] = [];
  canvas.deleteArea.forEach((block: DeleteArea, index: number) => {
    const deleteAreaBlockStyle = {
      width: block.width as number,
      height: block.height as number,
      left: block.posX as number,
      top: block.posY as number,
    };

    listBlock.push(
    <div className={styles.block + ' ' + stylesDeleteArea.deleteArea} key={index}
    style={deleteAreaBlockStyle}></div>);
  });



  return (
    <>
      {listBlock}
    </>
  );
}

export default DeleteAreaBlock;



