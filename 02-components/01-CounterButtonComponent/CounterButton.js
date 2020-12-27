export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: '<button type="button" @click="incrementCounter">{{ count }}</button>',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  // Компонент должен иметь модель
  model: {
    prop: 'count',
    event: 'increment'
  },
  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {

    incrementCounter() {

      let value = this.count + 1;
      this.$emit('increment', value);

    }
    
  },
};
