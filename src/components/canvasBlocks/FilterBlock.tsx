import stylesFilter from '../../css/canvasBlocks/Filter.module.css';
import styles from '../../css/canvasBlocks/Block.module.css';
import { Canvas } from '../../CardMakerTypes';

type FilterBlockProps = { canvas: Canvas }

function FilterBlock(props: FilterBlockProps) {
  const canvas: Canvas = props.canvas;

  const filterStyle = {
    background: canvas.filter.color,
    opacity: canvas.filter.opacity,
  };

  return (
    <div className={stylesFilter.filter + ' ' + styles.block} style={filterStyle} id="filter"></div>
  );
}

export default FilterBlock;



