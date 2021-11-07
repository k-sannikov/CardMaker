// import stylesImg from '../../css/canvasBlocks/Img.module.css';
import styles from '../../css/canvasBlocks/Block.module.css';
import { BlockImg } from '../../CardMakerTypes';

type ImgBlockProps = {
  id: number,
  img: BlockImg,
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
}

function ImgBlock(props: ImgBlockProps) {
  const img: BlockImg = props.img;
  let src: string = '';
  if (img.src !== null) {
    src = img.src;
  }

  const imgStyle = {
    width: img.width,
    height: img.height,
    left: img.posX,
    top: img.posY,
  };

  return (
    <img src={src} style={imgStyle}
      id={String(props.id)}
      className={styles.block}
      onClick={props.onClick}
    />
  );
}

export default ImgBlock;
