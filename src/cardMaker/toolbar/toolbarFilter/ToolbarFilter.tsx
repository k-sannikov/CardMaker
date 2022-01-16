import styles from "./ToolbarFilter.module.css";
import ColorPicker from "../colorPicker/ColorPicker";
import { useRef } from "react";
import { useStateFilter } from "./useStateFilter";
import { AppDispatch, RootState } from "../../../store/store";
import { inputFilter, setFilter } from "../../../store/actionCreators/canvasActionCreators";
import { connect } from "react-redux";
import { Filter } from "../../../store/types";

type ToolbarFilterProps = {
  inputFilter: (color: string, opacity: number) => void,
  setFilter: (color: string, opacity: number) => void,
  filter: Filter,
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
    <>
      <div className={styles.toolbar}>
        <div className={styles.row}>
          <label className={styles.label}>Цвет фильтра:</label>
          <ColorPicker ref={inputColor} />
        </div>
        <input type="range" min="0" max="0.5" step="0.025" className={styles.inputRange} ref={inputRange} />
      </div>

    </>
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
