import { RefObject, useEffect } from "react";
import { verify } from "../../../utils/permisions";

export function useEditText(
  block: RefObject<HTMLSpanElement>,
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
        if (content === '') {
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


    verify(currentBlock).addEventListener("mousedown", handleClickBlock);
    verify(currentBlock).addEventListener("dblclick", handleDblclickBlock);
    verify(currentBlock).addEventListener("blur", handleBlur);
    document.addEventListener("mousemove", handleMouseMove);
    verify(currentBlock).addEventListener("keydown", handlerKeydown);
    return () => {
      if (currentBlock) {
        currentBlock.removeEventListener("mousedown", handleClickBlock);
        currentBlock.removeEventListener("dblclick", handleDblclickBlock);
        currentBlock.addEventListener("blur", handleBlur);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handlerKeydown);
    };
  }, [
    block, bold, italic, underline, setTextIncurrentBlock, clickOnText,
    deleteBlock, setBoldText, setItalicText, setUnderlineText
  ]);
}