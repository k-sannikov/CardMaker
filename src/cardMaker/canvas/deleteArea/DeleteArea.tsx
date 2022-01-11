import styles from "./DeleteArea.module.css";
import { ReactElement } from "react";
import { Area } from "../../../store/types";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";

type DeleteAreaProps = { deleteArea: Area[] }

function DeleteArea(props: DeleteAreaProps) {

  if (props.deleteArea === []) {
    return null;
  }

  const listBlock: ReactElement[] = [];
  props.deleteArea.forEach((block: Area, index: number) => {
    const DeleteAreaStyle = {
      width: block.width,
      height: block.height,
      left: block.x,
      top: block.y,
    };

    listBlock.push(
      <div className={styles.deleteArea}
        key={index}
        style={DeleteAreaStyle}>
      </div>
    );
  });

  return (
    <>
      {listBlock}
    </>
  );
}

function mapStateToProps(state: RootState) {
  return {
    deleteArea: state.canvas.deleteArea,
  }
};

export default connect(mapStateToProps)(DeleteArea);



