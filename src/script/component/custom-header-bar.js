//custom element header JS
class Header extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="meal-search">
                <h2 class="title">Aplikasi Web Resep Makanan</h2>
                <h3>Selamat Menunaikan Ibadah Puasa</h3>
            </div>
        `;
    }
}

customElements.define('custom-header-bar', Header);