import styles from "./PreviewTemplate.module.css";
import { useRef, useState } from "react";
import { connect } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import Modal from "../../../../modal/Modal";
import { CardMaker } from "../../../../../store/types";
import { applyFileProject } from "../../../../../store/actionCreators/cardMakerActionCreators";

type PreviewTemplateProps = {
  name: string,
  srcImg: string,
  srcJson: string,
  applyFileProject: (tepmlate: CardMaker) => void,
}

function PreviewTemplate(props: PreviewTemplateProps) {

  const [isModal, setModal] = useState(false)
  const onClose = () => setModal(false)
  
  const onAccept = async () => {
    const response: Response = await fetch(props.srcJson);
    props.applyFileProject(await response.json());
    onClose()
  }

  const content: JSX.Element =
    <>
      <p>Несохраненные изменения будут потеряны</p>
      <p>Вы хотите продолжить ?</p>
    </>

  const footer: JSX.Element =
    <>
      <button onClick={onAccept}>Да</button>
      <button onClick={onClose}>Нет</button>
    </>


  const img = useRef<HTMLImageElement>(null);
  return (
    <>
      <div className={styles.preview} onClick={() => setModal(true)}>
        <img src={props.srcImg} alt="" ref={img} className={styles.img} />
        <p>{props.name}</p>
      </div>
      <Modal
        visible={isModal}
        title="Применение шаблона"
        content={content}
        footer={footer}
        onClose={onClose}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    applyFileProject: (template: CardMaker) => dispatch(applyFileProject(template)),
  }
}

export default connect(null, mapDispatchToProps)(PreviewTemplate);