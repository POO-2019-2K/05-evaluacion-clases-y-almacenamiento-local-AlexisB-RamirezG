export default class Product {
    constructor(product) {
        this._productID = product.productID;
        this._productName = product.productName; 
        this._productQuantity = product.productQuantity;
        this._productCost = product.productCost;
    }

    get productID() {
        return this._productID;
    }

    get productName() {
        return this._productName;
    }

    get productQuantity() {
        return this._productQuantity
    }

    get productCost() {
        return this._productCost;
    }
}