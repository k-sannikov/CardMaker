import styles from './NewProjectButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiedPiperSquare } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux';

import Modal from '../../../../modal/Modal';
import { useState } from 'react';
import { AppDispatch } from '../../../../../store/store';
import { newCardMaker } from '../../../../../store/actionCreators/cardMakerActionCreators';

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
      <button
        onClick={() => setModal(true)}
        className={styles.button}>
        <FontAwesomeIcon icon={faPiedPiperSquare} />
        <span className={styles.button__text}>Новая</span>
      </button>
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