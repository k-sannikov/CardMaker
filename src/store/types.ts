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
  src: string,
}> & UnifiedBlock & Size

export type Img = Readonly<{
  src: string | null,
}> & UnifiedBlock & Size

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
  x: number | null,
  y: number | null,
}> & Size

export type Canvas = Readonly<{
  filter: Filter,
  listBlock: Block[];
  deleteArea: DeleteArea[],
  background: Background,
}> & Size

export type Size = Readonly<{
  width: number,
  height: number,
}>

export type ViewModelText = {
  color: string | null,
  size: number | null,
  bold: boolean | null,
  italic: boolean | null,
  underline: boolean | null,
  fontFamily: string | null,
  tempColor: string | null,
  tempSize: number | null,
}

export type ViewModel = Readonly<{
  bgColor: string | null,
  canvasSize: Size | null,
  filter: Filter | null,
  text: ViewModelText,
}>

export type CardMaker = Readonly<{
  canvas: Canvas,
  selectBlock: string | null,
  history: ActionHistory,
  templates: Template[],
  viewModel: ViewModel,
}>
