// import stylesArtObj from '../../css/canvasBlocks/ArtObj.module.css';
import styles from '../../css/canvasBlocks/Block.module.css';
import { BlockArtObj } from '../../CardMakerTypes';

type ArtObjBlockProps = {
  id: number,
  artObj: BlockArtObj,
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
}

function ArtObjBlock(props: ArtObjBlockProps) {
  const artObj: BlockArtObj = props.artObj;
  const artObjStyle = {
    width: artObj.width,
    height: artObj.height,
    left: artObj.posX,
    top: artObj.posY,
  };

  return (
    <img src={artObj.src} style={artObjStyle}
      id={String(props.id)}
      className={styles.block}
      onClick={props.onClick}
    />
  );
}

export default ArtObjBlock;
