'use client';

import { usePathname, useRouter } from 'next/navigation';

const flags = {
  en: '🇬🇧',
  de: '🇩🇪',
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine current locale from URL prefix
  const currentLocale = pathname.startsWith('/de') ? 'de' : 'en';

  // Switch locale without losing current hash or query (simple replace)
  const switchLocale = (newLocale) => {
    const newPath = pathname.replace(/^\/(en|de)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <a href={`/${currentLocale}`} className="text-2xl font-semibold text-gray-800">
          M. Ammar Khan
        </a>

        {/* Menu */}
        <div className="flex space-x-8">
          <a href={`/${currentLocale}#about`} className="text-gray-700 hover:text-gray-900">
            About
          </a>
          <a href={`/${currentLocale}#projects`} className="text-gray-700 hover:text-gray-900">
            Projects
          </a>
          <a href={`/${currentLocale}#contact`} className="text-gray-700 hover:text-gray-900">
            Contact
          </a>
        </div>

        {/* Language Switcher with flags */}
        <div className="flex space-x-2 border border-gray-300 rounded-md overflow-hidden">
          {['en', 'de'].map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`
                px-3 py-2 flex items-center gap-1 text-sm focus:outline-none
                ${currentLocale === locale ? 'bg-gray-200 cursor-default' : 'hover:bg-gray-100'}
              `}
              disabled={currentLocale === locale}
              aria-label={`Switch to ${locale.toUpperCase()}`}
              title={locale.toUpperCase()}
            >
              <span style={{ fontSize: '1.25rem' }}>{flags[locale]}</span>
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
