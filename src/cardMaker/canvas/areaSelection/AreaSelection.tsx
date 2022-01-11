import styles from "./AreaSelection.module.css";
import { Area } from "../../../store/types";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useDragAndDrop } from "../useDragAndDrop";
import { areaSelection, resetAreaSelection, setPositionAreaSelection } from "../../../store/actionCreators/canvasActionCreators";
import { ForwardedRef, forwardRef, RefObject, useRef } from "react";
import { useAreaSelection } from "./useAreaSelection";

type AreaSelectionProps = {
  area: Area | null,
  areaSelection: (x: number, y: number, width: number, height: number) => void,
  resetAreaSelection: () => void,
  setPositionAreaSelection: (x: number, y: number) => void,
}

const AreaSelection = forwardRef((props: AreaSelectionProps, ref: ForwardedRef<HTMLDivElement>) => {
  const area = useRef<HTMLDivElement>(null);

  useAreaSelection(ref as RefObject<HTMLDivElement>, area, props.areaSelection, props.resetAreaSelection);

  useDragAndDrop(
    area,
    {
      x: props.area ? props.area.x : 0,
      y: props.area ? props.area.y : 0,
    },
    props.setPositionAreaSelection);

  if (!props.area) {
    return null;
  }

  const areaSelectionStyle = {
    left: props.area.x,
    top: props.area.y,
    width: props.area.width - 2,
    height: props.area.height - 2,
  }

  return (
    <>
      {props.area && <div className={styles.areaSelection} style={areaSelectionStyle} ref={area}></div>}
    </>
  );
});

function mapStateToProps(state: RootState) {
  return {
    area: state.viewModel.areaSelection,
  }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    areaSelection: (x: number, y: number, width: number, height: number) => dispatch(areaSelection(x, y, width, height)),
    resetAreaSelection: () => dispatch(resetAreaSelection()),
    setPositionAreaSelection: (x: number, y: number) => dispatch(setPositionAreaSelection(x, y)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AreaSelection);



