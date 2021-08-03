export class TemplateRenderer extends HTMLElement {    
  constructor() {
      super();
      this.attachShadow({mode: 'open'});
  }

  protected render(this:any) 
  {       
      this.shadowRoot!.innerHTML = this.template;
  }
}