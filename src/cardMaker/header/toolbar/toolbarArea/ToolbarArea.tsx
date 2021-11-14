import styles from './ToolbarArea.module.css';
import { faVectorSquare, faEraser } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button';

function ToolbarArea() {
  return (
    <div className={styles.toolbar}>
      <Button
        label="Выделение"
        title="Выделение"
        icon={faVectorSquare}
        onClick={() => console.log('')}
      />
      <Button
        label="Удалание"
        title="Удалание"
        icon={faEraser}
        onClick={() => console.log('')}
      />
      <h2 className={styles.toolbar__label}>Область</h2>
    </div>
  );
}

export default ToolbarArea;
