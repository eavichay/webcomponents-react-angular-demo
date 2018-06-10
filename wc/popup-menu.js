const iconBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAABlBMVEUAAAAzMzPI8eYgAAAAAXRSTlMAQObYZgAAABxJREFUeAFjIBOMAv7/UPCBlhzywWgYjIbBKAAANijXKaI5RRgAAAAASUVORK5CYII=';
const { Slim } = window;
class PopupMenu extends Slim {
    constructor() {
        super(...arguments);
        this.isOpen = false;
        this.anyClick_ = this.anyClick.bind(this);
    }
    static get observedAttributes() {
        return ['icon-type'];
    }
    get useShadow() {
        return true;
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.iconType = newValue;
    }
    triggerClick(event) {
        this.isOpen = !this.isOpen;
    }
    anyClick(event) {
        const path = event['path'];
        if (path.indexOf(this) === -1) {
            this.isOpen = false;
        }
    }
    onAdded() {
        window.addEventListener('mouseup', this.anyClick_);
    }
    onRemoved() {
        window.removeEventListener('mouseup', this.anyClick_);
    }
}
if (window['Slim'])
    window['Slim'].tag('popup-menu', `
<span s:id="trigger" id="trigger" mousedown="triggerClick">
    <i></i>
</span>
<div s:id="content" bind:is-visible="isOpen" mouseup="triggerClick">
    <ul><slot></slot></ul>
</div>
<style>
    :host {
        display: inline-flex;
        position: relative;
        user-select: none;
    }
    
    i:hover {
        cursor: context-menu;
    }

    i {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-size: contain;
        background-image: url(${iconBase64});
    }

    div {
        text-align: left;
        display: none;
        position: absolute;
        bottom: 0;
        left: 30px;
        background: white;
        border: 1px solid black;
        border-radius: 0.5rem;
        white-space: nowrap;
    }
    
    div[is-visible="true"] {
        display: block;
    }
    ul {
        list-style-type: none;
        padding: 0.5rem;
    }
    
    ::slotted(li) {
        margin-left: 0;
        cursor: pointer;
        text-overflow: ellipsis;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        user-select: none;
    }
    
    ::slotted(li:hover) {
        background: var(--primary);
        color: var(--light);
    }
    
</style>
`, PopupMenu);
export default PopupMenu;
