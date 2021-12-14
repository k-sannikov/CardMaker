import styles from './ToolbarArea.module.css';
import { faVectorSquare, faEraser } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button';
import { connect } from 'react-redux';

function ToolbarArea() {
  return (
    <div className={styles.toolbar}>
      <Button
        label="Выделение"
        title="Выделение"
        icon={faVectorSquare}
      />
      <Button
        label="Удаление"
        title="Удаление"
        icon={faEraser}
      />
      <label className={styles.toolbar__label}>Область</label>
    </div>
  );
}

export default connect()(ToolbarArea);
