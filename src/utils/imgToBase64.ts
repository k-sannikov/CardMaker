// конвертирование файла изображения в src стоку base64
type ImgInfo = {
  width: number,
  height: number,
  src: string,
}
export async function imgToBase64(fileImg: File): Promise<ImgInfo> {
  const fileImgPromise = new Promise((resolve, reject) => {
    var reader = new FileReader();
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