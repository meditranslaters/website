const fs = require('fs');
const parse = require('csv-parse');
const srcFilePath = './meditranslate_consolidated.csv';

const languageNameInEnglishList = [];
const languageNameInNativeList = [];
const languageCodeList = [];
const translationKeyMetadata = {};
const translationKeyGroupByCategory = {};
const translationKeyList = [];
const translationData = [];

// Keep track of the current row index.
let rowIndex = -1;

fs.createReadStream(srcFilePath)
  .pipe(parse())
  .on('data', row => {
    rowIndex++;

    // console.log(row);

    if (rowIndex === 0) {
      const [_, ...englishNames] = row;
      languageNameInEnglishList.push(...englishNames);
      return;
    }

    if (rowIndex === 1) {
      const [_, ...nativeNames] = row;
      languageNameInNativeList.push(...nativeNames);
      return;
    }

    if (rowIndex === 2) {
      const [_, ...codes] = row;
      languageCodeList.push(...codes);
      return;
    }

    // This row is audio link, not processing them for now.
    if (rowIndex === 3) {
      return;
    }

    const [rawCategory, ...data] = row;
    const category = rawCategory || "Uncategorised";
    const translationKey = data[0];

    if (!translationKey) {
      return;
    }

    if (translationKeyMetadata[translationKey]) {
      console.warn('Duplicate translationKey:',  translationKey);
      return;
    }

    if (!translationKeyGroupByCategory[category]) {
      translationKeyGroupByCategory[category] = [];
    }

    translationKeyGroupByCategory[category].push(translationKey);
    translationKeyList.push(translationKey);
    translationKeyMetadata[translationKey] = {
      id: rowIndex - 3,
      category,
    };
    translationData.push(data);
  })
  .on('end',() => {
    // make categories unique.
    const categories = [...new Set(Object.keys(translationKeyGroupByCategory))];

    // @TODO: generate necessary data file in js so that application can access
    // e.g. category list, language list.
    console.log("languageEnglishNameList:", languageNameInEnglishList);
    console.log("languageNativeNameList:", languageNameInNativeList);
    console.log("languageCodeList:", languageCodeList);
    console.log("translationKeyList:", translationKeyList);
    console.log("translationKeyMetadata:", translationKeyMetadata);
    console.log("translationKeyGroupByCategory:", translationKeyGroupByCategory);
    console.log("categories:", categories);
    console.log("translationData:", translationData);

    const translationDataByLanguage = transpose(translationData);

    if (translationDataByLanguage.length !== languageCodeList.length) {
      console.warn('Expected translationDataByLanguage and languageCodeList to have the same length but is not, abort. translationDataByLanguage.length:', translationDataByLanguage.length, 'languageCodeList.length:', languageCodeList.length);
      return;
    }

    generateCategories(categories);
    generateSupportedLanguages(languageNameInEnglishList, languageNameInNativeList, languageCodeList);
    generateTranslationKeyMetadata(translationKeyMetadata);
    generateTranslationKeyGroupByCategory(translationKeyGroupByCategory);
    generateTranslationFiles(languageCodeList, translationKeyList, translationDataByLanguage);
    // generateSingleTranslatedData(translationKeyList, translationDataByLanguage, languageNameInEnglishList, languageNameInNativeList, translationKeyMetadata);
  })
  .on('error', error => {
    console.log("Error:", error);
  });

const generateCategories = (categories) => {
  const destFilePath = `../src/data/categories.js`;
  fs.writeFile(destFilePath,
    'export default ' + JSON.stringify(categories, null, 2),
    error => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`Successfully written to ${destFilePath}`);
    });
}

const generateSupportedLanguages = (languageNameInEnglishList, languageNameInNativeList, languageCodeList) => {
  // languageNameInEnglishList, languageNameInNativeList, languageCodeList
  if (languageNameInEnglishList.length !== languageNameInNativeList.length
    || languageNameInEnglishList.length !== languageCodeList.length) {
    console.warn('Expected languageNameInEnglishList, languageNameInNativeList and languageCodeList to have the same length but is not, abort. languageNameInEnglishList.length:',
      languageNameInEnglishList.length, 'languageNameInNativeList.length:', languageNameInNativeList.length, 'languageCodeList.length:', languageCodeList);
    return;
  }

  const output = [];
  for (let i = 0; i < languageNameInEnglishList.length; i++) {
    const languageNameInEnglish = languageNameInEnglishList[i];
    const languageNameInNative = languageNameInNativeList[i];
    const displayName = languageNameInEnglish && languageNameInNative &&
    languageNameInEnglish !== languageNameInNative
      ? `${languageNameInEnglish} / ${languageNameInNative}`
      : languageNameInEnglish;

    output.push({
      name: languageNameInEnglish,
      nativeName: languageNameInNative,
      displayName,
      code: languageCodeList[i],
    })
  }

  const destFilePath = `../src/data/supportedLanguages.js`;
  fs.writeFile(destFilePath,
    'export default ' + JSON.stringify(output, null, 2),
    error => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`Successfully written to ${destFilePath}`);
    });
}

