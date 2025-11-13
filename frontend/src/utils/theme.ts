export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'app-theme';

export const getTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    return savedTheme;
  }
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

export const setTheme = (theme: Theme): void => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
};

export const toggleTheme = (): Theme => {
  const currentTheme = getTheme();
  const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
};

export const initTheme = (): void => {
  const theme = getTheme();
  setTheme(theme);
};

