import en from 'locales/locale.en.json';
import de from 'locales/locale.de.json';

export type LocaleTexts = typeof en;

export type SupportedLocale = 'en' | 'de';

/**
 * An object that maps supported locales to their corresponding localized text data.
 */
const locales: Record<SupportedLocale, LocaleTexts> = {
  en,
  de,
};

/**
 * The Localizer class provides functionality to manage and retrieve localized text based on a specified locale.
 */
export class Localizer {
  private readonly _texts: LocaleTexts;

  /**
   * Constructor for initializing the application with a specific locale.
   *
   * @param {SupportedLocale} [locale='en'] - The locale to be used. Defaults to 'en' if none is provided.
   * @return {void}
   */
  constructor(locale: SupportedLocale = 'en') {
    this._texts = locales[locale] || locales.en;
  }

  /**
   * Retrieves the locale-specific texts.
   *
   * @return {LocaleTexts} The localized texts.
   */
  get texts(): LocaleTexts {
    return this._texts;
  }

  /**
   * Checks if the given locale is supported.
   *
   * @param {string | null} locale - The locale to check for support. Can be a string or null.
   * @return {locale is SupportedLocale} Returns true if the locale is supported; otherwise, false.
   */
  static isLocaleSupported(locale: string | null): locale is SupportedLocale {
    return !!locale && locale in locales;
  }
}
