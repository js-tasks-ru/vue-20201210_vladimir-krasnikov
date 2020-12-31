import {getMeetupCoverLink} from './data.js';

export const MeetupCover = {
  template: `<div class="meetup-cover" :style="coverSyle">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  // props
  props: {
    link: {
      type: String,
    },
    title: {
      type: String,
    }

  },
  
  computed: {
    coverSyle() {
      return this.link ? "--bg-url: url('" + this.link + "')" : "";
      //--bg-url: url('https://course-vue.javascript.ru/api/images/2')
    },
  },
};
