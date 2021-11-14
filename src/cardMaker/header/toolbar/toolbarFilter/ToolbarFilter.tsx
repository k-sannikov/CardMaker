import styles from './ToolbarFilter.module.css';

import { setFilter } from '../../../../CardMakerFunctions';
import { dispatch } from '../../../../CardMaker';
import { CardMaker as CardMakerType, Filter as FilterType } from '../../../../CardMakerTypes';
import { CardMakerContext } from '../../../../CardMakerContext';
import ColorPicker from '../colorPicker/ColorPicker';
import { useContext, useEffect, useRef } from 'react';

function ToolbarFilter() {
  const inputColor: any = useRef(null);
  const inputRange: any = useRef(null);

  const cardMaker: CardMakerType = useContext(CardMakerContext);
  const filter: FilterType = cardMaker.canvas.filter;

  useEffect(() => {
    inputColor.current.value = filter.color;
    inputRange.current.value = String(filter.opacity);
  }, [filter]);

  const onChangeFilter = () => {
    let filterDivElement: HTMLDivElement = document.getElementById('filter') as HTMLDivElement;
    const opacity: string = inputRange.current.value;
    const color: string = inputColor.current.value;
    filterDivElement.style.opacity = opacity;
    filterDivElement.style.background = color;
  }

  const onBlurFilter = () => {
    const opacity: string = inputRange.current.value;
    const color: string = inputColor.current.value;
    dispatch(setFilter, { color, opacity });
  }

  return (
    <div className={styles.toolbar}>
      <ColorPicker
        ref={inputColor}
        onChange={onChangeFilter}
        onBlur={onBlurFilter}
      />
      <input type="range" min="0" max="0.5" step="0.05" className={styles.input_range}
        ref={inputRange}
        onBlur={onBlurFilter}
        onChange={onChangeFilter}
      />
      <h2 className={styles.toolbar__label}>Фильтр</h2>
    </div>
  );
}

export default ToolbarFilter;
