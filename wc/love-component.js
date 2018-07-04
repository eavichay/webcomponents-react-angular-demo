customElements.define('love-component', class extends HTMLElement {

  constructor() {
    super();
    this.createShadowRoot({mode: 'open'});
    this.shadowRoot.innerHTML = '<h1></h1>';
    this.header = this.shadowRoot.querySelector('h1');
		this.header.style.color = 'mediumvioletred';
    this.myText = 'Web Components';
		this.count = 0;
  }

	connectedCallback() {
		this.beatInterval = setInterval(() => {
		  this.count++;
			this.myText = this._myText;
		}, 1000);
	}

	disconnectedCallback() {
		clearInterval(this.beatInterval);
	}
  
  get hearts () {
    this.count = this.count || 0;
	  return Array(1 + this.count % 3).fill('❤️').join('');
  }

  set myText (value) {
		this._myText = value;
    this.header.textContent = 'Everyone loves ' + value + this.hearts;
  }

  get myText () {
    return this._myText;
  }

  static get observedAttributes() {
    return ['who'];
  }

  attributeChangedCallback(_, oldValue, newValue) {
    this.myText = newValue;
  }

});
