export type ActionHistory = {
  readonly listState: Canvas[],
  readonly currentIndex: number,
}

export type Template = {
  readonly name: string,
  readonly json: string,
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

export type UnifiedBlock = {
  readonly id: string,
  posX: number,
  posY: number,
  // readonly posX: number,
  // readonly posY: number,
  readonly type: string,
}

export type ArtObj = {
  // readonly nameArtObj: string,
  readonly src: string,
  readonly width: number,
  readonly height: number
} & UnifiedBlock

export type Img = {
  readonly src: string | null,
} & { readonly width: number, readonly height: number } & UnifiedBlock

export type Text = {
  readonly text: string,
  readonly color: string,
  readonly size: number,
  readonly bold: boolean,
  readonly italic: boolean,
  readonly underline: boolean,
  readonly fontFamily: string,
} & UnifiedBlock

export type Block = Text | Img | ArtObj;

export type Background = {
  readonly color: string | null,
  readonly src: string | null,
}

export type Filter = {
  readonly color: string,
  readonly opacity: number,
}

export type DeleteArea = {
  width: number | null,
  height: number | null,
  posX: number | null,
  posY: number | null,
}

export type Canvas = {
  readonly width: number,
  readonly height: number,
  readonly filter: Filter,
  readonly listBlock: Block[];
  readonly deleteArea: DeleteArea[],
  readonly background: Background,
}

export type CardMaker = {
  readonly canvas: Canvas,
  readonly selectBlock: string | null,
  readonly history: ActionHistory,
  readonly templates: Template[],
}