const generateTranslationKeyMetadata = (translationKeyMetadata) => {
  const destFilePath = `../src/data/translationKeyMetadata.js`;
  fs.writeFile(destFilePath,
    'export default ' + JSON.stringify(translationKeyMetadata, null, 2),
    error => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`Successfully written to ${destFilePath}`);
    });
}

const generateTranslationKeyGroupByCategory = (translationKeyGroupByCategory) => {
  const destFilePath = `../src/data/translationKeyGroupByCategory.js`;
  fs.writeFile(destFilePath,
    'export default ' + JSON.stringify(translationKeyGroupByCategory, null, 2),
    error => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`Successfully written to ${destFilePath}`);
    });
}

const generateTranslationFiles = (languageCodeList, translationKeyList, translationDataByLanguage) => {
  const indexFileLines = []

  translationDataByLanguage.forEach((translationData, translationDataIndex) => {
    const langCode = languageCodeList[translationDataIndex];
    const output = {};

    translationData.forEach((translatedText, index) => {
      const translationKey = translationKeyList[index];

      if (!translationKey) {
        console.log('Unable to find translationKey for langCode:', langCode, 'index: ', index);
        return;
      }

      output[translationKey] = translatedText;
    })

    // console.log("langCode, output:", langCode, output);

    const destFilePath = `../src/data/lang/${langCode}.js`;
    fs.writeFile(destFilePath,
      'export default ' + JSON.stringify(output, null, 2),
      error => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`Successfully written to ${destFilePath}`);
    });

    indexFileLines.push(`export { default as ${langCode.replace('-', '')} } from './${langCode}';`);
  });

  const destIndexFilePath = `../src/data/lang/index.js`;
  fs.writeFile(destIndexFilePath,
    indexFileLines.join('\r\n'),
    error => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`Successfully written to ${destIndexFilePath}`);
    });
}

const generateSingleTranslatedData = (translationKeyList, translationDataByLanguage, languageNameInEnglishList, languageNameInNativeList, translationKeyMetadata) => {
  const output = [];

  translationDataByLanguage.forEach((translationData, translationDataIndex) => {
    const languageNameInEnglish = languageNameInEnglishList[translationDataIndex];
    const languageNameInNative = languageNameInNativeList[translationDataIndex];
    const languageDisplay = languageNameInEnglish && languageNameInNative &&
    languageNameInEnglish !== languageNameInNative
      ? `${languageNameInEnglish} / ${languageNameInNative}`
      : languageNameInEnglish;

    // Skip for English
    if (languageNameInEnglish.toLowerCase() === 'english') {
      return;
    }

    translationData.forEach((translatedText, index) => {
      const translationKey = translationKeyList[index];

      if (!translationKey) {
        console.log('Unable to find translationKey for language:', languageDisplay, 'index: ', index);
        return;
      }

      if (!translatedText) {
        console.log('No translatedText for language:', languageDisplay, 'translationKey: ', translationKey);
        return;
      }

      output.push([
        translationKey,
        translatedText,
        languageDisplay,
        translationKeyMetadata[translationKey].category
      ]);
    });
  });

  const destFilePath = `../src/Methods/data-generated.js`;
  fs.writeFile(destFilePath,
    'export default ' + JSON.stringify(output, null, 2),
    error => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`Successfully written to ${destFilePath}`);
    });
}

/**
 * Transpose a 2D array.
 * e.g. convert
 * |1 2 3|
 * |4 5 6|
 * |7 8 9|
 * to
 * |1 4 7|
 * |2 5 8|
 * |3 6 9|
 * @param array
 * @returns {*[]}
 *
 * @ref https://stackoverflow.com/a/13241545/11560579
 */
const transpose = (array) => {
  return Object.keys(array[0]).map(function(c) {
    return array.map(function(r) { return r[c]; });
  });
}
