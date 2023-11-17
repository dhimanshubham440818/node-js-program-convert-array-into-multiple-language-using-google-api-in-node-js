import fetch from 'node-fetch'
import fs from 'fs'
var sourceLang = 'en';
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
const array = ['hello', 'fuck off', 'bye'];
const english = {}
const china = {}
const hindi = {}
for (let i = 0; i < array.length; i++) {
  var hindi_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + 'hi' + "&dt=t&q=" + encodeURI(array[i]);
  var china_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + 'zh-CN' + "&dt=t&q=" + encodeURI(array[i]);
  var english_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + sourceLang + "&dt=t&q=" + encodeURI(array[i]);

  const hindi_result = await fetchData(hindi_url);
  const china_result = await fetchData(china_url);
  const english_result = await fetchData(english_url);
  hindi[array[i].replace(/\s+/g, '_')] = hindi_result[0][0][0]
  china[array[i].replace(/\s+/g, '_')] = china_result[0][0][0]
  english[array[i].replace(/\s+/g, '_')] = english_result[0][0][0].toUpperCase()
}
fs.writeFile('china.json', JSON.stringify(china), (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
  }
});
fs.writeFile('hindi.json', JSON.stringify(hindi), (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
  }
});
fs.writeFile('english.json', JSON.stringify(english), (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
  }
});