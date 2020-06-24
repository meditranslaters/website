import categories from '../data/categories'
import * as translations from '../data/lang'
import translationKeyGroupByCategory from '../data/translationKeyGroupByCategory'
import translationKeyMetadata from '../data/translationKeyMetadata'

function getAvailableCategoriesByLanguageTo(languageCodeFrom, languageCodeTo) {
  const languageFromData =  translations[languageCodeFrom.replace('-', '')];
  const languageToData =  translations[languageCodeTo.replace('-', '')];

  return categories.filter(category => {
    const translationKeys = (category && category.toLowerCase() !== 'all' && translationKeyGroupByCategory[category]) || Object.keys(translationKeyMetadata);
    return translationKeys.some(key => languageFromData[key] && languageToData[key]);
  });
}

export default getAvailableCategoriesByLanguageTo
