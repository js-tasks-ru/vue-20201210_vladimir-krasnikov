import { agendaItemTitles, agendaItemIcons } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="itemIcon" />
      </div>
      <div class="meetup-agenda__item-col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ itemTitle }}</span></h5>
        <p v-show="agendaItem.speaker || agendaItem.language">
          <span v-show="agendaItem.speaker">{{ agendaItem.speaker }}</span>
          <span v-show="agendaItem.speaker && agendaItem.language" class="meetup-agenda__dot"></span>
          <span v-show="agendaItem.language" class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,

  // props
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  
  // Возможно, тут потребуется computed
  computed:{
    itemTitle() {
      return this.agendaItem.title ? this.agendaItem.title : agendaItemTitles[this.agendaItem.type];
    }, 
    itemIcon()  {
      return agendaItemIcons[this.agendaItem.type] ? '/assets/icons/icon-' + agendaItemIcons[this.agendaItem.type] + '.svg' : '/assets/icons/icon-cal-sm.svg';
    },
  },
};
