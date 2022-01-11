import styles from "./Canvas.module.css";
import { ReactElement, useRef } from "react";
import { connect } from "react-redux";
import Img from "./img/Img"
import Text from "./text/Text"
import ArtObj from "./artObj/ArtObj"
import Filter from "./filter/Filter"
import DeleteArea from "./deleteArea/DeleteArea"
import AreaSelection from "./areaSelection/AreaSelection";
import { Block, Canvas as CanvasType, Size, BlockTypes } from "../../store/types";
import { AppDispatch, RootState } from "../../store/store";
import { areaSelection, resetAreaSelection } from "../../store/actionCreators/canvasActionCreators";
import { calcSizeImgByCanvas } from "../../utils/size";

type CanvasProps = {
  canvas: CanvasType,
  bgColor: string | null,
  canvasSize: Size | null,
  areaSelection: (x: number, y: number, width: number, height: number) => void,
  resetAreaSelection: () => void,
}

function Canvas(props: CanvasProps) {
  const canvasStyle = getStyle(props.canvas, props.bgColor, props.canvasSize);
  const listBlock: ReactElement[] = getListBlock(props.canvas.listBlock);
  const canvas = useRef<HTMLDivElement>(null);

  return (
    <div id="canvas" className={styles.canvas} style={canvasStyle} ref={canvas}>
      <AreaSelection ref={canvas} />
      <DeleteArea />
      <Filter />
      {listBlock}
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    canvas: state.canvas,
    area: state.viewModel.areaSelection,
    bgColor: state.viewModel.bgColor,
    canvasSize: state.viewModel.canvasSize,
  }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    areaSelection: (x: number, y: number, width: number, height: number) => dispatch(areaSelection(x, y, width, height)),
    resetAreaSelection: () => dispatch(resetAreaSelection()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);


function getListBlock(listBlock: Block[]): ReactElement[] {
  let newListBlock: ReactElement[] = [];
  listBlock.forEach((block: Block) => {
    switch (block.type) {
      case BlockTypes.text: newListBlock.push(<Text text={block} key={block.id} />);
        break;
      case BlockTypes.img: newListBlock.push(<Img img={block} key={block.id} />);
        break;
      case BlockTypes.artObj: newListBlock.push(<ArtObj artObj={block} key={block.id} />);
        break;
    }
  });
  return newListBlock;
}

function getStyle(canvas: CanvasType, bgColor: string | null, canvasSize: Size | null) {
  let backgroundColor: string = "#fff";
  let backgroundImage: string = "";

  if (bgColor) {
    backgroundColor = bgColor;
  } else {
    if (canvas.background.color) {
      backgroundColor = canvas.background.color;
    } else if (canvas.background.src) {
      backgroundImage = `url(${canvas.background.src})`;
    }
  }

  let width: number = 0;
  let height: number = 0;
  if (canvasSize) {
    width = canvasSize.width;
    height = canvasSize.height;
  } else {
    width = canvas.width;
    height = canvas.height;
  }

  const bgWidth: number | null = canvas.background.width;
  const bgHeight: number | null = canvas.background.height;

  let bgSize: Size | null = null;

  if (bgWidth && bgHeight) {
    bgSize = calcSizeImgByCanvas(bgWidth, bgHeight, width, height);
  }

  return {
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    backgroundImage: backgroundImage,
    backgroundSize: bgSize ? `${bgSize.width}px ${bgSize.height}px` : '',
  };
}