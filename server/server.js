const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv').config()
const adminRoutes = require('./router/admin/index')
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');



// initilizing app 
const app = express()

app.use(cors())
app.use(express.json())
app.set('trust proxy', true);
// admin routes
app.use('/api/admin', adminRoutes)




// morgal for logging the error in text file instead of console
const logs = fs.createWriteStream(
    path.join(__dirname, 'logs.log'),
    { flags: 'a' }
);

// app.use(morgan('combined', { stream: logs }));



app.listen(3002 || process.env.PORT, () => {
    console.log('server started on port', process.env.PORT)
})
