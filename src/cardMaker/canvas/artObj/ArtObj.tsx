import styles from './ArtObj.module.css';
import { ArtObj as ArtObjType } from '../../../CardMakerTypes';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';

type ArtObjProps = {
  artObj: ArtObjType,
}

function ArtObj(props: ArtObjProps) {
  const artObj: ArtObjType = props.artObj;
  const artObjStyle = getStyle(artObj);
  const artObjBlock = useRef<HTMLImageElement>(null);
  const selectId = useStateBlock(props.artObj.id, artObjBlock);
  const select: string = props.artObj.id === selectId ? styles.selected : '';


  return (
    <img src={artObj.src} style={artObjStyle}
      alt=''
      ref={artObjBlock}
      className={styles.block + ' ' + select}
    />
  );
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
