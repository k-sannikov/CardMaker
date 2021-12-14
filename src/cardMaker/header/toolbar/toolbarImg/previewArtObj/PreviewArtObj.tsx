import styles from './PreviewArtObj.module.css';
import { useCreateArtObj } from './useCreateArtObj';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { createArtObjBlock } from '../../../../../store/actionCreators/artObjBlockActionCreators';

type PreviewArtObjProps = {
  src: string,
  createArtObjBlock: (src: string) => void,
}

function PreviewArtObj(props: PreviewArtObjProps) {

  const img = useRef<HTMLImageElement>(null);
  useCreateArtObj(img, props.src, props.createArtObjBlock);
  return (
    <img src={props.src} alt='' ref={img} className={styles.sticker} />
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    createArtObjBlock: (src: string) => dispatch(createArtObjBlock(src)),
  }
}

export default connect(null, mapDispatchToProps)(PreviewArtObj);