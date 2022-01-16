import styles from "./FileImgButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react";
import { connect } from "react-redux";
import Modal from "../../../modal/Modal";
import { useBackgroungImg } from "../useBackgroungImg";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  inputBackgroundImg,
  setBackgroundImg,
  setCanvasSize
} from "../../../../store/actionCreators/canvasActionCreators";
import { ViewModelBgImg } from "../../../../store/types";

type NavButtonProps = {
  label: string,
  icon: IconDefinition,
  inputBackgroundImg: (src: string, width: number, height: number) => void,
  setBackgroundImg: (src: string, width: number, height: number) => void,
  setCanvasSize: (width: number, height: number) => void,
  viewModelBgImg: ViewModelBgImg | null,
}

function AddImgButton(props: NavButtonProps) {

  const inputFile = useRef<HTMLInputElement>(null);

  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  useBackgroungImg(inputFile, props.setBackgroundImg, props.inputBackgroundImg, setModal);

  const bg: ViewModelBgImg = props.viewModelBgImg ?? {
    width: 0,
    height: 0,
    src: "",
  }

  const onAcceptStretch = () => {
    props.setBackgroundImg(bg.src, bg.width, bg.height);
    props.setCanvasSize(bg.width, bg.height);
    onClose();
  }
  const onAcceptCrop = () => {
    props.setBackgroundImg(bg.src, bg.width, bg.height);
    onClose();
  }

  const content: JSX.Element = <p>Исходное изображение больше размера холста</p>;

  const footer: JSX.Element =
    <>
      <button onClick={onAcceptStretch}>Растянуть холст</button>
      <button onClick={onAcceptCrop}>Обрезать изображение</button>
      <button onClick={onClose}>Отмена</button>
    </>

  return (
    <>
      <Modal
        visible={isModal}
        title="Выберите действие"
        content={content}
        footer={footer}
        onClose={onClose}
      />
      <button className={styles.button}>
        <label htmlFor="input-file-bg-img" className={styles.icon}>
          <FontAwesomeIcon icon={props.icon} />
        </label>
        <input
          className={styles.inputFile}
          type="file"
          accept=".png,.jpg,.jfif,.jpe,.jpeg"
          id="input-file-bg-img"
          ref={inputFile}
        />
        <label className={styles.buttonText}
          htmlFor="input-file-bg-img">
          {props.label}
        </label>
      </button>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  viewModelBgImg: state.viewModel.bgImg,
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    inputBackgroundImg: (src: string, width: number, height: number) => dispatch(inputBackgroundImg(src, width, height,)),
    setBackgroundImg: (src: string, width: number, height: number) => dispatch(setBackgroundImg(src, width, height)),
    setCanvasSize: (width: number, height: number) => dispatch(setCanvasSize(width, height)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImgButton);