import data from './data.js'

export function getSupportedLanguages() {
  const languagesSupported = [
    "English",
    ...data.map(d => d[2]),
  ];

  // De-duplicate the language
  return Array.from(new Set(languagesSupported));
}

export function getLanguageData(lang_a, lang_b) {
  const lang_data = readLanguageData(lang_a, lang_b)

  return {
    a_languagedata: lang_data["a_languagedata"],
    a_language: lang_a,
    b_languagedata: lang_data["b_languagedata"],
    b_language: lang_b,
    categories: lang_data["categories"],
  }
}

function readLanguageData(language_a,language_b) {
  const response_json = {
    "a_languagedata": [],
    "b_languagedata": [],
    "categories": []
  };

  if (language_a === "English" && language_b === "English") {
    return response_json;
  }

  if (language_a === "English" && language_b !== "English") {
    const filteredData = data.filter(item => item[2] === language_b);
    const language_a_data = filteredData.map(item => [item[0], item[3]]);
    const language_b_data = filteredData.map(item => [item[1], item[3]]);

    const categories = [
      "All",
      ...Array.from(new Set(filteredData.map(item => item[3]))),
    ];

    return {
      a_languagedata: language_a_data.map((item, index) => ({ ...item, number: index + 1 })),
      b_languagedata: language_b_data.map((item, index) => ({ ...item, number: index + 1 })),
      categories,
    }
  }

  if (language_a !== "English" && language_b === "English") {
    const filteredData = data.filter(item => item[2] === language_a);
    const language_a_data = filteredData.map(item => [item[1], item[3]]);
    const language_b_data = filteredData.map(item => [item[0], item[3]]);

    const categories = [
      "All",
      ...Array.from(new Set(filteredData.map(item => item[3]))),
    ];

    return {
      a_languagedata: language_a_data.map((item, index) => ({ ...item, number: index + 1 })),
      b_languagedata: language_b_data.map((item, index) => ({ ...item, number: index + 1 })),
      categories,
    }
  }

  if (language_a !== "English" && language_b !== "English") {
    //get the translations for language a,b
    //seperate them for language a and language a and b
    const language_a_data = []
    const language_b_data = []

    const filteredData = data.filter(item => item[2] === language_a || item[2] === language_b);

    const lang_dict = filteredData.reduce((acc, curr) => {
      const [translationKey, translatedText, language, category] = curr;

      if (!acc[translationKey]) {
        acc[translationKey] = {};
      }

      acc[translationKey][language] = [translatedText, category];

      return acc;
    }, {});

    const categories = [
      "All",
      ...Array.from(new Set(filteredData.map(item => item[3]))),
    ]

    for (const prop in lang_dict) {
      if (lang_dict.hasOwnProperty(prop)) {
        const langAData = lang_dict[prop][language_a]
        const langBData = lang_dict[prop][language_b]

        if (langAData && langBData) {
          language_a_data.push(langAData)
          language_b_data.push(langBData)
        }
      }
    }

    return {
      a_languagedata: language_a_data.map((item, index) => ({ ...item, number: index + 1 })),
      b_languagedata: language_b_data.map((item, index) => ({ ...item, number: index + 1 })),
      categories,
    }
  }

  return response_json;
}
