import { RefObject, useEffect } from "react";
import { verify } from "../../../utils/permisions";

export function useEditText(
  block: RefObject<HTMLDivElement>,
  bold: boolean,
  italic: boolean,
  underline: boolean,
  setTextIncurrentBlock: (text: string) => void,
  clickOnText: () => void,
  deleteBlock: () => void,
  setBoldText: (isBold: boolean) => void,
  setItalicText: (isItalic: boolean) => void,
  setUnderlineText: (isUnderline: boolean) => void,
) {

  useEffect(() => {

    const currentBlock = block.current;

    function handleClickBlock() {
      setTimeout(() => {
        clickOnText();
      });
    }

    function handleDblclickBlock() {
      verify(currentBlock).setAttribute("contenteditable", "true")
      verify(currentBlock).focus();
    }

    function handleBlur() {
      if (currentBlock) {
        currentBlock.setAttribute("contenteditable", "false")
        const content: string = currentBlock.innerHTML;
        if (content === '<div><br></div>') {
          deleteBlock();
        } else {
          setTextIncurrentBlock(currentBlock.innerHTML);
        }
      }
    }

    function handleMouseMove(event: Event) {
      if (verify(currentBlock).getAttribute('contenteditable') === 'true') {
        event.stopImmediatePropagation();
      }
    }

    function handlerKeydown(event: KeyboardEvent): void {
      if (event.code === 'Escape') {
        if (verify(currentBlock).getAttribute('contenteditable') === 'true') {
          verify(currentBlock).setAttribute("contenteditable", "false")
          setTextIncurrentBlock(verify(currentBlock).innerHTML)
        }
      }
      if (event.code === 'Delete') {
        event.stopImmediatePropagation();
      }
      if (event.code === 'KeyB' && (event.ctrlKey || event.metaKey)) {
        setBoldText(!bold)
      }
      if (event.code === 'KeyI' && (event.ctrlKey || event.metaKey)) {
        setItalicText(!italic)
      }
      if (event.code === 'KeyU' && (event.ctrlKey || event.metaKey)) {
        setUnderlineText(!underline)
      }
    }

    function handlerPaste(event: any) {
      event.preventDefault();
      const text = event.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    }

    function handlerInput(event: Event) {
      if (currentBlock) {
        if (currentBlock.innerHTML[0] !== '<' || currentBlock.innerHTML === '<br>') {
          currentBlock.innerHTML = `<div>${currentBlock.innerText}<br></div>`;
          currentBlock.focus();
        }
      }
    }


    verify(currentBlock).addEventListener("mousedown", handleClickBlock);
    verify(currentBlock).addEventListener("dblclick", handleDblclickBlock);
    verify(currentBlock).addEventListener("blur", handleBlur);
    document.addEventListener("mousemove", handleMouseMove);
    verify(currentBlock).addEventListener("keydown", handlerKeydown);
    verify(currentBlock).addEventListener("paste", handlerPaste);
    verify(currentBlock).addEventListener("input", handlerInput);
    return () => {
      if (currentBlock) {
        currentBlock.removeEventListener("mousedown", handleClickBlock);
        currentBlock.removeEventListener("dblclick", handleDblclickBlock);
        currentBlock.addEventListener("blur", handleBlur);
        currentBlock.removeEventListener("keydown", handlerKeydown);
        currentBlock.removeEventListener("paste", handlerPaste);
        currentBlock.removeEventListener("input", handlerInput);
      }
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    block, bold, italic, underline, setTextIncurrentBlock, clickOnText,
    deleteBlock, setBoldText, setItalicText, setUnderlineText
  ]);
}