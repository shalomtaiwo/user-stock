var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UserObjects = (function () {
    function UserObjects(existingStock) {
        this.existingStock = {
            smoothie_stock_price: "0",
            smoothie_stock_quantity: "0",
            lemon_stock_price: "0",
            lemon_stock_quantity: "0",
            espresso_stock_price: "0",
            espresso_stock_quantity: "0",
            existingEmail: [],
        };
        console.log("Hello");
    }
    return UserObjects;
}());
var AddNewStock = (function (_super) {
    __extends(AddNewStock, _super);
    function AddNewStock(existingStock) {
        var _this = _super.call(this, existingStock) || this;
        _this.stock_quantity = document.getElementById("items_value");
        _this.stock_price = document.getElementById("items_price");
        _this.stock_select = document.getElementById("stock_select");
        _this.stock_select_r = document.getElementById("stock_select_r");
        _this.userEmail = document.getElementById("email");
        _this.sale_quantity = document.getElementById("items_value_r");
        return _this;
    }
    AddNewStock.prototype.adding_stock = function () {
        if (this.stock_select.value === "") {
            alertify.alert("Product Code required").set('basic', true);
        }
        else if (this.stock_quantity.value === "") {
            alertify.alert("Product Quantity required").set('basic', true);
        }
        else if (this.stock_price.value === "") {
            alertify.alert("Product price required").set('basic', true);
        }
        else {
            var my_products = this.stock_select.value;
            switch (my_products) {
                case "smoothie":
                    this.existingStock.smoothie_stock_price = this.stock_price.value;
                    var sm = parseInt(this.existingStock.smoothie_stock_quantity) + parseInt(this.stock_quantity.value);
                    this.existingStock.smoothie_stock_quantity = sm.toString();
                    alertify.alert("New stock added to " + this.stock_select.value).set('basic', true);
                    this.stock_select.value = "";
                    break;
                case "lemon":
                    this.existingStock.lemon_stock_price = this.stock_price.value;
                    var lm = parseInt(this.existingStock.lemon_stock_quantity) + parseInt(this.stock_quantity.value);
                    this.existingStock.lemon_stock_quantity = lm.toString();
                    alertify.alert("New stock added to " + this.stock_select.value).set('basic', true);
                    this.stock_select.value = "";
                    break;
                case "espresso":
                    this.existingStock.espresso_stock_price = this.stock_price.value;
                    var es = parseInt(this.existingStock.espresso_stock_quantity) + parseInt(this.stock_quantity.value);
                    this.existingStock.espresso_stock_quantity = es.toString();
                    alertify.alert("New stock added to " + this.stock_select.value).set('basic', true);
                    this.stock_select.value = "";
                    break;
                default:
                    alertify.alert("Stock not valid").set('basic', true);
                    this.stock_select.value = "";
                    break;
            }
            this.stock_quantity.value = "";
            this.stock_price.value = "";
        }
    };
    return AddNewStock;
}(UserObjects));
var RemoveCurrentStock = (function (_super) {
    __extends(RemoveCurrentStock, _super);
    function RemoveCurrentStock(existingStock) {
        return _super.call(this, existingStock) || this;
    }
    RemoveCurrentStock.prototype.removal_stock = function () {
        if (this.existingStock.existingEmail.includes(this.userEmail.value)) {
            alertify.alert("Cannot make another purchase for user: " + this.userEmail.value).set('basic', true);
        }
        else if (this.stock_select_r.value === "") {
            alertify.alert("Product Code required").set('basic', true);
        }
        else if (this.userEmail.value === "") {
            alertify.alert("User's Email is required").set('basic', true);
        }
        else if (this.sale_quantity.value === "") {
            alertify.alert("Product Quantity required").set('basic', true);
        }
        else {
            this.sale();
        }
    };
    RemoveCurrentStock.prototype.sale = function () {
        var products_for_sale = this.stock_select_r.value;
        if (products_for_sale === "smoothie" && this.existingStock.smoothie_stock_quantity >= this.sale_quantity.value) {
            var sm_r = parseInt(this.existingStock.smoothie_stock_quantity) - parseInt(this.sale_quantity.value);
            this.existingStock.smoothie_stock_quantity = sm_r.toString();
            this.existingStock.existingEmail.push(this.userEmail.value);
            alertify.alert("Item shipped to " + this.userEmail.value + "!").set('basic', true);
            this.stock_select_r.value = "";
        }
        else if (products_for_sale === "lemon" && this.existingStock.lemon_stock_quantity >= this.sale_quantity.value) {
            var lm_r = parseInt(this.existingStock.lemon_stock_quantity) - parseInt(this.sale_quantity.value);
            this.existingStock.lemon_stock_quantity = lm_r.toString();
            this.existingStock.existingEmail.push(this.userEmail.value);
            alertify.alert("Item shipped to " + this.userEmail.value + "!").set('basic', true);
            this.stock_select_r.value = "";
        }
        else if (products_for_sale === "espresso" && this.existingStock.espresso_stock_quantity >= this.sale_quantity.value) {
            var es_r = parseInt(this.existingStock.espresso_stock_quantity) - parseInt(this.sale_quantity.value);
            this.existingStock.espresso_stock_quantity = es_r.toString();
            this.existingStock.existingEmail.push(this.userEmail.value);
            alertify.alert("Item shipped to " + this.userEmail.value + "!").set('basic', true);
            this.stock_select_r.value = "";
        }
        else {
            alertify.alert(this.stock_select_r.value + " is low in Stock/Out of Stock!").set('basic', true);
            this.stock_select_r.value = "";
        }
        this.userEmail.value = "";
        this.sale_quantity.value = "";
    };
    return RemoveCurrentStock;
}(AddNewStock));
var modal_events = (function (_super) {
    __extends(modal_events, _super);
    function modal_events(existingStock) {
        var _this = _super.call(this, existingStock) || this;
        _this.$add_new_stock = document.querySelector("#add_button");
        _this.$sell_current_stock = document.querySelector("#remove_button");
        _this.$sm_price = document.querySelector("#smoothie_price");
        _this.$lm_price = document.querySelector("#lemon_price");
        _this.$es_price = document.querySelector("#espresso_price");
        _this.$sm_quantity = document.querySelector("#smoothie_stock");
        _this.$lm_quantity = document.querySelector("#lemon_stock");
        _this.$es_quantity = document.querySelector("#espresso_stock");
        _this.$userEmail = document.querySelector("#customerEmails");
        var addBtn = document.querySelector(".main");
        addBtn.addEventListener('click', function (event) {
            event.preventDefault();
            _this.handleFormClick(event);
        });
        return _this;
    }
    ;
    modal_events.prototype.handleFormClick = function (event) {
        event.preventDefault();
        var addToStock = this.$add_new_stock.contains(event.target);
        var shipStockNow = this.$sell_current_stock.contains(event.target);
        if (addToStock) {
            this.adding_stock();
        }
        if (shipStockNow) {
            this.removal_stock();
        }
        this.stockInnerHtml();
    };
    modal_events.prototype.stockInnerHtml = function () {
        this.$sm_price.innerHTML = "R" + this.existingStock.smoothie_stock_price;
        this.$sm_quantity.innerHTML = "" + this.existingStock.smoothie_stock_quantity.toString();
        this.$lm_price.innerHTML = "R" + this.existingStock.lemon_stock_price;
        this.$lm_quantity.innerHTML = "" + this.existingStock.lemon_stock_quantity.toString();
        this.$es_price.innerHTML = "R" + this.existingStock.espresso_stock_price;
        this.$es_quantity.innerHTML = "" + this.existingStock.espresso_stock_quantity.toString();
        this.$userEmail.innerHTML = "" + this.existingStock.existingEmail.join('<hr>');
    };
    return modal_events;
}(RemoveCurrentStock));
var output = new modal_events(UserObjects);
//# sourceMappingURL=script.js.map