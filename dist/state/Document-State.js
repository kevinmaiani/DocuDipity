export class DocumentState {
    constructor() {
        this.observers = [];
    }
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    notifyDelete(itemsId) {
        // for (const observer of this.observers) {
        //   for (const id of itemsId) {
        //     if(observer.value() === id) {
        //       observer.deleteElement();
        //       //this.detach(k);
        //     }      
        //   }
        // }
        for (let i = this.observers.length - 1; i >= 0; i--) {
            if (itemsId.indexOf(this.observers[i].value()) > -1) {
                this.observers[i].deleteElement();
                this.detach(this.observers[i]);
            }
        }
    }
}
