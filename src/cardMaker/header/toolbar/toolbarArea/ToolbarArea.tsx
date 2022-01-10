import styles from './ToolbarArea.module.css';
import { faEraser } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button';
import { connect } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { deleteAreaSelection, resetAreaSelection } from '../../../../store/actionCreators/canvasActionCreators';
import { useDeleteArea } from './useDeleteArea';
import { useRef } from 'react';

type ToolbarAreaProps = {
  deleteAreaSelection: () => void,
  resetAreaSelection: () => void,
}

function ToolbarArea(props: ToolbarAreaProps) {

  const buttonDelete = useRef<HTMLButtonElement>(null); 

  useDeleteArea(buttonDelete, props.deleteAreaSelection, props.resetAreaSelection);

  return (
    <div className={styles.toolbar}>
      <Button
        ref={buttonDelete}
        label="Удаление"
        title="Удаление"
        icon={faEraser}
      />

      <label className={styles.toolbar__label}>Область</label>
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    deleteAreaSelection: () => dispatch(deleteAreaSelection()),
    resetAreaSelection: () => dispatch(resetAreaSelection()),
  }
}

export default connect(null, mapDispatchToProps)(ToolbarArea);
