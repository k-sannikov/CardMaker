import styles from './Img.module.css';
import { Img as ImgType } from '../../../CardMakerTypes';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';
import { useResize } from '../useResize';

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
    x: img.x,
    y: img.y
  });

  const point = useRef<HTMLDivElement>(null);
  useResize(point, imgBlock, {
    x: img.x,
    y: img.y
  },
    {
      width: img.width,
      height: img.height,
    });

  return (
    <div
      className={styles.block + ' ' + select}
      style={imgStyle}
      ref={imgBlock}
    >
      <img src={src}
        alt=''
        className={styles.img}
      />
      <div className={styles.pointBottomRight} ref={point}></div>
    </div>
  );
}

function getStyle(img: ImgType) {
  return {
    width: img.width,
    height: img.height,
    left: img.x,
    top: img.y,
  };
}

export default Img;
