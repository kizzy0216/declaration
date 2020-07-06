import generateRandomNumber from './generateRandomNumber';
import commonEnglishWords from './commonEnglishWords';

const generatePasscode = (numberOfWords = 4) => {
  const words = [...Array(numberOfWords)]
    .map(() => commonEnglishWords[generateRandomNumber(0, commonEnglishWords.length - 1)]);

  return words.join('-');
}

export default generatePasscode;
