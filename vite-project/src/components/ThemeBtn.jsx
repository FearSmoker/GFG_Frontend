import "bootstrap-icons/font/bootstrap-icons.css";
import useTheme from "../context/ThemeContext.jsx";

function ThemeBtn() {

    const{themeMode, lightTheme , darkTheme} = useTheme()

    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked
        if(darkModeStatus){
            darkTheme()
        }
        else{
            lightTheme()
        }
    }

  return (
    <label className="flex items-center justify-center gap-2 h-full cursor-pointer">
    <input
      type="checkbox"
      onChange={onChangeBtn}
      checked={themeMode === 'dark'}
      style={{ display: 'none' }}
    />
    <i className={`bi ${themeMode === 'dark' ? 'bi-moon-fill' : 'bi-brightness-high-fill'}`}></i>
  </label>
);
}

export default ThemeBtn;
