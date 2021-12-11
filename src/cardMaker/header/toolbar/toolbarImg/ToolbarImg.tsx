import styles from './ToolbarImg.module.css';
import { faDownload, faGlobe, faStickyNote } from '@fortawesome/free-solid-svg-icons'

import DropdownMenu from '../../../dropdownMenu/DropdownMenu';
import AddImgButton from './addImgButton/AddImgButton';
import AddImgButtonFile from './addImgButtonFile/AddImgButtonFile';
import PreviewArtObj from './previewArtObj/PreviewArtObj';
import { SetOfArtObject } from '../../../../store/types';
import { useCreateImg } from './useCreateImg';

import { ReactElement } from 'react';
import { useRef } from 'react';

function ToolbarImg() {

  // формирование списка стикеров
  let srcList: SetOfArtObject[] = Object.values(SetOfArtObject);
  let imgList: ReactElement[] = [];
  srcList.forEach((src, index) => {
    imgList.push(<PreviewArtObj src={src} key={index} />);
  });

  const inputFile = useRef<HTMLInputElement>(null);
  useCreateImg(inputFile);

  return (
    <div className={styles.toolbar}>
      <div className={styles.button_box}>
        <AddImgButtonFile label="" title="C компьютера" icon={faDownload} ref={inputFile} />
        <AddImgButton label="" title="Из Pixels" icon={faGlobe} />
        <DropdownMenu label="" icon={faStickyNote} content={imgList} />
      </div>
      <label className={styles.toolbar__label}>Изображения</label>
    </div>
  );
}

export default ToolbarImg;
