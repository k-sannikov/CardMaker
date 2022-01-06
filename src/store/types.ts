export enum BlockTypes {
  img,
  artObj,
  text
}

export const templates = {
  birthday_1: {
    name: 'С днем рождения!',
    json: './templates/birthday_1.json',
    preview: './templates/birthday_1.png',
  },
  birthday_2: {
    name: 'С днем рождения!',
    json: './templates/birthday_2.json',
    preview: './templates/birthday_2.png',
  },
  february_23_1: {
    name: 'С 23 февраля!',
    json: './templates/february_23_1.json',
    preview: './templates/february_23_1.png',
  },
  march_8_1: {
    name: 'С 8 марта!',
    json: './templates/march_8_1.json',
    preview: './templates/march_8_1.png',
  },
  march_8_2: {
    name: 'С 8 марта!',
    json: './templates/march_8_2.json',
    preview: './templates/march_8_2.png',
  },
  new_year_1: {
    name: 'С новым годом!',
    json: './templates/new_year_1.json',
    preview: './templates/new_year_1.png',
  },
  new_year_2: {
    name: 'С новым годом!',
    json: './templates/new_year_2.json',
    preview: './templates/new_year_2.png',
  },
  new_year_3: {
    name: 'С новым годом!',
    json: './templates/new_year_3.json',
    preview: './templates/new_year_3.png',
  },
  september_1_1: {
    name: 'С 1 сентября!',
    json: './templates/september_1_1.json',
    preview: './templates/september_1_1.png',
  },
}

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

export type ActionHistory = Readonly<{
  listState: Canvas[],
  currentIndex: number,
}>

export type Position = Readonly<{
  x: number,
  y: number,
}>

export type UnifiedBlock = Readonly<{
  id: string,
  // type: string,
}> & Position

export type ArtObj = Readonly<{
  src: string,
  type: BlockTypes.artObj
}> & UnifiedBlock & Size

export type Img = Readonly<{
  src: string,
  type: BlockTypes.img
}> & UnifiedBlock & Size

export type Text = Readonly<{
  text: string,
  color: string,
  size: number,
  bold: boolean,
  italic: boolean,
  underline: boolean,
  fontFamily: string,
  type: BlockTypes.text
}> & UnifiedBlock

export type Block = Text | Img | ArtObj;

export type Background = Readonly<{
  color: string | null,
  src: string | null,
  width: number | null,
  height: number | null,
}>

export type Filter = Readonly<{
  color: string,
  opacity: number,
}>

export type Area = Readonly<{
  x: number,
  y: number,
}> & Size

export type Canvas = Readonly<{
  filter: Filter,
  listBlock: Block[];
  deleteArea: Area[],
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

export type ViewModelBgImg = {
  width: number,
  height: number,
  src: string,
}

export type ViewModel = Readonly<{
  bgColor: string | null,
  bgImg: ViewModelBgImg | null,
  canvasSize: Size | null,
  filter: Filter | null,
  text: ViewModelText,
  areaSelection: Area | null,
}>

export type CardMaker = Readonly<{
  canvas: Canvas,
  selectBlock: string | null,
  history: ActionHistory,
  viewModel: ViewModel,
}>
