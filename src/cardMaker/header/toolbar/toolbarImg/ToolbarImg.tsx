import styles from "./ToolbarImg.module.css";
import { faDownload, faGlobe, faStickyNote } from "@fortawesome/free-solid-svg-icons"
import DropdownMenu from "../../../dropdownMenu/DropdownMenu";
import AddImgButtonFile from "./addImgButtonFile/AddImgButtonFile";
import PreviewArtObj from "./previewArtObj/PreviewArtObj";
import { SetOfArtObject } from "../../../../store/types";
import { useCreateImg } from "./useCreateImg";
import { ReactElement } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { createImgBlock } from "../../../../store/actionCreators/imgBlockActionCreators";
import AddImgByUrlButton from "./addImgByUrlButton/AddImgByUrlButton";

type ToolbarImgProps = {
  createImgBlock: (src: string, width: number, height: number) => void,
}

function ToolbarImg(props: ToolbarImgProps) {

  // формирование списка стикеров
  const srcList: SetOfArtObject[] = Object.values(SetOfArtObject);
  const imgList: ReactElement[] = [];
  srcList.forEach((src, index) => {
    imgList.push(<PreviewArtObj src={src} key={index} />);
  });

  const inputFile = useRef<HTMLInputElement>(null);

  useCreateImg(inputFile, props.createImgBlock);

  return (
    <div className={styles.toolbar}>
      <div className={styles.button_box}>
        <AddImgButtonFile label="" title="C компьютера" icon={faDownload} ref={inputFile} />

        <AddImgByUrlButton label="" title="Из Pixels" icon={faGlobe} />

        <DropdownMenu minWidth={200} label="" icon={faStickyNote} sizeIcon="lg">
          {imgList}
        </DropdownMenu>
      </div>
      <label className={styles.toolbar__label}>Изображения</label>
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    createImgBlock: (src: string, width: number, height: number) => dispatch(createImgBlock(src, width, height)),
  }
}

export default connect(null, mapDispatchToProps)(ToolbarImg);