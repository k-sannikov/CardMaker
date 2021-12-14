import styles from './Filter.module.css';
import { Canvas as CanvasType, ViewModel as ViewModelType } from '../../../store/types';
import { connect } from 'react-redux';
import { RootState } from '../../../store/store';

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

function mapStateToProps(state: RootState) {
  return {
    canvas: state.canvas,
    viewModel: state.viewModel,
  }
};

export default connect(mapStateToProps)(Filter);