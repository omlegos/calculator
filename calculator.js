class Calculator{
    constructor(target = 'body'){
        this.target = document.querySelector(target);
        this.generateView();
    } 

    generateView(){
        this.generateButtons();
    }


    generateButtons(){
        Helper.generateHtmlElement(this.target, { 
            tag: 'input',
            attributes: {
                type : 'text',
                name : 'inputOutput'
            },
            eventListeners: [
                {
                    event: 'input',
                    name: this.validateInput
                }
            ]    
        });

        [...Helper.configuration.digits, ...Helper.configuration.operations].forEach(digit => {
            Helper.generateHtmlElement(this.target, {
                tag: 'input',
                attributes: {
                    type : 'button',
                    value : digit,
                    'data-attr' : digit
                },
                eventListeners: [
                    {
                        event: 'click',
                        name: this.insertValue
                    }
                ]    
                });
        });

        Helper.input = this.target.querySelector('input[type=text]');
    }

    insertValue(event){
        const value = event.toElement.getAttribute('data-attr');
        this.input.value += value;
    }

    validateInput(event){
        let value = event.target.value;
        event.target.value = value.match(this.configuration.inputRegex).pop() || '';
    }
}

class Helper{
    static input;
    static configuration = {
        inputRegex : /^((\d+(\.\d+)?)([\+\-\*\/]*(\d+(\.\d+)?)*)+)*/g,
        digits : [1,2,3,4,5,6,7,8,9,0],
        operations: ['.','+','-','*','/']
    }
    static generateHtmlElement(target, params){
        let elem = document.createElement(params.tag);
        for(let [key,value] of Object.entries(params.attributes)){
            elem.setAttribute(key, value);
        }
        for(let listener of params.eventListeners){
            elem.addEventListener(listener.event, listener.name.bind(this));
        }
        target.appendChild(elem);
    }

    
}

