import styles from './Filter.module.css';
import { Canvas as CanvasType, ViewModel as ViewModelType } from '../../../CardMakerTypes';

type FilterProps = {
  canvas: CanvasType
  viewModel: ViewModelType,
}

function Filter(props: FilterProps) {
  const canvas: CanvasType = props.canvas;

  let color: string = '';
  let opacity: number = 0;
  if (props.viewModel.filter) {
    color = props.viewModel.filter.color;
    opacity = props.viewModel.filter.opacity;
  } else {
    color = canvas.filter.color;
    opacity = canvas.filter.opacity;
  }

  const filterStyle = {
    background: color,
    opacity: opacity,
  };

  return (
    <div className={styles.filter} style={filterStyle} id="filter"></div>
  );
}

export default Filter;