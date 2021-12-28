import styles from './FileImgButton.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../../../../modal/Modal';
import { useBackgroungImg } from '../useBackgroungImg';
import { AppDispatch, RootState } from '../../../../../store/store';
import {
  inputBackgroundImg,
  setBackgroundImg,
  setCanvasSize
} from '../../../../../store/actionCreators/canvasActionCreators';
import { ViewModelBgImg } from '../../../../../store/types';

type NavButtonProps = {
  label: string,
  title: string,
  icon: IconDefinition,
  inputBackgroundImg: (width: number, height: number, src: string) => void,
  setBackgroundImg: (src: string) => void,
  setCanvasSize: (width: number, height: number) => void,
  bgImg: ViewModelBgImg | null,
}

function AddImgButton(props: NavButtonProps): any {

  const inputFile = useRef<HTMLInputElement>(null);

  let [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  useBackgroungImg(inputFile, props.setBackgroundImg, props.inputBackgroundImg, setModal);

  const bg = props.bgImg ?? {
    width: 0,
    height: 0,
    src: '',
  }

  const onAcceptStretch = () => {
    props.setBackgroundImg(bg.src);
    props.setCanvasSize(bg.width, bg.height);
    onClose();
  }
  const onAcceptCrop = () => {
    props.setBackgroundImg(bg.src);
    onClose();
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
      <Modal
        visible={isModal}
        title="Выберите действие"
        content={content}
        footer={footer}
        onClose={onClose}
      />
      <button className={styles.button} title={props.title}>
        <label htmlFor="input-file-bg-img" className={styles.icon}>
          <FontAwesomeIcon icon={props.icon} />
        </label>
        <input
          className={styles.inputFile}
          type="file"
          id="input-file-bg-img"
          ref={inputFile}
        />
        {props.label !== '' &&
          <label className={styles.button__text}
            htmlFor="input-file-bg-img">
            {props.label}
          </label>
        }
      </button>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  bgImg: state.viewModel.bgImg,
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    inputBackgroundImg: (width: number, height: number, src: string) => dispatch(inputBackgroundImg(width, height, src)),
    setBackgroundImg: (src: string) => dispatch(setBackgroundImg(src)),
    setCanvasSize: (width: number, height: number) => dispatch(setCanvasSize(width, height)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImgButton);