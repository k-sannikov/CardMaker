import styles from './Text.module.css';
import { Text as TextType } from '../../../store/types';
import { useRef } from 'react';
import { useStateBlock } from '../useStateBlock';
import { useDragAndDrop } from '../useDragAndDrop';

type TextProps = {
  text: TextType,
}

function Text(props: TextProps) {
  const text: TextType = props.text;
  const textStyle = getStyle(text);
  const textBlock = useRef<HTMLSpanElement>(null);
  const selectId = useStateBlock(props.text.id, textBlock);
  const select: string = props.text.id === selectId ? styles.selected : '';
  useDragAndDrop(textBlock, {x: text.x, y: text.y });
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

export default Text;
