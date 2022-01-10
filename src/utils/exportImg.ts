
import { store } from "../store/store";
import { Text, Block, BlockTypes } from "../store/types";

export async function exportImg(type: string): Promise<void> {

  const elements = store.getState().canvas.listBlock;
  const deleteAreas = store.getState().canvas.deleteArea;

  const width = store.getState().canvas.width;
  const height = store.getState().canvas.height;
  const background = store.getState().canvas.background;
  const filter = store.getState().canvas.filter;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  // рендер фона
  if (background.src) {
    const img = new Image();
    img.crossOrigin = 'anonymous'
    img.src = background.src;
    await img.decode();

    let imgWidth = img.width;
    let imgHeight = img.height;
    
    if (img.width < width) {
      imgHeight = (img.height * width) / img.width;
      imgWidth = (img.width * imgHeight) / img.height;
    }

    if (img.height < height) {
      imgWidth = (img.width * height) / img.height;
      imgHeight = (img.height * imgWidth) / img.width;
    }
    
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
  } else if (background.color) {
    ctx.fillStyle = background.color;
    ctx.fillRect(0, 0, width, height);
  }

  // рендер блоков
  for (let index = 0; index < elements.length; index++) {
    await renderBlock(elements[index], ctx);
  }

  // рендер фильтра
  const color = convertColor(filter.color);
  ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${filter.opacity})`;
  ctx.fillRect(0, 0, width, height);


  ctx.fillStyle = '#ffffff';
  deleteAreas.forEach(element => {
    ctx.fillRect(element.x, element.y, element.width, element.height);
  });

  const dataURL = canvas.toDataURL(type);
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "new-image";
  link.click();
}

async function renderBlock(element: Block, ctx: CanvasRenderingContext2D) {
  
  // стандартный сдвиг объекта
  const defShiftX = 5

  // высота строки
  const lineHeight = 1.2;

  switch (element.type) {

    // рендер текста
    case BlockTypes.text:
      const style = getStyle(element);
      const textBlock = document.createElement('div');
      textBlock.innerHTML = element.text;
      // сдивг строки
      let shift = 0;

      // отрисовка строк
      for (let str of Array.from(textBlock.children) as HTMLDivElement[]) {

        ctx.fillStyle = style.color;
        ctx.font = style.italic + ' ' + style.weight + ' ' + style.size + 'px ' + style.family;
        ctx.fillText(str.innerText, element.x + defShiftX, element.y + shift + style.size);
        // подчеркивание
        if (element.underline) {
          const textWidth = ctx.measureText(str.innerText).width;
          let chars = 0;
          let underline = '';
          while (str.innerText.length > chars) {
            underline += '__';
            chars++;
          }
          ctx.font = `700 ${style.size}px openSans`;
          ctx.fillText(underline, element.x + defShiftX, element.y + shift + style.size, textWidth);
        }
        shift += element.size * lineHeight;
      }

      break;

    // рендер изображения
    case BlockTypes.img:
      const img = new Image();
      img.crossOrigin = 'anonymous'
      img.src = element.src;

      await img.decode();
      ctx.drawImage(img, element.x, element.y, element.width, element.height);
      break;

    // рендер арт-объекта
    case BlockTypes.artObj:
      const artObj = new Image();
      artObj.crossOrigin = 'anonymous'
      artObj.src = element.src;

      await artObj.decode();
      ctx.drawImage(artObj, element.x, element.y, element.width, element.height)
      break;
  }
}

// формирование стилей для текстового блока
function getStyle(text: Text) {
  return {
    x: text.x,
    y: text.y,
    color: text.color,
    size: text.size,
    weight: text.bold ? '700' : '',
    italic: text.italic ? 'italic' : '',
    family: text.fontFamily,
  };
}

export type RGB = {
  r: number,
  g: number,
  b: number
}

// конвертирование hex в rgb
function convertColor(color: string): RGB {
  if (color.substring(0, 1) === '#') {
    color = color.substring(1);
  }
  const rgbColor: RGB = {
    r: 255,
    g: 255,
    b: 255,
  };
  rgbColor.r = parseInt(color.substring(0, 2), 16);
  rgbColor.g = parseInt(color.substring(2, 4), 16);
  rgbColor.b = parseInt(color.substring(4), 16);
  return rgbColor;
}