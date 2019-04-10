import Inventory from "./inventory.js";
import Product from "./product.js";

export default class Main {
    constructor() {
        let inventory = new Inventory(document.querySelector("#inventory"));

        document.querySelector("#add").addEventListener("click", () => {
            let productID = document.querySelector("#productID").value;
            let productName = document.querySelector("#productName").value;
            let productQuantity = document.querySelector("#productQuantity").value;
            let productCost = document.querySelector("#productCost").value;

            let objProduct = {
                productID: productID,
                productName: productName,
                productQuantity: productQuantity,
                productCost: productCost
            }

            let product = new Product(objProduct);

            inventory.addProduct(product);
        });

        document.querySelector("#subtract").addEventListener("click", () => {
            let productID = document.querySelector("#productID").value;
            let productQuantity = document.querySelector("#productQuantity").value;

            let objProduct = {
                productID: productID,
                productQuantity: productQuantity
            }

            let product = new Product(objProduct);

            inventory.subtractProduct(product);
        });
    }
}

let m = new Main();
