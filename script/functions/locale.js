/**
 * object that returns key or value if available in the vocabulary
 * @returns {string} text or empty string
 */

export default new Proxy({
  age: ['Возраст'],
  bmi: ['Индекс массы тела', 'BMI'],
  bp: ['Кровяное давление', 'Blood preasure'],
  description: ['Описание'],
  title: ['Цель'],
  urgency: ['Срочность'],
  client: ['Клиент'],
  lastVisit: ['Дата последнего визита'],
  disease: 'Болезни',
  Therapist: 'Терапевт',
  Cardiologist: 'Кардиолог',
  Dentist: 'Стоматолог',
  loginMissingText: 'Необходимо ввести email и пароль!',
  wrongEmailPassword: 'Неверный email или пароль!',
  email: 'Email',
  password: 'Пароль',
  high: 'Высокая',
  normal: 'Обычная',
  low: 'Низкая',
  comments: 'Комментарии',
  'Choose a doctor': 'Выберите врача',
  
  'Show more': 'Детально',
  'Show less': 'Скрыть',
  'Visit done': 'Завершен'
}, {
  get(target, request) {
    if (request in target) {
      if (Array.isArray(target[request])) return target[request][0];
      return target[request];
    }

    for (const [key, value] of Object.entries(target)) {
      let result = '';
      if (Array.isArray(value)) result = value.filter(piece => 
        piece === request).join('');
      if (result || value === request) return key;
    }

    return request;
  },

  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver)
  }
})