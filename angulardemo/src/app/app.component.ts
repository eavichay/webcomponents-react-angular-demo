import { Component } from '@angular/core'

import SuperToast from '../../../wc/super-toast'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private title = 'Angular - Web Components Demo'

  public love = 'Web Components'

  fireToast(message = this.love): void {
    const toast = new SuperToast()
    toast.color = 'green'
    toast.message = message
    toast.offsetY = 5
    document.body.appendChild(toast)
    toast.appear()
  }

  handleMenuSelect(event: MouseEvent): void {
    const target: HTMLElement = <HTMLElement>event.target
    if (
      target.localName === 'li' &&
      target.getAttribute('role') === 'menu-item'
    ) {
      const message = target.textContent
      this.fireToast(message)
    }
  }
}
