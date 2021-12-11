import styles from './ArtObj.module.css';
import { ArtObj as ArtObjType } from '../../../store/types';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';
import { useResize } from '../useResize';

type ArtObjProps = {
  artObj: ArtObjType,
}

function ArtObj(props: ArtObjProps) {
  const artObj: ArtObjType = props.artObj;
  const artObjBlock = useRef<HTMLDivElement>(null);
  const artObjStyle = getStyle(artObj);
  const selectId = useStateBlock(props.artObj.id, artObjBlock);
  const select: string = props.artObj.id === selectId ? styles.selected : '';
  useDragAndDrop(artObjBlock, {
    x: artObj.x,
    y: artObj.y
  });

  const point = useRef<HTMLDivElement>(null);

  useResize(point, artObjBlock, {
    x: artObj.x,
    y: artObj.y
  },
    {
      width: artObj.width,
      height: artObj.height,
    });

  return (
    <div
      className={styles.block + ' ' + select}
      style={artObjStyle}
      ref={artObjBlock}
    >
      <img src={artObj.src}
        alt=''
        className={styles.img}
      />
      <div className={styles.pointBottomRight} ref={point}></div>
    </div>
  );
}

function getStyle(artObj: ArtObjType) {
  return {
    width: artObj.width,
    height: artObj.height,
    left: artObj.x,
    top: artObj.y,
  };
}

export default ArtObj;
