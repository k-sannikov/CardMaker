import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ReactElement, useEffect } from "react"
import { connect } from "react-redux"
import styles from './Modal.module.css';

// интерфейс для пропсов
type ModalProps = {
  visible: boolean
  title: string
  content: ReactElement | string
  footer: ReactElement | string
  onClose: () => void
}

const Modal = ({
  visible = false,
  title = '',
  content = '',
  footer = '',
  onClose,
}: ModalProps) => {

  // c помощью useEffect цепляем обработчик к нажатию клавиш
  useEffect(() => {
    // создаем обработчик нажатия клавиши Esc
    const onKeydown = ({ key }: KeyboardEvent) => {
      switch (key) {
        case 'Escape':
          onClose()
          break
      }
    }
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [onClose])

  // если компонент невидим, то не отображаем его
  if (!visible) {
    return null;
  }

  // или возвращаем верстку модального окна
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalDialog} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <span className={styles.modalClose} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalContent}>{content}</div>
        </div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  )
}

export default connect()(Modal)