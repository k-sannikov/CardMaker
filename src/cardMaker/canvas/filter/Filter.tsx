import styles from './Filter.module.css';
import { Canvas as CanvasType } from '../../../CardMakerTypes';

type FilterProps = { canvas: CanvasType }

function Filter(props: FilterProps) {
  const canvas: CanvasType = props.canvas;

  const filterStyle = {
    background: canvas.filter.color,
    opacity: canvas.filter.opacity,
  };

  return (
    <div className={styles.filter} style={filterStyle} id="filter"></div>
  );
}

export default Filter;