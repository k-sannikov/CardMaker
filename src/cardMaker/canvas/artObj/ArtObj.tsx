import styles from './ArtObj.module.css';
import { ArtObj as ArtObjType } from '../../../store/types';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';
import { useResize } from '../useResize';
import { setPositionBlock, setSizeBlock } from '../../../store/actionCreators/blockActionCreators';
import { connect } from 'react-redux';

type ArtObjProps = {
  artObj: ArtObjType,
  setSizeBlock: (width: number, height: number) => any,
  setPositionBlock: (x: number, y: number) => any,
}

function ArtObj(props: ArtObjProps) {
  const artObj: ArtObjType = props.artObj;
  const artObjBlock = useRef<HTMLDivElement>(null);
  const artObjStyle = getStyle(artObj);
  const selectId = useStateBlock(props.artObj.id, artObjBlock);
  const select: string = props.artObj.id === selectId ? styles.selected : '';
  useDragAndDrop(artObjBlock, { x: artObj.x, y: artObj.y }, props.setPositionBlock);

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
    artObjBlock,
    { x: artObj.x, y: artObj.y },
    { width: artObj.width, height: artObj.height }
  );

  return (
    <div
      className={styles.block + ' ' + select}
      style={artObjStyle}
      ref={artObjBlock}
    >
      <div className={styles.pointTopLeft} ref={pointLT}></div>
      <div className={styles.pointTopRight} ref={pointRT}></div>
      <img src={artObj.src}
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

function getStyle(artObj: ArtObjType) {
  return {
    width: artObj.width,
    height: artObj.height,
    left: artObj.x,
    top: artObj.y,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtObj);
