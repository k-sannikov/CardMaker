import { CardMaker } from '../store/types';

// конвертирование файла изображения в src стоку base64
type ImgInfo = {
  width: number,
  height: number,
  src: string,
}

export async function getImgInformationFromFile(fileImg: File): Promise<ImgInfo> {
  const fileImgPromise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileImg);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const img = new Image();

  img.src = await fileImgPromise as string;
  await img.decode();

  return {
    width: img.width,
    height: img.height,
    src: img.src,
  }
}

export async function getProjectFromFile(file: File): Promise<CardMaker> {
  const filePromise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  const json = await filePromise as string;
  return await JSON.parse(json);
}