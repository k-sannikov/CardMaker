import { RefObject, useEffect } from "react";
import { verify } from "../../../utils/permisions";

export function useEditText(
  block: RefObject<HTMLSpanElement>,
  setTextInTextBlock: (text: string) => void,
  clickOnText: () => void,
  deleteBlock: () => void,
) {

  function handleClickBlock() {
    setTimeout(() => {
      clickOnText();
    });
  }

  function handleDblclickBlock() {
    verify(block.current).setAttribute("contenteditable", "true")
    verify(block.current).focus();
  }

  function handleBlur() {
    if (block.current) {
      block.current.setAttribute("contenteditable", "false")
      const content: string = block.current.innerHTML;
      if (content === '') {
        deleteBlock();
      } else {
        setTextInTextBlock(block.current.innerHTML);
      }
    }
  }

  function handleMouseMove(event: Event) {
    if (verify(block.current).getAttribute('contenteditable') === 'true') {
      event.stopImmediatePropagation();
    }
  }

  function handlerKeydown(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      if (verify(block.current).getAttribute('contenteditable') === 'true') {
        verify(block.current).setAttribute("contenteditable", "false")
        setTextInTextBlock(verify(block.current).innerHTML)
      }
    }
    if (event.code === 'Delete') {
      event.stopImmediatePropagation();
    }
  }

  useEffect(() => {
    verify(block.current).addEventListener("mousedown", handleClickBlock);
    verify(block.current).addEventListener("dblclick", handleDblclickBlock);
    verify(block.current).addEventListener("blur", handleBlur);
    document.addEventListener("mousemove", handleMouseMove);
    verify(block.current).addEventListener("keydown", handlerKeydown);
    return () => {
      if (block.current) {
        block.current.removeEventListener("mousedown", handleClickBlock);
        block.current.removeEventListener("dblclick", handleDblclickBlock);
        block.current.addEventListener("blur", handleBlur);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handlerKeydown);
    };
  }, []);
}