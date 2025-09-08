import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeSwitch.module.css';
import DarkMode from 'assets/Icons/dark.svg';
import LightMode from 'assets/Icons/light.svg';


function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    return theme === 'dark' ? DarkMode : LightMode;
  };

  const getTitle = () => {
    return `Current: ${theme === 'dark' ? 'Dark' : 'Light'}. Click to switch to ${theme === 'dark' ? 'light' : 'dark'} theme.`;
  };

  return (
    <button
      className={styles.themeSwitch}
      onClick={toggleTheme}
      title={getTitle()}
      aria-label="Toggle theme"
    >
      <img className={styles.icon} src={getIcon()} ></img>
    </button>
  );
}

export default ThemeSwitch;