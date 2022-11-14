/** load library express */
const express = require(`express`)

/** Load library express session */
const session = require(`express-session`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `8070`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

/** session configuration */
app.use(session({
    secret: `baha`,
    resave: false,
    saveUninitialized: false
}))

/** load routes */
const obat = require(`./routes/obat.route`)
const customer = require(`./routes/customer.route`)
const apoteker = require(`./routes/apoteker.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)
const home = require(`./routes/home.route`)

/** define prefix for route obat */
app.use(`/obat`, obat)

/**define prefix for route customer */
app.use(`/customer`, customer)

/**define prefix for route apoteker */
app.use(`/apoteker`, apoteker)

/**define prefix for route auth */
app.use(`/auth`, auth)

/** define prefiex for route  */
app.use(`/transaksi`, transaksi)

/** define prefix for route cart */
app.use(`/cart`, cart)

/** define prefix for home  */
app.use(`/home` , home)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Apotek is running on port ${PORT}`);
})


