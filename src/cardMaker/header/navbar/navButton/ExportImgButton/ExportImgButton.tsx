import { faImage } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import NavButton from '../NavButton/NavButton';
import Modal from '../../../../modal/Modal';
import { exportImg } from "../../../../../utils/exportImg";

function ExportImgButton() {

  const downloadImg = useRef<HTMLButtonElement>(null);

  const [isModal, setModal] = useState(false)
  const onClose = () => setModal(false)

  const onAcceptJpg = () => {
    exportImg('image/jpeg');
    onClose();
  }

  const onAcceptPng = () => {
    exportImg('image/png');
    onClose();
  }

  const content =
    <>
      <p>Выберите формат сохраняемого файла</p>
    </>

  const footer =
    <>
      <button onClick={onAcceptJpg}>jpg</button>
      <button onClick={onAcceptPng}>png</button>
      <button onClick={onClose}>Отмена</button>
    </>


  return (
    <>
      <NavButton label="В jpg/png" icon={faImage} onClick={() => setModal(true)} ref={downloadImg} />
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