// import stylesText from '../../css/canvasBlocks/Text.module.css';
import styles from '../../css/canvasBlocks/Block.module.css';
import { BlockText } from '../../CardMakerTypes';

type TextBlockProps = {
  id: number,
  text: BlockText,
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
}

function TextBlock(props: TextBlockProps) {
  const text: BlockText = props.text;

  const textStyle = {
    left: text.posX,
    top: text.posY,
    color: text.color,
    fontSize: text.size,
    fontWeight: text.bold ? 700 : 400,
    textDecoration: text.underline ? 'underline' : 'none',
    fontStyle: text.italic ? 'italic' : 'normal',
    fontFamily: text.fontFamily,
  };

  return (
    <span style={textStyle}
      id={String(props.id)}
      className={styles.block}
      onClick={props.onClick}>
      {text.text}
    </span>
  );
}

export default TextBlock;
