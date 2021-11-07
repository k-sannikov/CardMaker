import {
  ActionHistory,
  Template,
  BlockArtObj,
  BlockImg,
  BlockText,
  Background,
  Filter,
  Canvas,
  CardMaker,
  DeleteArea,
} from "./CardMakerTypes";

let testTemplate: Template = {
  name: "",
  json: "",
}

let testSetOfArtObject = {
  boy: "img/artObj/boy.png",
  frog: "img/artObj/frog.png",
  girl: "img/artObj/girl.png",
  loupe: "img/artObj/loupe.png",
  palette: "img/artObj/palette.png",
  pencil: "img/artObj/pencil.png",
  rainbow: "img/artObj/rainbow.png",
  snail: "img/artObj/snail.png",
}


let testBlockArtObj: BlockArtObj = {
  id: 1,
  type: "artObj",
  width: 150,
  height: 150,
  posX: 20,
  posY: 280,
  nameArtObj: "girl",
  src: testSetOfArtObject.girl,
}

let testBlockImg: BlockImg = {
  id: 2,
  type: "img",
  width: 320,
  height: 238,
  posX: 100,
  posY: 270,
  src: "https://images.pexels.com/photos/3337209/pexels-photo-3337209.jpeg?cs=srgb&dl=pexels-mo-3337209.jpg&fm=jpg",
}

let testBlockText: BlockText = {
  id: 3,
  type: "text",
  posX: 200,
  posY: 280,
  text: "Закат",
  size: 40,
  bold: true,
  italic: true,
  underline: true,
  color: "#ffffff",
  fontFamily: "Courier New",
}

let testBackground: Background = {
  color: null,
  src: "https://images.pexels.com/photos/8175462/pexels-photo-8175462.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
}

let testFilter: Filter = {
  color: "#c1e319",
  opacity: 0.05,
}

let deleteArea: DeleteArea[] = [
  {
    width: 100,
    height: 50,
    posX: 150,
    posY: 200,
  },
  {
    width: 70,
    height: 50,
    posX: 350,
    posY: 175,
  }
];


let testCanvas: Canvas = {
  width: 500,
  height: 500,
  filter: testFilter,
  listBlock: [
    testBlockImg,
    testBlockArtObj,
    testBlockText
  ],
  deleteArea: deleteArea,
  background: testBackground,
}

let testActionHistory: ActionHistory = {
  listState:
    [
      testCanvas,
    ],
  currentIndex: 0,
}

export let testCardMaker: CardMaker = {
  canvas: testCanvas,
  selectComponent: null,
  history: testActionHistory,
  templates: [testTemplate],
}