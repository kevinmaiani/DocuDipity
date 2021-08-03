export class DocumentState {
  private observers: any[] = [];

  constructor() {}

  attach(observer: DocumentObserver) 
  {
    this.observers.push(observer);
  }

  detach(observer: DocumentObserver) 
  {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  notifyDelete(itemsId: any) {
    for(let i = this.observers.length -1;  i >= 0; i--) 
    {
      if(itemsId.indexOf(this.observers[i].value()) > -1)
      {
        this.observers[i].deleteElement();
        this.detach(this.observers[i]);
      }
    }
  }
}
