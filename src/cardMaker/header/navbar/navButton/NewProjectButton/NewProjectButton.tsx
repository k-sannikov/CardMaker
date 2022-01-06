import { faPiedPiperSquare } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux';
import { useState } from 'react';
import { AppDispatch } from '../../../../../store/store';
import { newCardMaker } from '../../../../../store/actionCreators/cardMakerActionCreators';
import NavButton from '../NavButton/NavButton';
import Modal from '../../../../modal/Modal';

type NewProjectButtonProps = {
  newCardMaker: () => void,
}

function NewProjectButton(props: NewProjectButtonProps) {
  const [isModal, setModal] = useState(false)
  const onClose = () => setModal(false)
  const onAccept = () => {
    props.newCardMaker();
    onClose()
  }

  const content =
    <>
      <p>Несохраненные изменения будут потеряны</p>
      <p>Вы хотите продолжить ?</p>
    </>

  const footer =
    <>
      <button onClick={onAccept}>Да</button>
      <button onClick={onClose}>Нет</button>
    </>


  return (
    <>
      <NavButton label="Новая" icon={faPiedPiperSquare} onClick={() => setModal(true)} />
      <Modal
        visible={isModal}
        title="Новая открытка"
        content={content}
        footer={footer}
        onClose={onClose}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    newCardMaker: () => dispatch(newCardMaker()),
  }
}

export default connect(null, mapDispatchToProps)(NewProjectButton);