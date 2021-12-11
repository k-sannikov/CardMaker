export type ActionHistory = Readonly<{
  listState: Canvas[],
  currentIndex: number,
}>

export type Template = Readonly<{
  name: string,
  json: string,
}>

export enum SetOfArtObject {
  boy = "./img/artObj/boy.png",
  frog = "./img/artObj/frog.png",
  girl = "./img/artObj/girl.png",
  loupe = "./img/artObj/loupe.png",
  palette = "./img/artObj/palette.png",
  pencil = "./img/artObj/pencil.png",
  rainbow = "./img/artObj/rainbow.png",
  snail = "./img/artObj/snail.png",
}

export type Position = Readonly<{
  x: number,
  y: number,
}>

export type UnifiedBlock = Readonly<{
  id: string,
  type: string,
}> & Position

export type ArtObj = Readonly<{
  // nameArtObj: string,
  src: string,
  width: number,
  height: number
}> & UnifiedBlock

export type Img = Readonly<{
  src: string | null,
  width: number,
  height: number,
}> & UnifiedBlock

export type Text = Readonly<{
  text: string,
  color: string,
  size: number,
  bold: boolean,
  italic: boolean,
  underline: boolean,
  fontFamily: string,
}> & UnifiedBlock

export type Block = Text | Img | ArtObj;

export type Background = Readonly<{
  color: string | null,
  src: string | null,
}>

export type Filter = Readonly<{
  color: string,
  opacity: number,
}>

export type DeleteArea = Readonly<{
  width: number | null,
  height: number | null,
  x: number | null,
  y: number | null,
}>

export type Canvas = Readonly<{
  width: number,
  height: number,
  filter: Filter,
  listBlock: Block[];
  deleteArea: DeleteArea[],
  background: Background,
}>

export type ViewModel = Readonly<{
  bgColor: string | null,
}>

export type CardMaker = Readonly<{
  canvas: Canvas,
  selectBlock: string | null,
  history: ActionHistory,
  templates: Template[],
  viewModel: ViewModel,
}>
