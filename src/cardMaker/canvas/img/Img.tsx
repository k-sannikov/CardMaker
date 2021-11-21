import styles from './Img.module.css';
import { Img as ImgType } from '../../../CardMakerTypes';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';

type ImgProps = {
  img: ImgType,
}

function Img(props: ImgProps) {
  const img: ImgType = props.img;
  let src: string = '';
  if (img.src) {
    src = img.src;
  }
  const imgStyle = getStyle(img);
  const imgBlock = useRef<HTMLImageElement>(null);
  const selectId = useStateBlock(props.img.id, imgBlock);
  const select: string = props.img.id === selectId ? styles.selected : '';
  useDragAndDrop(imgBlock, {
    x: img.posX,
    y: img.posY
  });
  return (
    <img style={imgStyle}
      alt=''
      src={src}
      ref={imgBlock}
      draggable = "false"
      className={styles.block + ' ' + select} />
  );
}

function getStyle(img: ImgType) {
  return {
    width: img.width,
    height: img.height,
    left: img.posX,
    top: img.posY,
  };
}

export default Img;
