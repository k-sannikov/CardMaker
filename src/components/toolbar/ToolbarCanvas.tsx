import styles from '../../css/ToolbarCanvas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { setCanvasSize } from '../../CardMakerFunctions';
import { dispatch } from '../../CardMaker';
import { Canvas } from '../../CardMakerTypes';

import { useEffect, ChangeEvent } from 'react';

type ToolbarCanvasProps = {
  canvas: Canvas,
}

function ToolbarCanvas(props: ToolbarCanvasProps) {
  useEffect(() => {
    let canvasWidthInputElement: HTMLInputElement = document.getElementById('canvas-width') as HTMLInputElement;
    let canvasHeightInputElement: HTMLInputElement = document.getElementById('canvas-height') as HTMLInputElement;
    canvasWidthInputElement.value = String(props.canvas.width);
    canvasHeightInputElement.value = String(props.canvas.height);
  });

  const onChangeRange = (event: ChangeEvent<HTMLInputElement>) => {
    document.getElementById('canvas')!.style.transform = 'scale(' + event.target.value + ')';
  }

  const onChangeSize = () => {
    const canvasWidthInputElement: HTMLInputElement = document.getElementById('canvas-width') as HTMLInputElement;
    const canvasHeightInputElement: HTMLInputElement = document.getElementById('canvas-height') as HTMLInputElement;
    let canvasDivElement: HTMLDivElement = document.getElementById('canvas') as HTMLDivElement;
    canvasDivElement.style.width = canvasWidthInputElement.value + 'px';
    canvasDivElement.style.height = canvasHeightInputElement.value + 'px';
  }

  const onBlurSize = () => {
    const canvasWidthInputElement: HTMLInputElement = document.getElementById('canvas-width') as HTMLInputElement;
    const canvasHeightInputElement: HTMLInputElement = document.getElementById('canvas-height') as HTMLInputElement;
    const width: number = Number(canvasWidthInputElement.value);
    const height: number = Number(canvasHeightInputElement.value);
    dispatch(setCanvasSize, { width, height });
  }


  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <input type="range" id="" name="" min="0.2" max="2" step="0.1" defaultValue="1"
          className={styles.input_range}
          onChange={onChangeRange}
        />
      </div>



      <div className={styles.toolbar__row}>
        <input type="number" id="canvas-width" className={styles.input_number} min="0"
          defaultValue={props.canvas.width}
          onChange={onChangeSize}
          onBlur={onBlurSize}
        />
        <FontAwesomeIcon icon={faTimes} className={styles.label} />
        <input type="number" id="canvas-height" className={styles.input_number} min="0"
          defaultValue={props.canvas.height}
          onChange={onChangeSize}
          onBlur={onBlurSize}
        />
      </div>

      <h2 className={styles.toolbar__label}>Холст</h2>
    </div>
  );
}

export default ToolbarCanvas;
