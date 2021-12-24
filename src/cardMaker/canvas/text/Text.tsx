import styles from './Text.module.css';
import { Text as TextType } from '../../../store/types';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';
import { connect } from 'react-redux';
import { clickOnText, deleteBlock, resetSelectedBlock, setPositionBlock, setSelectedBlock } from '../../../store/actionCreators/blockActionCreators';
import { AppDispatch, RootState } from '../../../store/store';
import { useEditText } from './useEditText';
import { setBoldText, setItalicText, setTextInTextBlock, setUnderlineText } from '../../../store/actionCreators/textBlockActionCreators';

type TextProps = {
  text: TextType,
  color: string | null,
  size: number | null,
  selectBlock: string | null,
  setPositionBlock: (x: number, y: number) => void,
  setSelectedBlock: (id: string) => void,
  resetSelectedBlock: () => void,
  setTextInTextBlock: (text: string) => void,
  clickOnText: () => void,
  deleteBlock: () => void,
  setBoldText: (isBold: boolean) => void,
  setItalicText: (isItalic: boolean) => void,
  setUnderlineText: (isUnderline: boolean) => void,
}

function Text(props: TextProps) {
  const text: TextType = props.text;

  const textBlock = useRef<HTMLSpanElement>(null);
  useStateBlock(props.text.id, textBlock, props.setSelectedBlock, props.resetSelectedBlock);
  useDragAndDrop(textBlock, { x: text.x, y: text.y }, props.setPositionBlock);

  useEditText(
    textBlock,
    text.bold,
    text.italic,
    text.underline,
    props.setTextInTextBlock,
    props.clickOnText,
    props.deleteBlock,
    props.setBoldText,
    props.setItalicText,
    props.setUnderlineText,
  );

  const select: string = props.text.id === props.selectBlock ? styles.selected : '';
  let textStyle = getStyle(text);
  textStyle = {
    ...textStyle,
    color: props.color && select !== '' ? props.color : textStyle.color,
    fontSize: props.size && select !== '' ? props.size : textStyle.fontSize,
  }

  return (
    <span style={textStyle}
      contentEditable={false}
      suppressContentEditableWarning={true}
      onDragStart={(e) => e.preventDefault()}
      ref={textBlock}
      className={styles.block + ' ' + select}
      dangerouslySetInnerHTML={{ __html: text.text }}
    >
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
  color: state.viewModel.text.tempColor,
  size: state.viewModel.text.tempSize,
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setPositionBlock: (x: number, y: number) => dispatch(setPositionBlock(x, y)),
    setSelectedBlock: (id: string) => dispatch(setSelectedBlock(id)),
    resetSelectedBlock: () => dispatch(resetSelectedBlock()),
    setTextInTextBlock: (text: string) => dispatch(setTextInTextBlock(text)),
    clickOnText: () => dispatch(clickOnText()),
    deleteBlock: () => dispatch(deleteBlock()),
    setBoldText: (isBold: boolean) => dispatch(setBoldText(isBold)),
    setItalicText: (isItalic: boolean) => dispatch(setItalicText(isItalic)),
    setUnderlineText: (isUnderline: boolean) => dispatch(setUnderlineText(isUnderline)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);
