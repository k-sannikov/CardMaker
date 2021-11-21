import {
  ActionHistory,
  Template,
  ArtObj,
  Img,
  Text,
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

let testArtObj: ArtObj = {
  id: "d3df27cd-3053-21a6-4abe-9db51cda7c17",
  type: "artObj",
  width: 150,
  height: 150,
  posX: 20,
  posY: 280,
  // nameArtObj: "girl",
  src: testSetOfArtObject.girl,
}

let testImg: Img = {
  id: "4f406201-6f2f-b9ce-575e-438b1a7d1456",
  type: "img",
  width: 320,
  height: 238,
  posX: 100,
  posY: 270,
  src: "https://images.pexels.com/photos/3337209/pexels-photo-3337209.jpeg?cs=srgb&dl=pexels-mo-3337209.jpg&fm=jpg",
}

let testText: Text = {
  id: "9a13a85a-59ee-7ba3-1c64-fcad25650fc1",
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
    testImg,
    testArtObj,
    testText
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
  selectBlock: null,
  history: testActionHistory,
  templates: [testTemplate],
}