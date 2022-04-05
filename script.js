//Creating our Object class to store Product Stock
class UserObjects {
    constructor() {
        this.stock_quantity = document.getElementById("items_value");
        this.stock_price = document.getElementById("items_price");
        this.stock_select = document.getElementById("stock_select");
        this.stock_select_r = document.getElementById("stock_select_r");
        this.userEmail = document.getElementById("email");
        this.sale_quantity = document.getElementById("items_value_r");
//Stock Objects
        this.existingStock = {
                smoothie_stock_price: 0,
                smoothie_stock_quantity: 0,
                lemon_stock_price: 0,
                lemon_stock_quantity: 0,
                espresso_stock_price: 0,
                espresso_stock_quantity: 0,
                existingEmail: [], BuyerEmail(CustomerEmail) {
                    this.existingEmail = [...this.existingEmail, CustomerEmail]
                }
            }
    }
}
//Creating a class to add Stock
class AddNewStock extends UserObjects {
    constructor() {
        super();
    }
    adding_stock() {
        if (this.stock_select.value === "") {
            alertify.alert("Product not chosen").set('basic', true);
        } else if (this.stock_quantity.value === "") {
            alertify.alert("Quantity is empty").set('basic', true);
        } else if (this.stock_price.value === "") {
            alertify.alert("Stock price is empty").set('basic', true);
        } else {
            const my_products = this.stock_select.value;
            switch (my_products) {
                case "smoothie":
                    this.existingStock.smoothie_stock_price = this.stock_price.value;
                    this.existingStock.smoothie_stock_quantity = parseInt(this.existingStock.smoothie_stock_quantity) + parseInt(this.stock_quantity.value);
                    alertify.alert("New Stock Added").set('basic', true);
                    this.stock_select.value = "";
                    break;
                case "lemon":
                    this.existingStock.lemon_stock_price = this.stock_price.value;
                    this.existingStock.lemon_stock_quantity = parseInt(this.existingStock.lemon_stock_quantity) + parseInt(this.stock_quantity.value);
                    alertify.alert("New Stock Added").set('basic', true);
                    this.stock_select.value = "";
                    break;
                case "espresso":
                    this.existingStock.espresso_stock_price = this.stock_price.value;
                    this.existingStock.espresso_stock_quantity = parseInt(this.existingStock.espresso_stock_quantity) + parseInt(this.stock_quantity.value);
                    alertify.alert("New Stock Added").set('basic', true);
                    this.stock_select.value = "";
                    break;
                default:
                    alertify.alert("Stock not valid").set('basic', true);
                    this.stock_select.value = "";
                    break;
            }
            this.stock_quantity.value = "";
            this.stock_price.value = ""
        }
    }
}
// Creating a Class to Remove Stock
class RemoveCurrentStock extends AddNewStock{
    constructor() {
        super();
    }
    removal_stock() {
        if (this.existingStock.existingEmail.includes(this.userEmail.value)) {
            alertify.alert(`Cannot make another purchase for user: ${this.userEmail.value}`).set('basic', true);
        }  else if (this.stock_select_r.value === "") {
            alertify.alert("Product not chosen").set('basic', true);
        } else if (this.userEmail.value === "") {
            alertify.alert("User's Email is empty").set('basic', true);
        } else if (this.sale_quantity.value === "") {
            alertify.alert("Quantity is empty").set('basic', true);
        } else {
            this.sale();
        }
    }
    sale(){
            const products_for_sale = this.stock_select_r.value;
                if ( products_for_sale === "smoothie" && this.existingStock.smoothie_stock_quantity >= this.sale_quantity.value) {
                    this.existingStock.smoothie_stock_quantity = parseInt(this.existingStock.smoothie_stock_quantity) - parseInt(this.sale_quantity.value);
                    this.existingStock.existingEmail.push(this.userEmail.value);
                    alertify.alert(`Item shipped to ${this.userEmail.value}!`).set('basic', true);
                    this.stock_select_r.value = "";
                }
                else if ( products_for_sale === "lemon" && this.existingStock.lemon_stock_quantity >= this.sale_quantity.value) {
                    this.existingStock.lemon_stock_quantity = parseInt(this.existingStock.lemon_stock_quantity) - parseInt(this.sale_quantity.value);
                    this.existingStock.existingEmail.push(this.userEmail.value);
                    alertify.alert(`Item shipped to ${this.userEmail.value}!`).set('basic', true);
                    this.stock_select_r.value = "";
                }
                else if ( products_for_sale === "espresso" && this.existingStock.espresso_stock_quantity >= this.sale_quantity.value) {
                    this.existingStock.espresso_stock_quantity = parseInt(this.existingStock.espresso_stock_quantity) - parseInt(this.sale_quantity.value);
                    this.existingStock.existingEmail.push(this.userEmail.value);
                    alertify.alert(`Item shipped to ${this.userEmail.value}!`).set('basic', true)
                    this.stock_select_r.value = "";
                }
                else{
                    alertify.alert(`${this.stock_select_r.value} is low in Stock!`).set('basic', true);
                    this.stock_select_r.value = "";
                }
            this.userEmail.value = "";
            this.sale_quantity.value = "";
        }

}

