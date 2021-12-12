import styles from './Img.module.css';
import { Img as ImgType } from '../../../store/types';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';
import { useResize } from '../useResize';
import { connect } from 'react-redux';
import { setPositionBlock, setSizeBlock } from '../../../store/actionCreators/blockActionCreators';

type ImgProps = {
  img: ImgType,
  setSizeBlock: (width: number, height: number) => any,
  setPositionBlock: (x: number, y: number) => any,
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
  useDragAndDrop(imgBlock, { x: img.x, y: img.y }, props.setPositionBlock);

  const pointLT = useRef<HTMLDivElement>(null);
  const pointRT = useRef<HTMLDivElement>(null);
  const pointLB = useRef<HTMLDivElement>(null);
  const pointRB = useRef<HTMLDivElement>(null);
  
  useResize(
    props.setSizeBlock,
    props.setPositionBlock,
    pointLT,
    pointRT,
    pointLB,
    pointRB,
    imgBlock,
    { x: img.x, y: img.y },
    { width: img.width, height: img.height }
  );

  return (
    <div
      className={styles.block + ' ' + select}
      style={imgStyle}
      ref={imgBlock}
    >
      <div className={styles.pointTopLeft} ref={pointLT}></div>
      <div className={styles.pointTopRight} ref={pointRT}></div>
      <img src={src}
        alt=''
        className={styles.img}
      />
      <div className={styles.pointBottomLeft} ref={pointLB}></div>
      <div className={styles.pointBottomRight} ref={pointRB}></div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  selectBlock: state.selectBlock,
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPositionBlock: (x: number, y: number) => dispatch(setPositionBlock(x, y)),
    setSizeBlock: (width: number, height: number) => dispatch(setSizeBlock(width, height)),
  }
}

function getStyle(img: ImgType) {
  return {
    width: img.width,
    height: img.height,
    left: img.x,
    top: img.y,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Img);
