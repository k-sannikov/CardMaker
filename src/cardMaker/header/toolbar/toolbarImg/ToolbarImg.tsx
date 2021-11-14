import styles from './ToolbarImg.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faGlobe, faStickyNote } from '@fortawesome/free-solid-svg-icons'

import DropdownMenu from '../../../dropdownMenu/DropdownMenu';
import AddImgButton from './addImgButton/AddImgButton';
import { SetOfArtObject } from '../../../../CardMakerTypes';

import { ReactElement } from 'react';

function ToolbarImg() {

  // формирование списка стикеров
  let srcList: SetOfArtObject[] = Object.values(SetOfArtObject);
  let imgList: ReactElement[] = [];
  srcList.forEach((src, index) => {
    imgList.push(<img src={src} key={index} className={styles.sticker} />);
  });

  return (
    <div className={styles.toolbar}>
      <div className={styles.button_box}>
        <AddImgButton label="" title="C компьютера" icon={faDownload} onClick={() => console.log('C компьютера')}/>
        <AddImgButton label="" title="Из Pixels" icon={faGlobe} onClick={() => console.log('Из Pixels')}/>
        <DropdownMenu label="" icon={faStickyNote} content={imgList}  />
      </div>
      <label className={styles.toolbar__label}>Изображения</label>
    </div>
  );
}

export default ToolbarImg;