// Creating Modal click events
class modal_events extends AllStock([RemoveCurrentStock,AddNewStock]){
    constructor() {
        super();
        this.$add_new_stock = document.querySelector("#add_button");
        this.$sell_current_stock = document.querySelector("#remove_button");
        this.$sm_price = document.querySelector("#smoothie_price");
        this.$lm_price = document.querySelector("#lemon_price");
        this.$es_price = document.querySelector("#espresso_price");
        this.$sm_quantity = document.querySelector("#smoothie_stock");
        this.$lm_quantity = document.querySelector("#lemon_stock");
        this.$es_quantity = document.querySelector("#espresso_stock");
        this.$userEmail = document.querySelector("#customerEmails");
        this.addEventListeners();
    }

    handleFormClick(event){
        event.preventDefault();
        const addToStock = this.$add_new_stock.contains(event.target);
        const shipStockNow = this.$sell_current_stock.contains(event.target);
        if(addToStock){
            this.adding_stock();
        }
        if(shipStockNow){
            this.removal_stock();
        }
        this.stockInnerHtml();
    }
    addEventListeners(){
        document.body.addEventListener("click", (event) =>{
            this.handleFormClick(event);
            event.preventDefault();
        })
    }

    stockInnerHtml(){
        localStorage.setItem('existingStock', JSON.stringify(this.existingStock));
        const myStock = JSON.parse(localStorage.getItem('existingStock')) || [];
        this.$sm_price.innerHTML = `R${myStock.smoothie_stock_price}`;
        this.$sm_quantity.innerHTML = `${myStock.smoothie_stock_quantity.toString()}`;
        this.$lm_price.innerHTML = `R${myStock.lemon_stock_price}`;
        this.$lm_quantity.innerHTML = `${myStock.lemon_stock_quantity.toString()}`;
        this.$es_price.innerHTML = `R${myStock.espresso_stock_price}`;
        this.$es_quantity.innerHTML = `${myStock.espresso_stock_quantity.toString()}`;
        this.$userEmail.innerHTML = `${myStock.existingEmail.join('<hr>')}`;
    }

}
// Call both RemoveCurrentStock and AddNewStock classes to MainDisplay class
// Couldn't find how to extend two classes at the same time, thanks to StackOverflow!
function AllStock(bases) {
    class Bases {
        constructor() {
            bases.forEach(base => Object.assign(this, new base()));
        }
    }
    bases.forEach(base => {
        Object.getOwnPropertyNames(base.prototype)
            .filter(prop => prop !== 'constructor')
            .forEach(prop => Bases.prototype[prop] = base.prototype[prop])
    })
    return Bases;
}

const output = new modal_events();