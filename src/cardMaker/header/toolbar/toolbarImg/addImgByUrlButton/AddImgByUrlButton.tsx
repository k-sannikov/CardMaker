import styles from "./AddImgByUrlButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ForwardedRef, forwardRef, useState } from "react";
import { connect } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { createImgBlock } from "../../../../../store/actionCreators/imgBlockActionCreators";
import ModalSearchImg from "../../modalSearchImg/ModalSearchImg";
import { useCreateImgByUrl } from "./useCreateImgByUrl";

type NavButtonProps = {
  label: string,
  title: string,
  icon: IconDefinition,
  createImgBlock: (src: string, width: number, height: number) => void,
}

const AddImgByUrlButton = forwardRef((props: NavButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);
  
  return (
    <>
      <button
        onClick={() => setModal(true)}
        ref={ref}
        className={styles.button}
        title={props.title}>
        <FontAwesomeIcon icon={props.icon} size="lg" />
        {props.label !== "" &&
          <span className={styles.button__text}>{props.label}</span>
        }
      </button>
      <ModalSearchImg visible={isModal} onClose={onClose} setModal={setModal} useImg={useCreateImgByUrl} />
    </>
  ); 
});  

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    createImgBlock: (src: string, width: number, height: number) => dispatch(createImgBlock(src, width, height)),
  }
}

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(AddImgByUrlButton);