const fs = require('fs');
const {Chocolate, Strawberry, Sweet} = require("./cookie")

class Kitchen {
    constructor(container) {
        this.container = container || [];
    }

    static getCookies() {
        let cookies = JSON.parse(fs.readFileSync("./data.json", "utf8"));
        
        cookies = cookies.map((cookie) =>{
            const {id, name, price, ingredients, type, isSweet} = cookie;
            switch(type){
                case "chocolate":
                    return new Chocolate(id, name, price, ingredients, type, isSweet);
                    break;
                case "strawberry":
                    return new Strawberry(id, name, price, ingredients, type, isSweet);
                    break;
                case "sweet":
                    return new Sweet(id, name, price, ingredients, type, isSweet);
                    break;
            }
        })
        return cookies;
    }

    static bake(...cookies) {
        let getCookies = this.getCookies()
        const {name, price, ingredients, type, isSweet} = cookies;
        let id;
        if (getCookies.length === 0) {
            id = 1;
        } else {
            let lastIndex = getCookies.length - 1;
            id = getCookies[lastIndex].id + 1;
        }
        
        switch(type){
            case "chocolate":
                getCookies.push(new Chocolate(id, name, price, ingredients, type, isSweet));
                break;
            case "strawberry":
                getCookies.push(new Strawberry(id, name, price, ingredients, type, isSweet));
                break;
            case "sweet":
                getCookies.push(new Sweet(id, name, price, ingredients, type, isSweet));
                break;
            }
            this.container = getCookies;
            this.save(getCookies);
    }

    static eat(id) {
        let cookies = this.getCookies();
        let eat = cookies.filter((cookie) => cookie.id !== id);

        if (eat.length === cookies.length) {
            console.log(`ID ${id} not found or cannot be deleted.`);
        } else {
            console.log(`ID ${id} has been removed.`);
            this.save(eat);
        }
        
    }

    static addSugar(id) {
        let cookies = getCookies();
        let isSweet = cookies

    }
        
    static showCookies() {
        console.log(`Cookie yang tersedia :`);
        this.container.forEach(cookie => {
            console.log(`id: ${cookie.id}, name: ${cookie.name}, isSweet: ${cookie.isSweet}`);
        });
    }

    static save(data) {
        const datastring = JSON.stringify(data, null, 3);
        fs.writeFileSync("./data.json", datastring)
    }
    
}

// Kitchen.addCookies('kue tiramisu', 25000, ["tepung", "air", "telor"], "chocolate", );
Kitchen.bake('kue tiramisu', 25000, ["tepung", "air", "telor"], "chocolate", )