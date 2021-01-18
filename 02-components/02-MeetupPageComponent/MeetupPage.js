import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div v-if="rawMeetup"><meetup-view :meetup="rawMeetup"></meetup-view></div>`,

  // components
  components: {
    MeetupView,
  },

  // data
  data: {
    // Raw Meetup
    rawMeetup: null,
  },

  // mounted
  async mounted() {
    // Get Data from API
    this.rawMeetup = await fetchMeetup(MEETUP_ID);
  },
  // methods
  
};
