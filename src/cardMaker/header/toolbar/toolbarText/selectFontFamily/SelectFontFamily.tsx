import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store/store';
import styles from './SelectFontFamily.module.css';
import { useRef } from 'react';
import { useSelectFont } from './useSelectFont';
import { setFontFamilyText } from '../../../../../store/actionCreators/textBlockActionCreators';

type SelectFontFamilyProps = {
  fontFamily: string | null,
  setFontFamilyText: (fontFamily: string) => void,
}

function SelectFontFamily(props: SelectFontFamilyProps) {
  const select = useRef<HTMLSelectElement>(null);

  useSelectFont(select, props.setFontFamilyText);

  const listParameters = [
    { value: 'Fantazyor', class: styles.fantazyor },
    { value: 'Piroucyrillic', class: styles.piroucyrillic },
    { value: 'Phenomena', class: styles.phenomena },
    { value: 'Sunday', class: styles.sunday },
    { value: 'Kurale', class: styles.kurale },
    { value: 'Sensei', class: styles.sensei },
    { value: 'Borsok', class: styles.borsok },
    { value: 'Summer', class: styles.summer },
    { value: 'Underdog', class: styles.underdog },
    { value: 'Montserrat', class: styles.montserrat },
    { value: 'OpenSans', class: styles.openSans },
    { value: 'Comfortaa', class: styles.comfortaa },
    { value: 'Rubik', class: styles.rubik },
    { value: 'Marta', class: styles.marta },
  ]

  let fontFamilies: JSX.Element[] = listParameters.map((element, index) => {
    return <option key={index} className={element.class} value={element.value}>{element.value}</option>
  })

  let currentStyle: string = fontFamilies[0].props.className;

  fontFamilies = fontFamilies.map((element: JSX.Element) => {
    if (element.props.value === props.fontFamily) {
      currentStyle = element.props.className;
      return {
        ...element,
        props: {
          ...element.props,
          selected: true
        }
      }
    } else {
      return element
    }
  });

  return (
    <select name="" id="" className={styles.select + ' ' + currentStyle} ref={select}>
      {fontFamilies}
    </select>
  );
}

function mapStateToProps(state: RootState) {
  return {
    fontFamily: state.viewModel.text.fontFamily
  }
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setFontFamilyText: (fontFamily: string) => dispatch(setFontFamilyText(fontFamily)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFontFamily);