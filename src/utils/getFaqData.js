import faqs from '../data/faqs';
import * as translations from '../data/lang/';

function getFaqData(languageCodeFrom, languageCodeTo) {
  const languageFromData = translations[languageCodeFrom.replace('-', '')];
  const languageToData = translations[languageCodeTo.replace('-', '')];
  const translationKeys = Object.keys(faqs);

  // Returns array of objects. Sample data structure:
  // [
  //   {
  //     'key': 'hello',
  //     'from': 'hello',
  //     'to': 'hola',
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
        ...faqs[key],
      })
    );

  // console.log("output:", output);

  return output;
}

export default getFaqData
