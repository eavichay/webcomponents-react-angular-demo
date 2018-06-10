const template = `
<style>
    #container {
      position: relative;
      background: blue;
      padding: 1rem;
      color: white;
      letter-spacing: 0.03rem;
      border-radius: 0.5rem;
    }
    
    :host(.approach) {
        opacity: 0.9;
        top: 4rem;
    }

    :host {
      user-select: none;
      transition: all 800ms ease-out;
      display: block;
      opacity: 0;
      z-index: 90;
      display: block;
      position: absolute;
      left: 6rem;
      top: -5rem;
    }
</style>
<div id="main">
  <slot name="icon"></slot>
  <span id="container"></span>
</div>
`;
export default class SuperToast extends HTMLElement {
    constructor() {
        super();
        this.delay = '2000';
        this.message = 'You forgot the message';
        this.offsetY = 0;
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = template;
        this.container = this.shadow.querySelector('#container');
    }
    static get is() {
        return 'super-toast';
    }
    appear() {
        if (this.container) {
            this.container.textContent = this.message;
            this.container.style.backgroundColor = this.color;
            this.container.style.top = this.offsetY + 'rem';
        }
        setTimeout(() => {
            this.classList.add('approach');
        }, 0);
        setTimeout(() => this.kill(), Number(this.delay));
    }
    kill() {
        const animation = this.animate([
            { transform: 'skewX(-10deg)', left: '6rem', opacity: 0.8 },
            {
                transform: 'skewX(-10deg)',
                left: '0',
                opacity: 0.8,
            },
            {
                transform: 'skewX(-20deg) scaleX(10)',
                left: '100vw',
                opacity: 0,
            },
        ], {
            duration: 300,
            easing: 'ease-in',
        });
        animation.onfinish = () => this.remove();
    }
    static create(message, color = 'green') {
        const toast = new SuperToast();
        toast.color = color;
        toast.message = message;
        document.body.appendChild(toast);
        return toast;
    }
}
customElements.define('super-toast', SuperToast);
