<template>
  <div>
    <button type="button" @click="incrementCounter">{{ count }}</button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  methods: {
    incrementCounter() {
      let value = this.count + 1;
      this.$emit('increment', value);
    },
  },
};
</script>

<style></style>
