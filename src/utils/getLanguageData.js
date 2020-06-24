import translationKeyGroupByCategory from '../data/translationKeyGroupByCategory';
import translationKeyMetadata from '../data/translationKeyMetadata';
import * as translations from '../data/lang/';

function getLanguageData(languageCodeFrom, languageCodeTo, category, bookmarkList = []) {
  const languageFromData =  translations[languageCodeFrom.replace('-', '')];
  const languageToData =  translations[languageCodeTo.replace('-', '')];

  const translationKeys = (category && category.toLowerCase() !== 'all' && translationKeyGroupByCategory[category]) || Object.keys(translationKeyMetadata);

  // Returns array of objects. Sample data structure:
  // [
  //   {
  //     'key': 'hello',
  //     'from': 'hello',
  //     'to': 'hola',
  //     'category': 'greeting',
  //   },
  //   ...
  // ]
  const output = translationKeys
    // .filter(key => languageFromData[key] && languageToData[key])
    .map(key =>
      ({
        key,
        from: languageFromData[key],
        to: languageToData[key],
        ...translationKeyMetadata[key],
        isBookmarked: bookmarkList.includes(translationKeyMetadata[key].id),
      })
    ).filter(a => a.to);

  // console.log("output:", output);

  return output;
}

export default getLanguageData
