import data from './data.js'

const transformedData = data.map(d => ({
  translationKey: d[0],
  translatedText: d[1],
  language: d[2],
  category: d[3],
}))

export function getSupportedLanguages() {
  const languagesSupported = [
    "English",
    ...transformedData.map(d => d.language),
  ];

  // De-duplicate the language
  return Array.from(new Set(languagesSupported));
}

export function getLanguageData(languageFrom, languageTo) {
  const { languageFromData, languageToData, categories } = readLanguageData(languageFrom, languageTo)

  return {
    languageFromData,
    languageFrom,
    languageToData,
    languageTo,
    categories,
  }
}

function readLanguageData(languageFrom,languageTo) {
  const output = {
    "languageFromData": [],
    "languageToData": [],
    "categories": []
  };

  if (languageFrom === "English" && languageTo === "English") {
    return output;
  }

  if (languageFrom === "English" && languageTo !== "English") {
    const filteredData = transformedData.filter(item => item.language === languageTo);
    const languageFromData = filteredData.map((item, index) => ({
      text: item.translationKey,
      category: item.category,
      number: index + 1,
    }));
    const languageToData = filteredData.map((item, index) => ({
      text: item.translatedText,
      category: item.category,
      number: index + 1,
    }));

    const categories = [
      "All",
      ...Array.from(new Set(filteredData.map(item => item.category))),
    ];

    return {
      languageFromData,
      languageToData,
      categories,
    }
  }

  if (languageFrom !== "English" && languageTo === "English") {
    const filteredData = transformedData.filter(item => item.language === languageFrom);
    const languageFromData = filteredData.map((item, index) => ({
      text: item.translatedText,
      category: item.category,
      number: index + 1,
    }));
    const languageToData = filteredData.map((item, index) => ({
      text: item.translationKey,
      category: item.category,
      number: index + 1,
    }));

    const categories = [
      "All",
      ...Array.from(new Set(filteredData.map(item => item.category))),
    ];

    return {
      languageFromData,
      languageToData,
      categories,
    }
  }

  if (languageFrom !== "English" && languageTo !== "English") {
    const languageFromData = []
    const languageToData = []

    const filteredData = transformedData.filter(item => item.language === languageFrom || item.language === languageTo);

    const langDict = filteredData.reduce((acc, curr) => {
      const { translationKey, translatedText, language, category } = curr;

      if (!acc[translationKey]) {
        acc[translationKey] = {};
      }

      acc[translationKey][language] = {
        text: translatedText,
        category,
      };

      return acc;
    }, {});

    const categories = [
      "All",
      ...Array.from(new Set(filteredData.map(item => item.category))),
    ]

    for (const prop in langDict) {
      if (langDict.hasOwnProperty(prop)) {
        const langFromData = langDict[prop][languageFrom]
        const langToData = langDict[prop][languageTo]

        if (langFromData && langToData) {
          languageFromData.push(langFromData)
          languageToData.push(langToData)
        }
      }
    }

    return {
      languageFromData: languageFromData.map((item, index) => ({ ...item, number: index + 1 })),
      languageToData: languageToData.map((item, index) => ({ ...item, number: index + 1 })),
      categories,
    }
  }

  return output;
}
