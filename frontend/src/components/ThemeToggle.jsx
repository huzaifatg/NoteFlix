import { useEffect, useState } from 'react';
import { MoonStarIcon, SunIcon } from 'lucide-react';

const THEMES = ['noteflix-light', 'forest'];

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const el = document.querySelector('body');
    return el?.getAttribute('data-theme') || THEMES[0];
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = () => {
    setTheme((t) => (t === THEMES[0] ? THEMES[1] : THEMES[0]));
  };

  const isLight = theme === THEMES[0];

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-ghost btn-sm btn-circle focus-ring"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
        {isLight ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
    </button>
  );
}
