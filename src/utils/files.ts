import { CardMaker } from "../store/types";

// файл изображения в base64
export const getImgInformationFromFile = (fileImg: File): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(fileImg);
  reader.onload = async () => {
    const img = new Image();
    img.src = reader.result as string;
    await img.decode();
    resolve(img)
  };
  reader.onerror = reject;
});

// json файл проекта в объект
export const getProjectFromFile = (file: File): Promise<CardMaker> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => resolve(JSON.parse(reader.result as string));
  reader.onerror = reject;
});