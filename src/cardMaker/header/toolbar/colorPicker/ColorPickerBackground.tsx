import { ChangeEvent, FocusEvent, useRef, useEffect, useContext } from 'react';
import { dispatch } from '../../../../CardMaker';
import { CardMakerContext } from '../../../../CardMakerContext';
import { setBackgroundColor } from '../../../../CardMakerFunctions';
import { CardMaker as CardMakerType, Background as BackgroundType } from '../../../../CardMakerTypes';
import ColorPicker from './ColorPicker';


function ColorPickerBackground() {
  const input: any = useRef(null);
  const cardMaker: CardMakerType = useContext(CardMakerContext);
  const background: BackgroundType = cardMaker.canvas.background;
  useEffect(() => {
    input.current.value = background.color ? background.color : '#ffffff';
  }, [background]);

  const onChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    let canvasDivElement: HTMLDivElement = document.getElementById('canvas') as HTMLDivElement;
    canvasDivElement.style.background = event.target.value;
  }

  const onBlurColor = (event: FocusEvent<HTMLInputElement>) => {
    const color: string = event.target.value;
    dispatch(setBackgroundColor, color);
  }

  return (
    <ColorPicker
      ref={input}
      onChange={onChangeColor}
      onBlur={onBlurColor}
    />
  );
}

export default ColorPickerBackground;
