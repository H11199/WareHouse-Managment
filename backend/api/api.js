const Router = require('express').Router();
const ProductDetail = require('../models/Products');

// to add the product every time product pass through the RFID technology


Router.route('/add_product')
    .post((req, res) => {
        // we have three different type of the type of products
        // 1. food
        // 2. cloth
        // 3. other
        // food last two rows (5th and 6th)
        // cloth (3rd and 4th)
        // other (1st and 2nd)

        // 1 unit - 20cm

        let scale_quant = 20;

        ProductDetail.find((err, products) => {

            let n = products.length; // number of products in the board

            // initially all the entries in the board is empty
            // 0 - not visited
            // 1  - visited

            let board = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ];

            let val = [
                [",", ",", ",", ",", ",", ","],
                [",", ",", ",", ",", ",", ","],
                [",", ",", ",", ",", ",", ","],
                [",", ",", ",", ",", ",", ","],
                [",", ",", ",", ",", ",", ","],
                [",", ",", ",", ",", ",", ","]
            ];


            for (let i = 0; i < n; i++) {
                let x = ((products[i].x_cord) / scale_quant) - 1;
                let y = ((products[i].y_cord) / scale_quant) - 1;
                // marking the position of the product in the board
                board[x][y] = 1;
                if (products[i].item_type === "Food") {
                    val[x][y] = 'f';
                } else if (products[i].item_type === "Cloth") {
                    val[x][y] = 'c';
                } else {
                    val[x][y] = 'o';
                }
            }

            // let tmp = "";

            // for (let i = 0; i <= 5; i++) {
            //     for (let j = 0; j <= 5; j++) {
            //         tmp += board[i][j] + " ";
            //     }
            //     console.log(tmp);
            //     tmp = "";
            // }

            let itemType = req.body.item_type;
            let final_x_cord = -1;
            let final_y_cord = -1;

            if (itemType === "Food") {
                // for food
                for (let i = 5; i >= 0; i--) {
                    for (let j = 0; j <= 5; j++) {
                        if (board[i][j] === 0) {
                            final_x_cord = i;
                            final_y_cord = j;
                            break;
                        }
                    }
                    if (final_x_cord !== -1 && final_y_cord !== -1) {
                        break;
                    }
                }
                let new_x_cor = -1;
                let new_y_cor = -1;
                if (final_x_cord !== -1 && final_y_cord !== -1 && final_x_cord <= 3 && final_y_cord <= 5) {
                    let flag = false;
                    for (let i = 5; i >= 4; i--) {
                        for (let j = 0; j <= 5; j++) {
                            if (val[i][j] === 'c' || val[i][j] === 'o') {
                                let tmp = val[i][j];
                                val[i][j] = 'f';
                                val[final_x_cord][final_y_cord] = tmp;
                                flag = true;
                                new_x_cor = final_x_cord;
                                new_y_cor = final_y_cord;
                                final_x_cord = i;
                                final_y_cord = j;
                                break;
                            }
                        }
                        if (flag === true) {
                            break;
                        }
                    }
                }
                if (new_x_cor !== -1 && new_y_cor !== -1) {
                    if (final_x_cord !== -1 && final_y_cord !== -1) {
                        for (let i = 0; i < n; i++) {
                            if (products[i].x_cord === (new_x_cor + 1) * 20 && products[i].y_cord === (new_y_cor + 1) * 20) {
                                ProductDetail.findOne({ serial_number: products[i].serial_number })
                                    .then((product) => {
                                        product.x_cord = new_x_cor;
                                        product.y_cord = new_y_cor;
                                        prooduct.save();
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            }
                        }
                    }
                }

            } else if (itemType === "Cloth") {
                // for cloth
                final_x_cord = -1;
                final_y_cord = -1;
                for (let i = 3; i >= 0; i--) {
                    for (let j = 0; j <= 5; j++) {
                        if (board[i][j] === 0) {
                            final_x_cord = i;
                            final_y_cord = j;
                            break;
                        }
                    }
                    if (final_x_cord !== -1 && final_y_cord !== -1) {
                        break;
                    }
                }
                if (final_x_cord === -1 && final_y_cord === -1) {
                    for (let i = 5; i >= 4; i--) {
                        for (let j = 0; j <= 5; j++) {
                            if (board[i][j] === 0) {
                                final_x_cord = i;
                                final_y_cord = j;
                                break;
                            }
                        }
                        if (final_x_cord !== -1 && final_y_cord !== -1) {
                            break;
                        }
                    }
                }
                let new_x_cor = -1;
                let new_y_cor = -1;
                if (final_x_cord !== -1 && final_y_cord !== -1 && final_x_cord <= 1 && final_y_cord <= 5) {
                    for (let i = 3; i >= 0; i--) {
                        for (let j = 0; j <= 5; j++) {
                            if (val[i][j] == 'o') {
                                let tmp = val[i][j];
                                val[i][j] = 'c';
                                val[final_x_cord][final_y_cord] = tmp;
                                new_x_cor = final_x_cord;
                                new_y_cor = final_y_cord;
                                final_x_cord = i;
                                final_y_cord = j;
                                break;
                            }
                        }
                        if (final_x_cord !== -1 && final_y_cord !== -1) break;
                    }
                }
                if (new_x_cor !== -1 && new_y_cor !== -1) {
                    if (final_x_cord !== -1 && final_y_cord !== -1) {
                        for (let i = 0; i < n; i++) {
                            if (products[i].x_cord === (new_x_cor + 1) * 20 && products[i].y_cord === (new_y_cor + 1) * 20) {
                                ProductDetail.findOne({ serial_number: products[i].serial_number })
                                    .then((product) => {
                                        product.x_cord = new_x_cor;
                                        product.y_cord = new_y_cor;
                                        product.save();
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            }
                        }
                    }
                }
            } else {
                // for other
                final_x_cord = -1;
                final_y_cord = -1;
                for (let i = 1; i >= 0; i--) {
                    for (let j = 0; j <= 5; j++) {
                        if (board[i][j] === 0) {
                            final_x_cord = i;
                            final_y_cord = j;
                            break;
                        }
                    }
                    if (final_x_cord !== -1 && final_y_cord !== -1) break;
                }
                if (final_x_cord === -1 && final_y_cord === -1) {
                    for (let i = 5; i >= 2; i--) {
                        for (let j = 0; j <= 5; j++) {
                            if (board[i][j] === 0) {
                                final_x_cord = i;
                                final_y_cord = j;
                                break;
                            }
                        }
                        if (final_x_cord !== -1 && final_y_cord !== -1) break;
                    }
                }
            }

            if (final_x_cord === -1 && final_y_cord === -1) {
                return res.json({ status: "error no slots available" });
            }
            let item = {
                serial_number: req.body.serial_number,
                manufacturer: req.body.manufacturer,
                date_of_entry: new Date(),
                date_of_expiry: req.body.date_of_expiry,
                item_type: req.body.item_type,
                x_cord: (final_x_cord + 1) * scale_quant,
                y_cord: (final_y_cord + 1) * scale_quant
            }
            const product = new ProductDetail(item);
            product.save();
            return res.json({ status: "success", data: item });
        })
    })

// On the all information product page I need to get all the information one by one
Router.route('/get_info')
    .get((req, res) => {
        ProductDetail.find()
            .then((products) => {
                return res.status(200).json(products);
            })
            .catch((err) => {
                return res.json({ status: "error", error: "Not able to retrieve the products" });
            })
    })

// track the particular product taken by the admin and enter in the search bar of tracker id

Router.route('/get_info_of_product/:product_id')
    .get((req, res) => {
        ProductDetail.findOne({ serial_number: req.params.product_id })
            .then((product) => {
                return res.status(200).json(product);
            })
            .catch((err) => {
                return res.json({ status: "error", error: "Not able to retrieve the product" });
            })
    })

// To update the product detail in the cards representation of the product we can have the functionality to update
// the product date of expiry
Router.route('/update_product/:product_id')
    .post((req, res) => {
        ProductDetail.findOne({ serial_number: req.params.product_id })
            .then((product) => {
                console.log(1);
                product.date_of_entry = new Date();
                product.date_of_expiry = req.body.date_of_expiry;
                //product.item_type = req.body.item_type;
                product.save();
                return res.json(product);
            })
            .catch((err) => {
                return res.json({ status: "error", error: "Not able to retrieve the product" });
            })
    })

// now we need to able to delete after the expiratiton of date automatically


exports = module.exports = Router;