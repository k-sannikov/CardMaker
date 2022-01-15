import styles from "./AddBackgroundByUrlButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ForwardedRef, forwardRef, useState } from "react";
import { connect } from "react-redux";
import ModalSearchImg from "../../modalSearchImg/ModalSearchImg";
import { useAddBackgroundByUrl } from "./useAddBackgroundByUrl";
import Modal from "../../../../modal/Modal";
import { AppDispatch, RootState } from "../../../../../store/store";
import { inputBackgroundImg, setBackgroundImg, setCanvasSize } from "../../../../../store/actionCreators/canvasActionCreators";
import { ViewModelBgImg } from "../../../../../store/types";

type ButtonProps = {
  label: string,
  title: string,
  icon: IconDefinition,
  inputBackgroundImg: (src: string, width: number, height: number) => void,
  setBackgroundImg: (src: string, width: number, height: number) => void,
  setCanvasSize: (width: number, height: number) => void,
  viewModelBgImg: ViewModelBgImg | null,
}

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const [isModalSearchImg, setModalSearchImg] = useState(false);
  const onCloseModalSearchImg = () => setModalSearchImg(false);

  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  const bg = props.viewModelBgImg ?? {
    width: 0,
    height: 0,
    src: "",
  }

  const onAcceptStretch = () => {
    props.setBackgroundImg(bg.src, bg.width, bg.height);
    props.setCanvasSize(bg.width, bg.height);
    onClose();
    onCloseModalSearchImg();
  }
  const onAcceptCrop = () => {
    props.setBackgroundImg(bg.src, bg.width, bg.height);
    onClose();
    onCloseModalSearchImg();
  }

  const content =
    <>
      <p>Исходное изображение больше размера холста</p>
    </>

  const footer =
    <>
      <button onClick={onAcceptStretch}>Растянуть холст</button>
      <button onClick={onAcceptCrop}>Обрезать изображение</button>
      <button onClick={onClose}>Отмена</button>
    </>

  return (
    <>
      <button
        onClick={() => setModalSearchImg(true)}
        className={styles.button}
        ref={ref}
        title={props.title}
        style={{ textAlign: props.label === "" ? "center" : "left" }}
      >
        <FontAwesomeIcon icon={props.icon} />
        {props.label !== "" &&
          <span className={styles.button_text}>{props.label}</span>
        }
      </button>

      <ModalSearchImg
        visible={isModalSearchImg}
        onClose={onCloseModalSearchImg}
        setModal={setModal}
        useImg={useAddBackgroundByUrl}
      />

      <Modal
        visible={isModal}
        title="Выберите действие"
        content={content}
        footer={footer}
        onClose={onClose}
      />
    </>
  );
});

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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Button);