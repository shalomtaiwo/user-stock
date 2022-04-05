//Creating our Object class to store Product Stock
declare var alertify: any;

class UserObjects {
    existingStock: {
        smoothie_stock_price: string;
        smoothie_stock_quantity: string;
        lemon_stock_price: string;
        lemon_stock_quantity: string;
        espresso_stock_price: string;
        espresso_stock_quantity: string;
        existingEmail: string[];
    };
    constructor(existingStock) {
//Stock Object
        this.existingStock = {
            smoothie_stock_price: "0",
            smoothie_stock_quantity: "0",
            lemon_stock_price: "0",
            lemon_stock_quantity: "0",
            espresso_stock_price: "0",
            espresso_stock_quantity: "0",
            existingEmail: [],
        }
        console.log("Hello");
    }
}

class AddNewStock extends UserObjects {
    stock_quantity;
    stock_price;
    stock_select;
    stock_select_r;
    userEmail;
    sale_quantity;
    constructor(existingStock) {
        super(existingStock);
        this.stock_quantity = document.getElementById("items_value");
        this.stock_price = document.getElementById("items_price");
        this.stock_select = document.getElementById("stock_select");
        this.stock_select_r = document.getElementById("stock_select_r");
        this.userEmail = document.getElementById("email");
        this.sale_quantity = document.getElementById("items_value_r");
    }
    adding_stock(){
        if (this.stock_select.value === "") {
            alertify.alert("Product Code required").set('basic', true);
        } else if (this.stock_quantity.value === "") {
            alertify.alert("Product Quantity required").set('basic', true);
        } else if (this.stock_price.value === "") {
            alertify.alert("Product price required").set('basic', true);
        } else {
            const my_products = this.stock_select.value;
            switch (my_products) {
                case "smoothie":
                    this.existingStock.smoothie_stock_price = this.stock_price.value
                    let sm:number = parseInt(this.existingStock.smoothie_stock_quantity) + parseInt(this.stock_quantity.value);
                    this.existingStock.smoothie_stock_quantity = sm.toString();
                    alertify.alert(`New stock added to ${this.stock_select.value}`).set('basic', true);
                    this.stock_select.value = "";
                    break;
                case "lemon":
                    this.existingStock.lemon_stock_price = this.stock_price.value;
                    let lm:number = parseInt(this.existingStock.lemon_stock_quantity) + parseInt(this.stock_quantity.value);
                    this.existingStock.lemon_stock_quantity = lm.toString();
                    alertify.alert(`New stock added to ${this.stock_select.value}`).set('basic', true);
                    this.stock_select.value = "";
                    break;
                case "espresso":
                    this.existingStock.espresso_stock_price = this.stock_price.value;
                    let es:number = parseInt(this.existingStock.espresso_stock_quantity) + parseInt(this.stock_quantity.value);
                    this.existingStock.espresso_stock_quantity = es.toString();
                    alertify.alert(`New stock added to ${this.stock_select.value}`).set('basic', true);
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
    constructor(existingStock,) {
        super(existingStock);
    }
    removal_stock() {
        if (this.existingStock.existingEmail.includes(this.userEmail.value)) {
            alertify.alert(`Cannot make another purchase for user: ${this.userEmail.value}`).set('basic', true);
        }  else if (this.stock_select_r.value === "") {
            alertify.alert("Product Code required").set('basic', true);
        } else if (this.userEmail.value === "") {
            alertify.alert("User's Email is required").set('basic', true);
        } else if (this.sale_quantity.value === "") {
            alertify.alert("Product Quantity required").set('basic', true);
        } else {
            this.sale();
        }
    }
    sale(){
        const products_for_sale = this.stock_select_r.value;
        if ( products_for_sale === "smoothie" && this.existingStock.smoothie_stock_quantity >= this.sale_quantity.value) {
            let sm_r:number = parseInt(this.existingStock.smoothie_stock_quantity) - parseInt(this.sale_quantity.value);
            this.existingStock.smoothie_stock_quantity = sm_r.toString();
            this.existingStock.existingEmail.push(this.userEmail.value);
            alertify.alert(`Item shipped to ${this.userEmail.value}!`).set('basic', true);
            this.stock_select_r.value = "";
        }
        else if ( products_for_sale === "lemon" && this.existingStock.lemon_stock_quantity >= this.sale_quantity.value) {
            let lm_r:number = parseInt(this.existingStock.lemon_stock_quantity) - parseInt(this.sale_quantity.value);
            this.existingStock.lemon_stock_quantity = lm_r.toString();
            this.existingStock.existingEmail.push(this.userEmail.value);
            alertify.alert(`Item shipped to ${this.userEmail.value}!`).set('basic', true);
            this.stock_select_r.value = "";
        }
        else if ( products_for_sale === "espresso" && this.existingStock.espresso_stock_quantity >= this.sale_quantity.value) {
            let es_r:number = parseInt(this.existingStock.espresso_stock_quantity) - parseInt(this.sale_quantity.value);
            this.existingStock.espresso_stock_quantity = es_r.toString();
            this.existingStock.existingEmail.push(this.userEmail.value);
            alertify.alert(`Item shipped to ${this.userEmail.value}!`).set('basic', true)
            this.stock_select_r.value = "";
        }
        else{
            alertify.alert(`${this.stock_select_r.value} is low in Stock/Out of Stock!`).set('basic', true);
            this.stock_select_r.value = "";
        }
        this.userEmail.value = "";
        this.sale_quantity.value = "";
    }

}

// Creating Modal click events
class modal_events extends RemoveCurrentStock{
    $add_new_stock;
    $sell_current_stock;
    $sm_price;
    $lm_price;
    $es_price;
    $sm_quantity;
    $lm_quantity;
    $es_quantity;
    $userEmail;
    constructor(existingStock) {
        super(existingStock);
        this.$add_new_stock = document.querySelector("#add_button");
        this.$sell_current_stock = document.querySelector("#remove_button");
        this.$sm_price = document.querySelector("#smoothie_price");
        this.$lm_price = document.querySelector("#lemon_price");
        this.$es_price = document.querySelector("#espresso_price");
        this.$sm_quantity = document.querySelector("#smoothie_stock");
        this.$lm_quantity = document.querySelector("#lemon_stock");
        this.$es_quantity = document.querySelector("#espresso_stock");
        this.$userEmail = document.querySelector("#customerEmails");
        const addBtn = document.querySelector(".main");
        addBtn.addEventListener('click',(event) => {
            event.preventDefault();
            this.handleFormClick(event);
        })    };


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


    stockInnerHtml(){
        this.$sm_price.innerHTML = `R${this.existingStock.smoothie_stock_price}`;
        this.$sm_quantity.innerHTML = `${this.existingStock.smoothie_stock_quantity.toString()}`;
        this.$lm_price.innerHTML = `R${this.existingStock.lemon_stock_price}`;
        this.$lm_quantity.innerHTML = `${this.existingStock.lemon_stock_quantity.toString()}`;
        this.$es_price.innerHTML = `R${this.existingStock.espresso_stock_price}`;
        this.$es_quantity.innerHTML = `${this.existingStock.espresso_stock_quantity.toString()}`;
        this.$userEmail.innerHTML = `${this.existingStock.existingEmail.join('<hr>')}`;
    }

}


let output = new modal_events(UserObjects);