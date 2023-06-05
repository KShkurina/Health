/**
 * function that emulates server response
 * @param {number} count number of cards to be generated
 * @param {number} needId generates random id if true
 * @returns {Array} array of cards
 */
export const generateRandomCards = (count = 10, needId = true) => Array(count).fill(null).map(() => {
  const date = new Date();
  const doctorTypes = [
    ['Cardiologist', 'кардиологу'],
    ['Dentist', 'стоматологу'],
    ['Therapist', 'терапевту']
  ];
  const descriptionTypes = ['Визит для консультации', 'Осмотр', 'Диагностика'];
  const urgencyTypes = ['high', 'normal', 'low'];
  const docRandom = Math.floor(Math.random() * 3);
  const diseaseTypes = ['Герпес', 'Аллергия', 'Дислексия', 'Клептомания', 'Воспаление хитрости'];

  const sex = Math.round(Math.random());
  const firstNames = [
    'Никифор,Игорь,Юхим,Афанасий,Зорян,Александр,Орест,Ярополк,Евгений,Нестор,Федор,Руслан,Тимофей,Илья,Андрей,Глеб'.split(','),
    'Эвелина,Кристина,Неля,Эмма,Галина,Инга,Дарья,Виола,Дина,Марианна,Тата,Ярина,Одарка,Ольга,Иванна,Вера'.split(',')
  ];
  const lastNames = [
    'Базика,Швец,Устименко,Якимчук,Марков,Верхоляк,Полторак,Юрченко,Манило,Резниченко,Демиденко,Кирилюк,Гуденко,Токар,Онищенко,Глебовицкий'.split(','),
    'Ганкевич,Холодна,Карташевская,Чекалюк,Кабалюк,Головченко,Юркова,Андриенко,Коциловская,Высоцкая,Антонец,Франко,Подзигун,Белей,Ятченко,Крупская'.split(',')
  ];
  const clientFirstName = firstNames[sex][Math.floor(Math.random() * firstNames[sex].length)];
  const clientLastName = lastNames[sex][Math.floor(Math.random() * lastNames[sex].length)];

  const body = {
    title: `Визит к ${doctorTypes[docRandom][1]}`,
    description: descriptionTypes[Math.floor(Math.random() * descriptionTypes.length)],
    doctor: doctorTypes[docRandom][0],
    urgency: urgencyTypes[Math.floor(Math.random() * urgencyTypes.length)],
    client: `${clientLastName} ${clientFirstName}`,
    status: false
  }

  switch (docRandom) {
    case 0: {
      const randBP = Math.floor(100 + Math.random() * 60);
      const upperBP = randBP - randBP % 5;
      const lowerBP = upperBP - (10 * Math.floor(2 + Math.random() * 3));
      body.bp = `${upperBP}/${lowerBP}`;
      body.bmi = Math.floor(18 + Math.random() * 18);
      body.disease = diseaseTypes[Math.floor(Math.random() * diseaseTypes.length)];
    }
    case 2: {
      body.age = Math.floor(15 + Math.random() * 84);
      break;
    }
    case 1: {
      body.lastVisit = new Date(date.setDate(date.getDate() - Math.floor(Math.random() * 730))).toLocaleDateString();
    }
  }

  if (needId) body.id = Math.floor(1000 + Math.random() * 8999);
  return body;
});

/**
 * functions returns random number
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
export const rand = (min = 0, max = 1) => {
  if (max === 1 && min === 0) return Math.random();
  if (max === 1) return Math.round(Math.random() * min);
  return Math.round(min + Math.random() * (max - min))
}

// ENG Names:
// const firstNames = ['Mackie', 'Ashlee-jay', 'Arann', 'Alexander', 'Reece', 'Chiqal', 'Georgy', 'Renars', 'Jaime', 'Macsen', 'Caidyn', 'Bailee', 'Christopher', 'Marko', 'Judah', 'Nayan', 'Jaise', 'Dion', 'Benn', 'Sharland'];
// const lastNames = ['Rice', 'Wilkerson', 'Arnold', 'Kidd', 'Acosta', 'Collier', 'Shepherd', 'Yates', 'Cross', 'Becker', 'Perkins', 'Bean', 'Gentry', 'Mercer', 'Dudley', 'England', 'Hanson', 'Oconnor', 'House', 'Pennington'];