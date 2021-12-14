import styles from './DeleteArea.module.css';
import { ReactElement } from 'react';
import { DeleteArea as DeleteAreaType, Canvas as CanvasType } from '../../../store/types';
import { connect } from 'react-redux';
import { RootState } from '../../../store/store';

type DeleteAreaProps = { canvas: CanvasType }

function DeleteArea(props: DeleteAreaProps) {
  const canvas: CanvasType = props.canvas;

  let listBlock: ReactElement[] = [];
  canvas.deleteArea.forEach((block: DeleteAreaType, index: number) => {
    const DeleteAreaStyle = {
      width: block.width as number,
      height: block.height as number,
      left: block.x as number,
      top: block.y as number,
    };

    listBlock.push(
    <div className={styles.deleteArea}
      key={index}
      style={DeleteAreaStyle}>
    </div>);
  });

  return (
    <>
      {listBlock}
    </>
  );
}

function mapStateToProps(state: RootState) {
  return {
    canvas: state.canvas,
  }
};

export default connect(mapStateToProps)(DeleteArea);



