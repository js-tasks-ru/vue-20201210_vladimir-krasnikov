import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

// const fetchMeetupById = () => fetch(`${API_URL}/meetups/${MEETUP_ID}`).then((res) => res.json());


/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const getDateOnlyString = (date) => {
  
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2,'0');
  const DD = date.getUTCDate().toString().padStart(2,'0');

  return `${YYYY}-${MM}-${DD}`;
};

export const app = new Vue({
  el: '#app',

  data: {
    //
    rawMeetup: null,
  },

 async mounted() {
    // Требуется получить данные митапа с API
    this.rawMeetup = await this.getMeetupById(MEETUP_ID);
  },

  computed: {
    //
    meetup() {
      if(!this.rawMeetup){
        return null;
      }
      
      return { 
        ...this.rawMeetup,
        agenda: this.rawMeetup.agenda ? this.rawMeetup.agenda.map((item) => ({
          ...item,
          title: item.title ? item.title : agendaItemTitles[item.type],
          icon: agendaItemIcons[item.type] ? 'icon-' + agendaItemIcons[item.type] + '.svg' : 'icon-cal-sm.svg',
        })) : [],
        cover: this.rawMeetup.imageId ? getMeetupCoverLink(this.rawMeetup) : undefined,
        localDate: new Date(this.rawMeetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        // utcDate: this.rawMeetup.date,
        utcDate: getDateOnlyString(new Date(this.rawMeetup.date)),
      };
    }
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()
    getMeetupById: async function(meetupId) {
      const res = await fetch(`${API_URL}/meetups/${meetupId}`);
      return await res.json();
    },

  },
});
