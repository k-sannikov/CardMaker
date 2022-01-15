import { RefObject, useRef } from "react";
import { connect } from "react-redux";

type ImgProps = {
  src: string,
  baseSrc: string,
  useImg: (img: RefObject<HTMLImageElement>, url: string, setModal: (value: boolean) => void) => void,
  setModal: (value: boolean) => void,
}

function Img(props: ImgProps) {
  const img = useRef<HTMLImageElement>(null);
  props.useImg(img, props.baseSrc, props.setModal);
  return (
    <img key={props.src} src={props.src} width={350} loading="lazy" ref={img} alt="" />
  );
}

export default connect()(Img);