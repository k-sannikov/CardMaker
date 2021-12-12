import styles from './Toolbar.module.css';
import ToolbarText from './toolbarText/ToolbarText';
import ToolbarImg from './toolbarImg/ToolbarImg';
import ToolbarFilter from './toolbarFilter/ToolbarFilter';
import ToolbarBackground from './toolbarBackground/ToolbarBackground';
import ToolbarArea from './toolbarArea/ToolbarArea';
import ToolbarObject from './toolbarObject/ToolbarObject';
import ToolbarCanvas from './toolbarCanvas/ToolbarCanvas';
import { connect } from 'react-redux';

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <ToolbarText />
      <ToolbarImg />
      <ToolbarBackground />
      <ToolbarArea />
      <ToolbarFilter />
      <ToolbarObject />
      <ToolbarCanvas />
    </div>
  );
}

export default connect()(Toolbar);
