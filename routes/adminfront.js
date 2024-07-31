const express = require('express');
const router = express.Router();
const db = require('../database/mysql');



router.get('/user-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS userCount FROM user';
    let sqlLastHour = `
        SELECT COUNT(id) AS userGrowth 
        FROM user 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentuserCount = result[0].userCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const userGrowth = resultLastHour[0].userGrowth;

            res.json({
                userCount: currentuserCount,
                userGrowth: userGrowth
            });
        });
    });
});



router.get('/product-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS productCount FROM products';
    let sqlLastHour = `
        SELECT COUNT(id) AS productGrowth 
        FROM products 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentProductCount = result[0].productCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const productGrowth = resultLastHour[0].productGrowth;

            res.json({
                productCount: currentProductCount,
                productGrowth: productGrowth
            });
        });
    });
});


router.get('/jeans-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS jeansCount FROM jeans';
    let sqlLastHour = `
        SELECT COUNT(id) AS jeansGrowth 
        FROM jeans 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentjeanCount = result[0].jeansCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const jeansGrowth = resultLastHour[0].jeansGrowth;

            res.json({
                jeansCount: currentjeanCount,
                jeansGrowth: jeansGrowth
            });
        });
    });
});


router.get('/trouser-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS trouserCount FROM trouses';
    let sqlLastHour = `
        SELECT COUNT(id) AS trouserGrowth 
        FROM trouses 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currenttrouserCount = result[0].trouserCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const trouserGrowth = resultLastHour[0].trouserGrowth;

            res.json({
                trouserCount: currenttrouserCount,
                trouserGrowth: trouserGrowth
            });
        });
    });
});

router.get('/winderware-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS winderwareCount FROM winderwares';
    let sqlLastHour = `
        SELECT COUNT(id) AS winderwareGrowth 
        FROM winderwares 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentwinderwareCount = result[0].winderwareCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const winderwareGrowth = resultLastHour[0].winderwareGrowth;

            res.json({
                winderwareCount: currentwinderwareCount,
                winderwareGrowth: winderwareGrowth
            });
        });
    });
});
router.get('/tunic-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS tunicCount FROM tunics';
    let sqlLastHour = `
        SELECT COUNT(id) AS tunicGrowth 
        FROM tunics 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currenttunicCount = result[0].tunicCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const tunicGrowth = resultLastHour[0].tunicGrowth;

            res.json({
                tunicCount: currenttunicCount,
                tunicGrowth: tunicGrowth
            });
        });
    });
});
router.get('/bottom-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS bottomCount FROM bottoms';
    let sqlLastHour = `
        SELECT COUNT(id) AS bottomGrowth 
        FROM bottoms 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentbottomCount = result[0].bottomCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const bottomGrowth = resultLastHour[0].bottomGrowth;

            res.json({
                bottomCount: currentbottomCount,
                bottomGrowth: bottomGrowth
            });
        });
    });
});
router.get('/westerntop-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS westerntopCount FROM westerntop';
    let sqlLastHour = `
        SELECT COUNT(id) AS westerntopGrowth 
        FROM westerntop 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentwesterntopCount = result[0].westerntopCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const westerntopGrowth = resultLastHour[0].westerntopGrowth;

            res.json({
                westerntopCount: currentwesterntopCount,
                westerntopGrowth: westerntopGrowth
            });
        });
    });
});
router.get('/electronic-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS electronicCount FROM electronics';
    let sqlLastHour = `
        SELECT COUNT(id) AS electronicGrowth 
        FROM electronics 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentelectronicCount = result[0].electronicCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const electronicGrowth = resultLastHour[0].electronicGrowth;

            res.json({
                electronicCount: currentelectronicCount,
                electronicGrowth: electronicGrowth
            });
        });
    });
});
router.get('/beautyproduct-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS beautyproductCount FROM beautyproducts';
    let sqlLastHour = `
        SELECT COUNT(id) AS beautyproductGrowth 
        FROM beautyproducts
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentbeautyproductCount = result[0].beautyproductCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const beautyproductGrowth = resultLastHour[0].beautyproductGrowth;

            res.json({
                beautyproductCount: currentbeautyproductCount,
                beautyproductGrowth: beautyproductGrowth
            });
        });
    });
});
router.get('/customer-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS customerCount FROM customer';
    let sqlLastHour = `
        SELECT COUNT(id) AS customerGrowth 
        FROM customer 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentcustomerCount = result[0].customerCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const customerGrowth = resultLastHour[0].customerGrowth;

            res.json({
                customerCount: currentcustomerCount,
                customerGrowth: customerGrowth
            });
        });
    });
});
router.get('/order-count', (req, res) => {
    let sql = 'SELECT COUNT(id) AS orderCount FROM orderitem';
    let sqlLastHour = `
        SELECT COUNT(id) AS orderGrowth 
        FROM orderitem 
        WHERE created_at >= NOW() - INTERVAL 1 HOUR
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const currentorderCount = result[0].orderCount;

        db.query(sqlLastHour, (err, resultLastHour) => {
            if (err) throw err;
            const orderGrowth = resultLastHour[0].orderGrowth;

            res.json({
                orderCount: currentorderCount,
                orderGrowth: orderGrowth
            });
        });
    });
});
module.exports = router;
