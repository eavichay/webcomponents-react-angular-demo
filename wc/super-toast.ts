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
`

export default class SuperToast extends HTMLElement {
  public delay: string = '2000'

  public message: string = 'You forgot the message'
  public color: string
  public offsetY: number = 0

  private container: HTMLSpanElement | null

  public shadow: ShadowRoot

  static get is() {
    return 'super-toast'
  }

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.innerHTML = template
    this.container = this.shadow.querySelector('#container')
  }

  public appear(): void {
    if (this.container) {
      this.container.textContent = this.message
      this.container.style.backgroundColor = this.color
      this.container.style.top = this.offsetY + 'rem'
    }
    setTimeout(() => {
      this.classList.add('approach')
    }, 0)
    setTimeout(() => this.kill(), Number(this.delay))
  }

  public kill(): void {
    const animation: any = (<any>this).animate(
      [
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
      ],
      {
        duration: 300,
        easing: 'ease-in',
      }
    )
    animation.onfinish = () => this.remove()
  }

  static create(message: string, color: string = 'green'): SuperToast {
    const toast = new SuperToast()
    toast.color = color
    toast.message = message
    document.body.appendChild(toast)
    return toast
  }
}

customElements.define('super-toast', SuperToast)
