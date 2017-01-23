import Vue from 'vue'
import Preview from 'src/components/Preview'

describe('Preview.vue', () => {

  it('should list gifs', () => {

    const container = document.createElement('div');
    const PreviewComponent = Vue.extend(Preview);
    const vm = new PreviewComponent({
      propsData: {
        gifs: [
          { images: { fixed_height: { url: 'foo.gif' } } },
          { images: { fixed_height: { url: 'bar.gif' } } }
        ]
      }
    });

    vm.$mount(container);

    expect(vm.gifs.length).to.equal(2);
    expect(vm.$el.querySelectorAll('li').length).to.equal(2);
    expect(vm.$el.querySelector('li').firstChild.tagName).to.equal('IMG');
    expect(vm.$el.querySelector('li').firstChild.src).to.contain('foo.gif');

  })

})
