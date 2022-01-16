import { CardMaker } from "../store/types";

// файл изображения в base64
export const getImgInformationFromFile = async (fileImg: File): Promise<HTMLImageElement> => {

  const promise = new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileImg);
    reader.onload = async () => resolve(reader.result);
    reader.onerror = reject;
  });
    const img: HTMLImageElement = new Image();
    img.src = await promise as string;
    await img.decode();
    return img;
}

// json файл проекта в объект
export const getProjectFromFile = async (file: File): Promise<CardMaker> =>
  JSON.parse(await new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  }));