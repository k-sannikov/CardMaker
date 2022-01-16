import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { RefObject, useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import styles from "./ModalSearchImg.module.css";
import { useGetPhotoAPI } from "./useGetPhotoAPI";
import Img from "./Img";
import LoadingIndicator from "./loadingIndicator/LoadingIndicator";

// интерфейс для пропсов
type ModalSearchImgProps = {
  visible: boolean,
  setModal: (value: boolean) => void,
  useImg: (img: RefObject<HTMLImageElement>, url: string, setModal: (value: boolean)=> void) => void,
  onClose: () => void,
}

const ModalSearchImg = ({
  visible = false,
  setModal,
  useImg,
  onClose,
}: ModalSearchImgProps) => {

  // c помощью useEffect цепляем обработчик к нажатию клавиш
  useEffect(() => {
    // создаем обработчик нажатия клавиши Esc
    const onKeydown = ({ key }: KeyboardEvent) => {
      switch (key) {
        case "Escape":
          onClose()
          break
      }
    }
    document.addEventListener("keydown", onKeydown)
    return () => document.removeEventListener("keydown", onKeydown)
  }, [onClose])

  const buttonSearch = useRef<HTMLButtonElement>(null);
  const buttonNext = useRef<HTMLButtonElement>(null);
  const buttonBack = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const loadingIndicator = useRef<HTMLDivElement>(null);
  const information = useRef<HTMLDivElement>(null);



  const [images, setImages] = useState([] as string[]);
  const [next, setNext] = useState(null);
  const [back, setBack] = useState(null);

  useGetPhotoAPI(
    buttonSearch,
    buttonNext,
    buttonBack,
    input,
    loadingIndicator,
    information,
    setImages,
    next,
    back,
    setNext,
    setBack
  );

  
  useEffect(() => {
    if (!visible) {
      setImages([]);
      setNext(null);
      setBack(null);
    }
  }, [visible]);

  // если компонент невидим, то не отображаем его
  if (!visible) {
    return null;
  }
  const images1 = [...images];
  const images2 = images1.splice(images1.length / 2)

  const onCloseModal = () => {
    onClose();
    setImages([]);
    setNext(null);
    setBack(null);
  }

  // или возвращаем верстку модального окна
  return (
    <div className={styles.modal} onClick={onCloseModal}>
      <div className={styles.modalDialog} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Поиск фотографий</h3>
          <span className={styles.modalClose} onClick={onCloseModal}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>

        <div className={styles.modalHeader}>
          <div className={styles.searchBox}>
            <input type="text" ref={input} />
            <button ref={buttonSearch}>Поиск</button>
            <LoadingIndicator ref={loadingIndicator} />
          </div>
          <div className={styles.navBox}>
            <button ref={buttonBack}>Назад</button>
            <button ref={buttonNext}>Вперед</button>
          </div>

        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalContent}>
            <div className={styles.information} ref={information}>Введите поисковой запрос</div>
            <div style={{ display: "inline-block" }}>
              {images1.map((src: string) => <Img key={src} setModal={setModal}
                useImg={useImg}
                src={src}
                baseSrc={src} />)}
            </div>
            <div style={{ display: "inline-block" }}>
              {images2.map((src: string) => <Img key={src} setModal={setModal}
                useImg={useImg}
                src={src}
                baseSrc={src} />)}
            </div>
          </div>

        </div>
        <div className={styles.modalFooter}></div>
      </div>
    </div>
  )
}

export default connect()(ModalSearchImg)