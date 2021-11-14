import styles from './Text.module.css';
import { Text as TextType } from '../../../CardMakerTypes';
import { useRef } from 'react';
import {useBlock} from '../useBlock';

type TextProps = {
  text: TextType,
}

function Text(props: TextProps) {
  const text: TextType = props.text;
  const textStyle = getStyle(text);

  let textBlock: any = useRef(null);
  const selectId = useBlock(props.text.id, textBlock);
  const select: string = props.text.id == selectId ? styles.selected : '';

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
    left: text.posX,
    top: text.posY,
    color: text.color,
    fontSize: text.size,
    fontWeight: text.bold ? 700 : 400,
    textDecoration: text.underline ? 'underline' : 'none',
    fontStyle: text.italic ? 'italic' : 'normal',
    fontFamily: text.fontFamily,
  };
}


export default Text;
