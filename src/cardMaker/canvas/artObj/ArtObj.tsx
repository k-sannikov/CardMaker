import styles from './ArtObj.module.css';
import { ArtObj as ArtObjType } from '../../../store/types';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';
import { useResize } from '../useResize';
import { resetSelectedBlock, setPositionBlock, setSelectedBlock, setSizeBlock } from '../../../store/actionCreators/blockActionCreators';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';

type ArtObjProps = {
  artObj: ArtObjType,
  selectBlock: string | null,
  setSizeBlock: (width: number, height: number) => void,
  setPositionBlock: (x: number, y: number) => void,
  setSelectedBlock: (id: string) => void,
  resetSelectedBlock: () => void,
}

function ArtObj(props: ArtObjProps) {
  const artObj: ArtObjType = props.artObj;
  const artObjBlock = useRef<HTMLDivElement>(null);
  const artObjStyle = getStyle(artObj);

  const pointLT = useRef<HTMLDivElement>(null);
  const pointRT = useRef<HTMLDivElement>(null);
  const pointLB = useRef<HTMLDivElement>(null);
  const pointRB = useRef<HTMLDivElement>(null);

  useStateBlock(props.artObj.id, artObjBlock, props.setSelectedBlock, props.resetSelectedBlock);
  useDragAndDrop(artObjBlock, { x: artObj.x, y: artObj.y }, props.setPositionBlock);
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
  
  const select: string = props.artObj.id === props.selectBlock ? styles.selected : '';

  return (
    <div
      className={styles.block + ' ' + select}
      style={artObjStyle}
      ref={artObjBlock}
      onDragStart={(e) => e.preventDefault() }
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

function getStyle(artObj: ArtObjType) {
  return {
    width: artObj.width,
    height: artObj.height,
    left: artObj.x,
    top: artObj.y,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtObj);
