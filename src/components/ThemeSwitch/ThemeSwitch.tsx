import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeSwitch.module.css';

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    return theme === 'dark' ? '🌙' : '☀️';
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
      <span className={styles.icon}>{getIcon()}</span>
    </button>
  );
}

export default ThemeSwitch;