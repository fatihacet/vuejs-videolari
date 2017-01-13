window.addEventListener('load', () => {

  Vue.component('hello', {
    template: `
      <h1 @click="sayHello">Hello Component</h1>
    `,
    methods: {
      sayHello() {
        console.log('Hello World!');
      }
    }
  });

  window.vue = new Vue({
    el: '#app'
  })

});
