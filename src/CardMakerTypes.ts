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


export type BlockArtObj = {
  readonly nameArtObj: string,
  readonly src: string,
} & { readonly width: number, readonly height: number } & Component

export type BlockImg = {
  readonly src: string | null,
} & { readonly width: number, readonly height: number } & Component

export type BlockText = {
  readonly text: string,
  readonly color: string,
  readonly size: number,
  readonly bold: boolean,
  readonly italic: boolean,
  readonly underline: boolean,
  readonly fontFamily: string,
} & Component

export type Block = BlockText | BlockImg | BlockArtObj;

export type Component = {
  readonly id: number,
  readonly posX: number,
  readonly posY: number,
  readonly type: string,
}

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
  readonly selectComponent: number | null,
  readonly history: ActionHistory,
  readonly templates: Template[],
}
