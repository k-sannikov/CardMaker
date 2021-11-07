import styles from '../css/DropdownMenu.module.css';



type DropdownMenuProps = {
  content: React.ReactElement[];
  icon: React.ReactElement,
}
function DropdownMenu(props: DropdownMenuProps) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        {props.icon}
      </button>
      <div className={styles.dropdown_content}>
        {props.content}
      </div>
    </div>
  );
}

export default DropdownMenu;
