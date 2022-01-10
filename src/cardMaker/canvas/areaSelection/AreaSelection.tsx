import styles from './AreaSelection.module.css';
import { Area } from '../../../store/types';
import { connect } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { useDragAndDrop } from '../useDragAndDrop';
import { areaSelection, resetAreaSelection, setPositionAreaSelection } from '../../../store/actionCreators/canvasActionCreators';
import { ForwardedRef, forwardRef, RefObject } from 'react';

type AreaSelectionProps = {
  area: Area,
  areaSelection: (x: number, y: number, width: number, height: number) => void,
  resetAreaSelection: () => void,
  setPositionAreaSelection: (x: number, y: number) => void,
}

  const AreaSelection = forwardRef((props: AreaSelectionProps, ref: ForwardedRef<HTMLDivElement>) => {

  useDragAndDrop(ref as RefObject<HTMLElement>, { x: props.area.x, y: props.area.y }, props.setPositionAreaSelection);

  const areaSelectionStyle = {
    left: props.area.x,
    top: props.area.y,
    width: props.area.width - 2,
    height: props.area.height - 2,
  }

  return (
    <div className={styles.areaSelection} style={areaSelectionStyle} ref={ref}></div>
  );
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    areaSelection: (x: number, y: number, width: number, height: number) => dispatch(areaSelection(x, y, width, height)),
    resetAreaSelection: () => dispatch(resetAreaSelection()),
    setPositionAreaSelection: (x: number, y: number) => dispatch(setPositionAreaSelection(x, y)),
  }
}

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(AreaSelection);



