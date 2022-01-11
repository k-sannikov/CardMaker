import styles from "./Img.module.css";
import { Img as ImgType } from "../../../store/types";
import { useRef } from "react";
import { useStateBlock } from "../useStateBlock";
import { useDragAndDrop } from "../useDragAndDrop";
import { useResize } from "../useResize";
import { connect } from "react-redux";
import { resetSelectedBlock, setPositionBlock, setSelectedBlock, setSizeBlock } from "../../../store/actionCreators/blockActionCreators";
import { AppDispatch, RootState } from "../../../store/store";

type ImgProps = {
  img: ImgType,
  selectBlock: string | null,
  setSizeBlock: (width: number, height: number) => void,
  setPositionBlock: (x: number, y: number) => void,
  setSelectedBlock: (id: string) => void,
  resetSelectedBlock: () => void,
}

function Img(props: ImgProps) {
  const img: ImgType = props.img;
  let src: string = "";
  if (img.src) {
    src = img.src;
  }
  const imgStyle = getStyle(img);
  const imgBlock = useRef<HTMLImageElement>(null);


  const pointLT = useRef<HTMLDivElement>(null);
  const pointRT = useRef<HTMLDivElement>(null);
  const pointLB = useRef<HTMLDivElement>(null);
  const pointRB = useRef<HTMLDivElement>(null);

  useStateBlock(img.id, imgBlock, props.setSelectedBlock, props.resetSelectedBlock);
  useDragAndDrop(imgBlock, { x: img.x, y: img.y }, props.setPositionBlock);
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

  const select: string = img.id === props.selectBlock ? styles.selected : "";

  return (
    <div
      className={`${styles.block} ${select}`}
      style={imgStyle}
      ref={imgBlock}
      onDragStart={(e) => e.preventDefault() }
    >
      <div className={styles.pointTopLeft} ref={pointLT}></div>
      <div className={styles.pointTopRight} ref={pointRT}></div>
      <img src={src}
        alt=""
        className={styles.img}
      />
      <div className={styles.pointBottomLeft} ref={pointLB}></div>
      <div className={styles.pointBottomRight} ref={pointRB}></div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  selectBlock: state.selectBlock,
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setPositionBlock: (x: number, y: number) => dispatch(setPositionBlock(x, y)),
    setSizeBlock: (width: number, height: number) => dispatch(setSizeBlock(width, height)),
    setSelectedBlock: (id: string) => dispatch(setSelectedBlock(id)),
    resetSelectedBlock: () => dispatch(resetSelectedBlock()),
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
