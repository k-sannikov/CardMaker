import { faImage } from "@fortawesome/free-solid-svg-icons"
import { connect } from "react-redux";
import { useRef, useState } from "react";
import NavButton from "../NavButton/NavButton";
import Modal from "../../../../modal/Modal";
import { exportInImage } from "../../../../../utils/exportInImage";

function ExportImgButton() {

  const downloadImg = useRef<HTMLButtonElement>(null);

  const [isModal, setModal] = useState(false)
  const onClose = () => setModal(false)

  const onAcceptJpg = () => {
    exportInImage("image/jpeg");
    onClose();
  }

  const onAcceptPng = () => {
    exportInImage("image/png");
    onClose();
  }

  const content: JSX.Element = <p>Выберите формат сохраняемого файла</p>

  const footer: JSX.Element =
    <>
      <button onClick={onAcceptJpg}>jpg</button>
      <button onClick={onAcceptPng}>png</button>
      <button onClick={onClose}>Отмена</button>
    </>


  return (
    <>
      <NavButton label="Сохранить как jpg/png" icon={faImage} onClick={() => setModal(true)} ref={downloadImg} />
      <Modal
        visible={isModal}
        title="Сохранить как..."
        content={content}
        footer={footer}
        onClose={onClose}
      />
    </>
  );
}

export default connect()(ExportImgButton);