import styles from './Filter.module.css';
import { Canvas as CanvasType, Filter as FilterType } from '../../../store/types';
import { connect } from 'react-redux';
import { RootState } from '../../../store/store';

type FilterProps = {
  canvas: CanvasType
  filter: FilterType | null,
}

function Filter(props: FilterProps) {
  const canvas: CanvasType = props.canvas;

  let color: string = '';
  let opacity: number = 0;
  if (props.filter) {
    color = props.filter.color;
    opacity = props.filter.opacity;
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

function mapStateToProps(state: RootState) {
  return {
    canvas: state.canvas,
    filter: state.viewModel.filter,
  }
};

export default connect(mapStateToProps)(Filter);