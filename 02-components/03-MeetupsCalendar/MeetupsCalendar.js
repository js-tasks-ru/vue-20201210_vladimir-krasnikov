/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="decrementMonth"></button>
          <div>{{ selectedMonthYear }}</div>
          <button class="rangepicker__selector-control-right" @click="incrementMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <template v-for="k in numberOfWeeks">
        <div class="rangepicker__cell" v-for="j in 7" :class="{ rangepicker__cell_inactive: days[j - 1 + (k-1)*7].inactive }">
          {{ days[j - 1 + (k-1)*7].dateCaption }}
          <a class="rangepicker__event" v-for="meetup in days[j - 1 + (k-1)*7].dateMeetups" :key="meetup.id">{{ meetup.title }}</a>
        </div>
        </template>
      </div>
    </div>
  </div>`,

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц
  data() {
    return {
      firstDay: this.getMonthFirstDay(new Date()),
      firstDayOfWeek: 1,
    };
  },

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed: {
    selectedMonthYear() {
      return this.firstDay.toLocaleString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    calendarDateFrom() {
      const day = this.firstDay.getDay();
      const diff =
        this.firstDayOfWeek < day
          ? day - this.firstDayOfWeek - 1
          : (6 + day - this.firstDayOfWeek) % 6;
      const dtFrom = diff
        ? new Date(new Date(this.firstDay).setDate(-diff))
        : new Date(this.firstDay);

      return dtFrom;
    },

    numberOfWeeks() {
      // Last day of the month (date)
      const lastDay = this.getMonthLastDay(this.firstDay);

      // Number of days in the month
      const numberOfDays = lastDay.getDate();

      // Week day number for the first day of the month
      const day = this.firstDay.getDay();

      // Days count from the first date on the calendar to the last day of the month
      const daysCount =
        numberOfDays +
        (this.firstDayOfWeek < day
          ? day - this.firstDayOfWeek
          : (7 + day - this.firstDayOfWeek) % 7);

      const weeksCount =
        daysCount % 7
          ? Math.floor(daysCount / 7) + 1
          : Math.floor(daysCount / 7);

      return weeksCount;
    },

    days() {
      let dayArr = [];
      let calDate = new Date(this.calendarDateFrom);

      for (let i = 0; i < this.numberOfWeeks * 7; i++) {
        let dayInfo = {
          date: calDate,
          dateCaption: calDate.getDate(),
          inactive: this.firstDay.getMonth() !== calDate.getMonth(),
          dateMeetups: this.meetups.filter(
            (meetup) =>
              new Date(meetup.date).getUTCFullYear() ===
                calDate.getUTCFullYear() &&
              new Date(meetup.date).getUTCMonth() === calDate.getUTCMonth() &&
              new Date(meetup.date).getUTCDate() === calDate.getUTCDate(),
          ),
        };

        dayArr.push(dayInfo);
        calDate.setDate(calDate.getDate() + 1);
      }

      return dayArr;
    },
  },

  // Методы понадобятся для переключения между месяцами
  methods: {
    getMonthFirstDay: function (date) {
      return new Date((new Date(date.getFullYear(), date.getMonth(), 1).toUTCString()));
    },

    getMonthLastDay: function (date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },

    incrementMonth: function () {
      this.firstDay = new Date(
        this.firstDay.getFullYear(),
        this.firstDay.getMonth() + 1,
        1,
      );
    },

    decrementMonth: function () {
      this.firstDay = new Date(
        this.firstDay.getFullYear(),
        this.firstDay.getMonth() - 1,
        1,
      );
    },
  },
};
