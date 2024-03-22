//custom element footer JS
class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer>
        <h3>Tugas Front End Dicoding , Danangrestuaji@gmail.com</h3>
      </footer>
    `;
  }
}

customElements.define('custom-footer', Footer);