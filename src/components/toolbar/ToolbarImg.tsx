import styles from '../../css/ToolbarImg.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faGlobe, faStickyNote } from '@fortawesome/free-solid-svg-icons'

import DropdownMenu from '../DropdownMenu';
import { SetOfArtObject } from '../../CardMakerTypes';

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
        <button className={styles.toolbar__button} title="C компьютера">
          <FontAwesomeIcon icon={faDownload} size="lg" />
        </button>
        <button className={styles.toolbar__button} title="Из Pixels">
          <FontAwesomeIcon icon={faGlobe} size="lg" />
        </button>
        <DropdownMenu content={imgList} icon={<FontAwesomeIcon icon={faStickyNote} size="lg" />} />
      </div>
      <label className={styles.toolbar__label}>Изображения</label>
    </div>
  );
}

export default ToolbarImg;
