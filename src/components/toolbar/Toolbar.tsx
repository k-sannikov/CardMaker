import styles from '../../css/Toolbar.module.css';
import ToolbarText from './ToolbarText';
import ToolbarImg from './ToolbarImg';
import ToolbarFilter from './ToolbarFilter';
import ToolbarBackground from './ToolbarBackground';
import ToolbarArea from './ToolbarArea';
import ToolbarObject from './ToolbarObject';
import ToolbarCanvas from './ToolbarCanvas';
import { CardMaker } from '../../CardMakerTypes';

type ToolbarProps = {
  cardMaker: CardMaker,
}

function Toolbar(props: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <ToolbarText />
      <ToolbarImg />
      <ToolbarBackground canvas={props.cardMaker.canvas} />
      <ToolbarArea />
      <ToolbarFilter canvas={props.cardMaker.canvas} />
      <ToolbarObject cardMaker={props.cardMaker} />
      <ToolbarCanvas canvas={props.cardMaker.canvas} />
    </div>
  );
}

export default Toolbar;
