
import { store } from "../store/store";
import { Block, BlockTypes, Background, Filter, Size, Text, Img, ArtObj, Canvas } from "../store/types";
import { convertColor } from "./color";
import { calcSizeImgByCanvas } from "./size";

export async function exportInImage(type: string): Promise<void> {

  const canvas: Canvas = store.getState().canvas;

  const canvasWidth: number = canvas.width;
  const canvasHeight: number = canvas.height;
  const background: Background = canvas.background;
  const filter: Filter = canvas.filter;
  const elements = canvas.listBlock;
  const deleteAreas = canvas.deleteArea;

  const canvasElement = document.createElement("canvas");
  canvasElement.width = canvasWidth;
  canvasElement.height = canvasHeight;
  const ctx: CanvasRenderingContext2D | null = canvasElement.getContext("2d");

  if (ctx) {
    // отрисовка фона
    if (background.src) {
      const img = new Image();
      img.crossOrigin = "anonymous"
      img.src = background.src;
      await img.decode();
      let size: Size = calcSizeImgByCanvas(img.width, img.height, canvasWidth, canvasHeight);
      ctx.drawImage(img, 0, 0, size.width, size.height);
    } else if (background.color) {
      ctx.fillStyle = background.color;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // отрисовка блоков
    for (let element of elements) {
      await renderBlock(element, ctx);
    }

    // отрисовка фильтра
    const color = convertColor(filter.color);
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${filter.opacity})`;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // отрисовка удаленных областей
    ctx.fillStyle = "#ffffff";
    deleteAreas.forEach(element => {
      ctx.fillRect(element.x, element.y, element.width, element.height);
    });

    const dataURL = canvasElement.toDataURL(type);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "new_card";
    link.click();
  }
}

async function renderBlock(element: Block, ctx: CanvasRenderingContext2D) {
  switch (element.type) {
    case BlockTypes.text: renderText(element, ctx);
      break;
    case BlockTypes.img:
      await renderImg(element, ctx);
      break;
    case BlockTypes.artObj:
      await renderArtObj(element, ctx);
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
    weight: text.bold ? "700" : "",
    italic: text.italic ? "italic" : "",
    family: text.fontFamily,
  };
}


function renderText(element: Text, ctx: CanvasRenderingContext2D) {
      // внутрений отступ 
      const paddingText = 5;
      // высота строки
      const lineHeight = 1.2;
      const style = getStyle(element);
      const textBlock = document.createElement("div");
      textBlock.innerHTML = element.text;
      // сдивг строки
      let shift = 0;
      // отрисовка строк
      for (let str of Array.from(textBlock.children) as HTMLDivElement[]) {

        ctx.fillStyle = style.color;
        ctx.font = `${style.italic} ${style.weight} ${style.size}px ${style.family}`;
        ctx.fillText(str.innerText, element.x + paddingText, element.y + shift + style.size);
        // подчеркивание
        if (element.underline) {
          const textWidth = ctx.measureText(str.innerText).width;
          let chars = 0;
          let underline = "";
          while (str.innerText.length > chars) {
            underline += "__";
            chars++;
          }
          ctx.font = `700 ${style.size}px openSans`;
          ctx.fillText(underline, element.x + paddingText, element.y + shift + style.size, textWidth);
        }
        shift += element.size * lineHeight;
      }
}

async function renderImg(element: Img, ctx: CanvasRenderingContext2D) {
  const img = new Image();
  img.crossOrigin = "anonymous"
  img.src = element.src;
  await img.decode();
  ctx.drawImage(img, element.x, element.y, element.width, element.height);
}

async function renderArtObj(element: ArtObj, ctx: CanvasRenderingContext2D) {
  const artObj = new Image();
  artObj.crossOrigin = "anonymous"
  artObj.src = element.src;
  await artObj.decode();
  ctx.drawImage(artObj, element.x, element.y, element.width, element.height)
}