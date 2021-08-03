import { TemplateRenderer } from "../templateRenderer.js";

export class DocuCardOptions {
    title?: string;
    author?: string;
    text?: string;
    fontSize?: string;
    align?: string;
    iconUrl?: string;
    rebind?: RebindDocuCardRequest;
    dataSource?: any[];

    onClick?: (e: Event) => void;
}

export class DocuCard  extends TemplateRenderer {

    private _showInfo : boolean;
    private _options: DocuCardOptions;

    constructor(options?: DocuCardOptions) {   
        super();

        if (options == null)
            options = new DocuCardOptions();

        this._options = options!; 
        this._showInfo = true; 

        super.render();
    }

    toogleInfo(event: Event) {
        event.preventDefault();
        this._showInfo = !this._showInfo;

        const info = (this.shadowRoot! as any).querySelector('.info') as HTMLDivElement;
        const toggleBtn = (this.shadowRoot! as any).querySelector('#toggle-info') as HTMLButtonElement;

        if(this._showInfo) {
            info!.style.display = 'block';
            toggleBtn!.innerHTML = 'Nascondi info';
        } else {
            info!.style.display = 'none';
            toggleBtn!.innerHTML = 'Mostra info';
        }
    }

    connectedCallback() {
        //this.getDoi();
        this.shadowRoot!.querySelector('#toggle-info')!
        .addEventListener('click',this.toogleInfo.bind(this));
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


    setTitle(title: string) {
        (this.shadowRoot! as any).querySelector('h3').innerText = title;
    }

    disconnectedCallback() {
        this.shadowRoot!.querySelector('#toggle-info')!.removeEventListener('click',this.toogleInfo.bind(this));
    }

    container() {
        return (this.shadowRoot! as any).closest("docudipityControlsContainer")[0]; //ereditato da classe padre 
    }

    host() {
        this.shadowRoot!.host;
    }
}
customElements.define('docu-card', DocuCard);

class RebindDocuCardRequest {
    public authKey?: string;
    public method?: string;
}

