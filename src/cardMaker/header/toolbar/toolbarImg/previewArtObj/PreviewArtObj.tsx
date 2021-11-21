import styles from './PreviewArtObj.module.css';
import { useCreateArtObj } from './useCreateArtObj';
import { useRef } from 'react';

type PreviewArtObjProps = {
  src: string,
}

function PreviewArtObj(props: PreviewArtObjProps) {

  const img = useRef<HTMLImageElement>(null);
  useCreateArtObj(img, props.src);
  return (
    <img src={props.src} alt='' ref={img} className={styles.sticker} />
  );
}

export default PreviewArtObj