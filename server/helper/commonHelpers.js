var getIP = require('ipware')().get_ip;


const getIpFromRequest = (req) => {
    const ip = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        null;
    console.log('this is userip', ip)
    return ip;
}


const getFullDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    return formattedDate
}

const getTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const currentTime = `${hours}:${minutes}:${seconds}`;
    console.log('this is genreated current time', currentTime);
    return currentTime
}
module.exports = {
    getIpFromRequest,
    getFullDate,
    getTime
}