import { CardMaker } from "./CardMakerTypes";
import { testCardMaker } from './testData';
import { addHistory } from "./CardMakerFunctions";

// let cardMaker: CardMaker = {} as CardMaker;
let cardMaker: CardMaker = testCardMaker;
let cardMakerChangeHandler: any = null;

export function getCardMaker(): CardMaker {
  return cardMaker;
}

export function setCardMaker(newCardMaker: CardMaker): void {
  cardMaker = newCardMaker;
}

export function addCardMakerChangeHandler(handler: any): void {
  cardMakerChangeHandler = handler;
}

export function dispatch(modifyFn: Function, payload?: unknown): void {
  let newCardMaker: CardMaker;
  if (payload) {
    newCardMaker = modifyFn(cardMaker, payload)
  } else {
    newCardMaker = modifyFn(cardMaker)
  }

  if (JSON.stringify(newCardMaker.canvas) === JSON.stringify(cardMaker.canvas)) {
    setCardMaker(newCardMaker);
  } else {
    setCardMaker(addHistory(newCardMaker, newCardMaker.canvas));
  }

  setCardMaker({
    ...cardMaker,
    canvas: cardMaker.history.listState[cardMaker.history.currentIndex],
  });

  if (cardMakerChangeHandler) {
    cardMakerChangeHandler();
  }

  // console.log(cardMaker);
}