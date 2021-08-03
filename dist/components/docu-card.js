import { TemplateRenderer } from "../template-rendered.js";
export class DocuCardOptions {
}
export class DocuCard extends TemplateRenderer {
    constructor(options) {
        super();
        if (options == null)
            options = new DocuCardOptions();
        this._options = options;
        this._showInfo = true;
        super.render();
        //this.shadowRoot!.appendChild(template.content.cloneNode(true));
        //il template è l'element che deve tornare dall'esterno
        //this.shadowRoot!.appendChild(template.content.cloneNode(true));
        //this.render();
        //(this.shadowRoot! as any).wrap("<div class='docudipityControlsContainer'></div>");
        // if (options.title != null) 
        //     (this.shadowRoot! as any).querySelector('h3').innerText = options.title;
        // if (options.fontSize != null) 
        //     (this.shadowRoot! as any).querySelector('.docu-card').style.fontSize = options.fontSize;
        // if (options.iconUrl != null) 
        //     (this.shadowRoot! as any).querySelector('img').src = options.iconUrl;
        // (this.shadowRoot! as any).querySelector('h3').innerText = "ciao";
        // (this.shadowRoot! as any).querySelector('img').src = "https://www.flaticon.com/svg/static/icons/svg/29/29611.svg";   
    }
    toogleInfo(event) {
        event.preventDefault();
        this._showInfo = !this._showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');
        if (this._showInfo) {
            info.style.display = 'block';
            toggleBtn.innerHTML = 'Nascondi info';
        }
        else {
            info.style.display = 'none';
            toggleBtn.innerHTML = 'Mostra info';
        }
    }
    connectedCallback() {
        //this.getDoi();
        this.shadowRoot.querySelector('#toggle-info')
            .addEventListener('click', this.toogleInfo.bind(this));
    }
    get template() {
        return `
        <style>
        .docu-card {
              font-family: 'Arial', sans-serif;
              background: #f4f4f4;
              display: grid;
              width: 500px;
              grid-template-columns: 1fr 2fr;
              grid-template-rows: repeat(2, min-content);
              grid-gap: 10px;
              margin-bottom: 15px;
              border-bottom: #108BFB 5px solid;
              align-items: center;
          }
          
          .check-docucard {
            grid-row: 1 / -1;
            grid-column: 1 / -1;
          }
          .docu-card img {
              width: 100%;
              height:50%;
              grid-columns: 1 / span 1;
          }
          
          .docucardDescription {
            grid-columns: 2 / -1;
          }

          .docu-card button {
              cursor: pointer;
              background: #108BFB;
              color: #fff;
              border: 0;
              border-radius: 5px;
              padding: 5px 10px;
              margin-bottom: 5px;
          }
          
          .docu-card:hover{
              background-color: #dedce2;
          }
        </style>
        <div class="docu-card">
        <input type="checkbox" class="check-docucard" />
          <img src=${this._options.iconUrl}/>
          <div class= "docucardDescription">
            <h3>${this._options.title}</h3>
            <div class="info">
              <p><slot name="desc" /></p>
              <p><slot name="abstract" /></p>
            </div>
            <button id="toggle-info">Nascondi Info</button>
          </div>
        </div>     
        `;
    }
    setTitle(title) {
        this.shadowRoot.querySelector('h3').innerText = title;
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener('click', this.toogleInfo.bind(this));
    }
    container() {
        return this.shadowRoot.closest("docudipityControlsContainer")[0]; //ereditato da classe padre 
    }
    host() {
        this.shadowRoot.host;
    }
}
customElements.define('docu-card', DocuCard);
class RebindDocuCardRequest {
}
