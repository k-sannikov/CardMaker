import styles from './Text.module.css';
import { Text as TextType } from '../../../store/types';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';
import { connect } from 'react-redux';
import { setPositionBlock, setSelectedBlock } from '../../../store/actionCreators/blockActionCreators';
import { AppDispatch, RootState } from '../../../store/store';

type TextProps = {
  text: TextType,
  selectBlock: string | null,
  setPositionBlock: (x: number, y: number) => void,
  setSelectedBlock: (id: string) => void,
}

function Text(props: TextProps) {
  const text: TextType = props.text;
  const textStyle = getStyle(text);
  const textBlock = useRef<HTMLSpanElement>(null);
  
  useStateBlock(props.text.id, textBlock, props.setSelectedBlock);
  useDragAndDrop(textBlock, {x: text.x, y: text.y }, props.setPositionBlock);
  
  const select: string = props.text.id === props.selectBlock ? styles.selected : '';

  return (
    <span style={textStyle}
      ref={textBlock}
      className={styles.block + ' ' + select}>
      {text.text}
    </span>
  );
}

function getStyle(text: TextType) {
  return {
    left: text.x,
    top: text.y,
    color: text.color,
    fontSize: text.size,
    fontWeight: text.bold ? 700 : 400,
    textDecoration: text.underline ? 'underline' : 'none',
    fontStyle: text.italic ? 'italic' : 'normal',
    fontFamily: text.fontFamily,
  };
}
const mapStateToProps = (state: RootState) => ({
  selectBlock: state.selectBlock,
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setPositionBlock: (x: number, y: number) => dispatch(setPositionBlock(x, y)),
    setSelectedBlock: (id: string) => dispatch(setSelectedBlock(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);
