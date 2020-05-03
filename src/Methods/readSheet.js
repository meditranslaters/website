import {props__export} from '../App.js'
import data from './data.js'

export function getSupportedLanguages() {
  const languagesSupported = [
    "English",
    ...data.map(d => d[2]),
  ];

  // De-duplicate the language
  // return Array.from(new Set(languagesSupported));
  const arr = Array.from(new Set(languagesSupported));

  props__export.setState({supported_langs:[]})

  for( var i = 0 ; i < arr.length; i++) {
    props__export.setState({supported_langs:props__export.state.supported_langs.push(arr[i])})
  }
}

export function getLanguageData(lang_a, lang_b) {
  const lang_data = readLanguageData(lang_a, lang_b)

  // return {
  //   a_languagedata: lang_data["a_languagedata"],
  //   a_language: lang_a,
  //   b_languagedata: lang_data["b_languagedata"],
  //   b_language: lang_b,
  //   categories: lang_data["categories"],
  // }

  setTimeout(
    function() {
      props__export.setState({a_languagedata:lang_data["a_languagedata"]})
      props__export.setState({a_language:lang_a})
      props__export.setState({b_languagedata:lang_data["b_languagedata"]})
      props__export.setState({b_language:lang_b})
      props__export.setState({categories:lang_data["categories"]})
    }
    .bind(this),
    100
  );
}


export function onChangeCategory(item){
  this.setState({category_selected:item})
}

export function onChangeSearch(e){
  this.setState({search_input:e.target.value})
}

function readLanguageData(language_a,language_b) {
  let rows = data;
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
      ...filteredData.map(item => item[3]),
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
      ...filteredData.map(item => item[3]),
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
    var language_a_data = []
    var language_b_data = []
    var lang_dict= {}
    var categories = {}

        // Your CSV data is in an array of arrys passed to this callback as rows.
    for(var i = 0 ; i < rows.length ; i++){
          if(rows[i][2] == language_a){
            lang_dict[rows[i][0]] = {}
          }
          if(rows[i][2] == language_b){
            lang_dict[rows[i][0]] = {}
          }
    }
    for(var i = 0 ; i < rows.length ; i++){
          if(rows[i][2] == language_a){
            lang_dict[rows[i][0]][language_a] = [rows[i][1],rows[i][3]]
            categories[rows[i][3]] = ""
          }
          if(rows[i][2] == language_b){
            lang_dict[rows[i][0]][language_b] = [rows[i][1],rows[i][3]]
            categories[rows[i][3]] = ""
          }
    }
    // console.log('Sepearted Translations',lang_dict)
    var final_categories = ["All"]
    // console.log('Category JSON',categories)

    for(var i in categories){
        final_categories.push(i)
    }
    for(var i in lang_dict){
        if(lang_dict[i][language_a] != null && lang_dict[i][language_b]!= null ){
          language_a_data.push(lang_dict[i][language_a])
          language_b_data.push(lang_dict[i][language_b])
        }

    }

    response_json["a_languagedata"] = language_a_data.map((item, index) => ({ ...item, number: index + 1 }))
    response_json["b_languagedata"] = language_b_data.map((item, index) => ({ ...item, number: index + 1 }))
    response_json["categories"] = final_categories
    return response_json
  }

  return response_json;
}
