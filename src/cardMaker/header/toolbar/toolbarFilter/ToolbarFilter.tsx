import styles from './ToolbarFilter.module.css';
import ColorPicker from '../colorPicker/ColorPicker';
import { RefObject, useRef } from 'react';
import { useStateFilter } from './useStateFilter';
import { AppDispatch, RootState } from '../../../../store/store';
import { inputFilter, setFilter } from '../../../../store/actionCreators/canvasActionCreators';
import { connect } from 'react-redux';
import { Filter as FilterType } from '../../../../store/types';

type ToolbarFilterProps = {
  inputFilter: (color: string, opacity: number) => void,
  setFilter: (color: string, opacity: number) => void,
  filter: FilterType,
}

function ToolbarFilter(props: ToolbarFilterProps) {
  const inputColor = useRef<HTMLInputElement>(null);
  const inputRange = useRef<HTMLInputElement>(null);
  useStateFilter(
    inputColor,
    inputRange,
    props.inputFilter,
    props.setFilter,
    props.filter
  );
  return (
    <div className={styles.toolbar}>
      <div className={styles.colorPickerBox}>
        <ColorPicker ref={inputColor as RefObject<HTMLInputElement>} />
      </div>
      <input type="range" min="0" max="0.5" step="0.05" className={styles.input_range}
        ref={inputRange}
      />
      <label className={styles.toolbar__label}>Фильтр</label>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  filter: state.canvas.filter,
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    inputFilter: (color: string, opacity: number) => dispatch(inputFilter(color, opacity)),
    setFilter: (color: string, opacity: number) => dispatch(setFilter(color, opacity)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarFilter);
