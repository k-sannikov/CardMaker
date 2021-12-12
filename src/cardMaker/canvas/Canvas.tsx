import styles from './Canvas.module.css';
import { ReactElement } from 'react';
import Img from './img/Img'
import Text from './text/Text'
import ArtObj from './artObj/ArtObj'
import Filter from './filter/Filter'
import DeleteArea from './deleteArea/DeleteArea'
import { useRemoveSelectedBlock } from './useRemoveSelectedBlock ';
import {
  Block as BlockType,
  ArtObj as ArtObjType,
  Img as ImgType,
  Text as TextType,
  Canvas as CanvasType,
  ViewModel as ViewModelType
} from '../../store/types';
import { connect } from 'react-redux';
import { resetSelectedBlock } from '../../store/actionCreators/blockActionCreators';

type CanvasProps = {
  canvas: CanvasType,
  viewModel: ViewModelType,
  resetSelectedBlock: () => any,
}

function Canvas(props: CanvasProps) {
  useRemoveSelectedBlock(props.resetSelectedBlock);
  const canvasStyle = getStyle(props.canvas, props.viewModel);
  let listBlock: ReactElement[] = getListBlock(props.canvas.listBlock);
  return (
    <div id="canvas" className={styles.canvas} style={canvasStyle}>
      {props.canvas.deleteArea &&
        <DeleteArea />
      }
      <Filter />
      {listBlock}
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    canvas: state.canvas,
    viewModel: state.viewModel,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetSelectedBlock: () => dispatch(resetSelectedBlock()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);



function getListBlock(listBlock: BlockType[]): ReactElement[] {
  let newListBlock: ReactElement[] = [];
  listBlock.forEach((block: BlockType) => {
    switch (block.type) {
      case 'text':
        newListBlock.push(<Text text={block as TextType}
          key={block.id} />);
        break;
      case 'img':
        newListBlock.push(<Img img={block as ImgType}
          key={block.id} />);
        break;
      case 'artObj':
        newListBlock.push(<ArtObj artObj={block as ArtObjType}
          key={block.id} />);
        break;
    }
  });
  return newListBlock;
}

function getStyle(canvas: CanvasType, viewModel: ViewModelType) {
  let background: string = '#fff';

  if (viewModel.bgColor) {
    background = viewModel.bgColor;
  } else {
    if (canvas.background.color) {
      background = canvas.background.color;
    } else if (canvas.background.src) {
      background = 'url(' + canvas.background.src + ')';
    }
  }

  let width: number = 0;
  let height: number = 0;
  if (viewModel.canvasSize) {
    width = viewModel.canvasSize.width;
    height = viewModel.canvasSize.height;
  } else {
    width = canvas.width;
    height = canvas.height;
  }

  return {
    width: width,
    height: height,
    background: background,
  };
}