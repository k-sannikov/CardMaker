import styles from "./Toolbar.module.css";
import ToolbarText from "./toolbarText/ToolbarText";
import ToolbarImg from "./toolbarImg/ToolbarImg";
import ToolbarFilter from "./toolbarFilter/ToolbarFilter";
import ToolbarBackground from "./toolbarBackground/ToolbarBackground";
import ToolbarObject from "./toolbarObject/ToolbarObject";
import ToolbarCanvas from "./toolbarCanvas/ToolbarCanvas";
import { connect } from "react-redux";
import TopToolbar from "./topToolbar/TopToolbar";

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <TopToolbar />
      <label>Текст</label>
      <ToolbarText />
      <label>Изображения</label>
      <ToolbarImg />
      <label>Фон</label>
      <ToolbarBackground />
      <label>Фильтр</label>
      <ToolbarFilter />
      <label>Объекты</label>
      <ToolbarObject />
      <label>Холст</label>
      <ToolbarCanvas />
    </div>
  );
}

export default connect()(Toolbar);
