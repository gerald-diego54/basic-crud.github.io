// Declaring Core Modules
const mySql2 = require('mysql2');
const hashPassword = require('bcrypt');
const { listen } = require('express/lib/application');
const { request, response } = require('express');
const async = require('hbs/lib/async');

// instantiate database connections
const db = mySql2.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

// Validating Database Connection
db.connect((err) => {
    if (err) console.log(`Occured ${err}`);
    else console.log(`Database Connection Established!`);
});



// Storing data to SQL Workbench or Register
exports.register = (request, response) => {
    const {
        first_name,
        middle_name,
        last_name,
        email,
        address,
        mobile_number,
        payment_type,
    } = request.body;
    // Validation
    db.query(
        `SELECT * FROM customer WHERE email = ?`, [email],
        async (err, result) => {
            if (err) console.log(`Occured ${err}`);
            else if (result.length > 0) return response.render('index', { message: `Inputed email is already exist!` });
            else {
                db.query(
                    `INSERT INTO customer SET ?`, {
                    first_name,
                    middle_name,
                    last_name,
                    email,
                    address,
                    mobile_number,
                    payment_type,
                }, (err) => {
                    if (err) return console.log(`Occured ${err}`);
                    else {
                        console.log(`Individual named ${first_name} is succesfully registered!`);
                        db.query(
                            `SELECT * FROM customer WHERE email = ?`,
                            [email], (err) => {
                                if (err) console.log(`Occured ${err}`);
                                else db.query(
                                    `SELECT * FROM customer`,
                                    (error, result) => {
                                        // console.log(result);
                                        response.render('records', { user: result, message_success: `Individual named ${first_name} is succesfully registered!` });
                                    }
                                );
                            }
                        );
                        // return response.render('records', { message_success: `Individual named ${first_name} is succesfully registered!` });                        
                    }
                }
                );
            }
        }
    );
}


// Login Admin

exports.log_in = (request, response) => {
    // Declare the variables
    const username = process.env.LOGIN_USERNAME;
    const pass = process.env.LOGIN_PASSWORD;
    const { user_name, pwd } = request.body;
    // validation

    if (user_name != username || pwd != pass) {
        // console.log(user_name != username || pwd != pass);
        return response.status(401).render('login', { message: `Invalid email or password!` });
    }
    if (user_name == username || pwd == pass) {
        return response.status(202).render('index', { message_login: `Welcome to Customer System!` });
    }
}

// exports.record = (request, response) => {
//     const email = request.params.email;
//     db.query(
//         `SELECT * FROM register WHERE email = ?`,
//         [email], (err) => {
//             if (err) console.log(`Occured ${err}`);
//             else db.query(
//                 `SELECT * FROM customer`,
//                 (error, result) => {
//                     console.log(result);
//                     response.render('records', { user: result });
//                 }
//             );
//         }
//     );
// }

exports.updates = (request, response) => {
    // return response.render('update', { message: `Welcome` });
    const email = request.params.email;
    db.query(
        `SELECT * FROM customer WHERE email = ?`,
        [email],
        (err, result) => {
            return response.render('update', { user: result[0] });
        }
    );
}

exports.update_customer = (request, response) => {
    // Variable Declaration
    const {
        first_name,
        middle_name,
        last_name,
        email,
        address,
        mobile_number,
        payment_type,
    } = request.body;

    db.query(
        `UPDATE customer SET ? WHERE email = ?`, [{
        first_name,
        middle_name,
        last_name,
        address,
        mobile_number,
        payment_type,
    },email], (err) => {
        if (err) return console.log(`Occured ${err}`);
        db.query(
            `SELECT * FROM customer`,
            (error, result) => {
                // console.log(result);
                response.render('records', { user: result, message_success: `Succesfully updated customer with email ${email}!`});
            }
        );
    }
    );

}


exports.index = (request, response) => {
    return response.render('index');
}

exports.readRecords = (request, response) => {
    db.query(
        `SELECT * FROM customer`,
        (error, result) => {
            // console.log(result);
            response.render('records', { user: result });
        }
    );
}

exports.delete = (request, response) => {
    // return response.render('update', { message: `Welcome` });
    const email = request.params.email;
    db.query(
        `DELETE FROM customer WHERE email = ?`,
        [email],
        (err, result) => {
            // return response.render('update', { user: result[0] });
            db.query(
                `SELECT * FROM customer`,
                (error, result) => {
                    // console.log(result);
                    response.render('records', { user: result, message_delete: `Succesfully deleted customer with email ${email}!`});
                }
            );
        }
    );
}