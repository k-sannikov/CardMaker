import styles from '../../css/ToolbarFilter.module.css';

import { setFilter } from '../../CardMakerFunctions';
import { dispatch } from '../../CardMaker';
import { Canvas } from '../../CardMakerTypes';

import { useEffect } from 'react';

type ToolbarFilterProps = {
  canvas: Canvas,
}

function ToolbarFilter(props: ToolbarFilterProps) {
  useEffect(() => {
    let filterColorInputElement: HTMLInputElement = document.getElementById("filter-color") as HTMLInputElement;
    filterColorInputElement.value = props.canvas.filter.color;
    let filterOpacityInputElement: HTMLInputElement = document.getElementById("filter-opacity") as HTMLInputElement;
    filterOpacityInputElement.value = String(props.canvas.filter.opacity);
  });

  const onChangeFilter = () => {
    let filterDivElement: HTMLDivElement = document.getElementById('filter') as HTMLDivElement;
    const filterOpacityInputElement: HTMLInputElement = document.getElementById('filter-opacity') as HTMLInputElement;
    const filterColorInputElement: HTMLInputElement = document.getElementById('filter-color') as HTMLInputElement;
    const opacity: string = filterOpacityInputElement.value;
    const color: string = filterColorInputElement.value;
    filterDivElement.style.opacity = opacity;
    filterDivElement.style.background = color;
  }

  const onBlurFilter = () => {
    const filterOpacityInputElement: HTMLInputElement = document.getElementById('filter-opacity') as HTMLInputElement;
    const filterColorInputElement: HTMLInputElement = document.getElementById('filter-color') as HTMLInputElement;
    const opacity: string = filterOpacityInputElement.value;
    const color: string = filterColorInputElement.value;
    dispatch(setFilter, { color, opacity });
  }

  return (
    <div className={styles.toolbar}>
      <input type="color" name="" id="filter-color" className={styles.input_color}
        onBlur={onBlurFilter}
        onChange={onChangeFilter}
      />
      <input type="range" id="filter-opacity" name="" min="0" max="0.5" step="0.05" className={styles.input_range}
        onBlur={onBlurFilter}
        onChange={onChangeFilter}
      />
      <h2 className={styles.toolbar__label}>Фильтр</h2>
    </div>
  );
}

export default ToolbarFilter;
