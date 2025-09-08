import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeSwitch.module.css';


function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();


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
      <div className={styles.iconContainer}>
        {theme === 'dark' ? (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  );
}

export default ThemeSwitch;