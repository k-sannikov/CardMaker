export enum BlockTypes {
  img,
  artObj,
  text
}

export const templates = {
  birthday_1: {
    name: "С днем рождения!",
    json: "./templates/birthday_1.json",
    preview: "./templates/birthday_1.png",
  },
  birthday_2: {
    name: "С днем рождения!",
    json: "./templates/birthday_2.json",
    preview: "./templates/birthday_2.png",
  },
  february_23_1: {
    name: "С 23 февраля!",
    json: "./templates/february_23_1.json",
    preview: "./templates/february_23_1.png",
  },
  march_8_1: {
    name: "С 8 марта!",
    json: "./templates/march_8_1.json",
    preview: "./templates/march_8_1.png",
  },
  march_8_2: {
    name: "С 8 марта!",
    json: "./templates/march_8_2.json",
    preview: "./templates/march_8_2.png",
  },
  new_year_1: {
    name: "С новым годом!",
    json: "./templates/new_year_1.json",
    preview: "./templates/new_year_1.png",
  },
  new_year_2: {
    name: "С новым годом!",
    json: "./templates/new_year_2.json",
    preview: "./templates/new_year_2.png",
  },
  new_year_3: {
    name: "С новым годом!",
    json: "./templates/new_year_3.json",
    preview: "./templates/new_year_3.png",
  },
  september_1_1: {
    name: "С 1 сентября!",
    json: "./templates/september_1_1.json",
    preview: "./templates/september_1_1.png",
  },
}


export enum SetOfArtObject {
  ball_1 = "./img/artObj/ball_1.svg",
  bouquet_1 = "./img/artObj/bouquet_1.svg",
  bouquet_2 = "./img/artObj/bouquet_2.svg",
  bouquet_3 = "./img/artObj/bouquet_3.svg",
  bouquet_4 = "./img/artObj/bouquet_4.svg",
  bouquet_5 = "./img/artObj/bouquet_5.svg",
  bow = "./img/artObj/bow.svg",
  branch_1 = "./img/artObj/branch_1.svg",
  branch_2 = "./img/artObj/branch_2.svg",
  branch_3 = "./img/artObj/branch_3.svg",
  camera_1 = "./img/artObj/camera_1.svg",
  camera_2 = "./img/artObj/camera_2.svg",
  flower_1 = "./img/artObj/flower_1.svg",
  flower_2 = "./img/artObj/flower_2.svg",
  flower_3 = "./img/artObj/flower_3.svg",
  gift_1 = "./img/artObj/gift_1.svg",
  gift_2 = "./img/artObj/gift_2.svg",
  gift_3 = "./img/artObj/gift_3.svg",
  sun_1 = "./img/artObj/sun_1.svg",
  tree_1 = "./img/artObj/tree_1.svg",
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

export type Block = Readonly<Text | Img | ArtObj>;

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

export type ViewModelText = Readonly<{
  color: string | null,
  size: number | null,
  bold: boolean | null,
  italic: boolean | null,
  underline: boolean | null,
  fontFamily: string | null,
  tempColor: string | null,
  tempSize: number | null,
}>

export type ViewModelBgImg = Readonly<{
  width: number,
  height: number,
  src: string,
}>

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
