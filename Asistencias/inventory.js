import Product from "./product.js";

export default class Inventory {
    constructor(tableInventory) {
        this._tableInventory = tableInventory;
        this._allProducts = [];
        localStorage.removeItem("products");
        this._initInventory();
    }

    addProduct(product) {
        let found = this._findProduct(product.productID);

        if (found >= 0) {
            this._addExistence(product.productID, product.productQuantity);
            return;
        } 

        if (found === -1) {
            Swal.fire({
                type: "success",
                title: "Success",
                text: "The product was registered succesfully"
            })
        } 

        this._displayInventory(product);
        localStorage.setItem("products", JSON.stringify(this._allProducts));
        console.log(localStorage.getItem("products"));
    }

    subtractProduct(product) {
        let found = this._findProduct(product.productID);

        if (found >= 0) {
            this._subtractExistence(product.productID, product.productQuantity);
            return;
        } 

        if (found === -1) {
            Swal.fire({
                type: "error",
                title: "Error",
                text: "This product doesn't exist"
            })
        } 
    }

    _addExistence(ID, addedExistence) {
        this._allProducts = JSON.parse(localStorage.getItem("products"));
        console.log(this._allProducts);

        this._allProducts.forEach((product, index) => {
            if (this._allProducts[index].productID === ID) {
                this._allProducts[index].productQuantity = Number(this._allProducts[index].productQuantity) + Number(addedExistence);
                localStorage.setItem("products", JSON.stringify(this._allProducts));
                let row = this._tableInventory.rows[index+1];
                row.cells[2].innerHTML = this._allProducts[index].productQuantity;
            }
        });
    } 

    _subtractExistence(ID, subtractedExistence) {
        let products = JSON.parse(localStorage.getItem("products"));
        console.log(products);

        products.forEach((product, index) => {
            if (product.productID === ID) {
                product.productQuantity = Number(product.productQuantity) - Number(subtractedExistence);
                localStorage.setItem("products", JSON.stringify(product));
                let row = this._tableInventory.rows[index+1];
                row.cells[2].innerHTML = product.productQuantity;
            }
        });
    }

    _findProduct(ID) {
        let searchFor = -1;
        this._allProducts.forEach((product, index) => {
            if (product.productID === ID) {
                searchFor = index;
                return;
            }
        });

        return searchFor;
    } 

    _displayInventory(product) {
        let row = this._tableInventory.insertRow(-1);

        let cellID = row.insertCell(0);
        let cellName = row.insertCell(1);
        let cellQuantity = row.insertCell(2);
        let cellCost = row.insertCell(3);

        cellID.innerHTML = product.productID;
        cellName.innerHTML = product.productName;
        cellQuantity.innerHTML = product.productQuantity;
        cellCost.innerHTML = product.productCost;

        let objProduct = {
            productID: product.productID,
            productName: product.productName,
            productQuantity: product.productQuantity,
            productCost: product.productCost
        }

        this._allProducts.push(objProduct);
    }

    _initInventory() {
        let products = JSON.parse(localStorage.getItem("products"));

        if (products === null) {
            return;
        }

        products.forEach((product, index) => {
            this._displayInventory(new Product(product));
        });
    }
}