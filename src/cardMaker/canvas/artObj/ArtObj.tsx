import styles from './ArtObj.module.css';
import { ArtObj as ArtObjType } from '../../../CardMakerTypes';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';
import { useResize } from '../useResize';

type ArtObjProps = {
  artObj: ArtObjType,
}

function ArtObj(props: ArtObjProps) {
  const artObj: ArtObjType = props.artObj;
  const artObjBlock = useRef<HTMLImageElement>(null);
  const artObjStyle = getStyle(artObj);
  const selectId = useStateBlock(props.artObj.id, artObjBlock);
  const select: string = props.artObj.id === selectId ? styles.selected : '';
  useDragAndDrop(artObjBlock, {
    x: artObj.posX,
    y: artObj.posY
  });

  // useResize(artObjBlock, {
  //   x: artObj.posX,
  //   y: artObj.posY
  // },
  // {
  //   width: artObj.width,
  //   height: artObj.height,
  // });
  
  return (
    <img src={artObj.src} style={artObjStyle}
      alt=''
      ref={artObjBlock}
      className={styles.block + ' ' + select}
      draggable="false"
    />
  );
}

type posType = {
  x: number,
  y: number,
}

function getStyle(artObj: ArtObjType) {
  return {
    width: artObj.width,
    height: artObj.height,
    left: artObj.posX,
    top: artObj.posY,
  };
}

export default ArtObj;
