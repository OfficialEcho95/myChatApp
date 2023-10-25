//this function generates the message emitted and received
function generateMessage(from, text){
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

function generateLocationMessage(from, lat, lon) {
    return {
        from,
        url: `https://google.com/maps?q=${lat},${lon}`,
        createdAt: new Date().getTime()
    }
}

module.exports = { generateMessage, generateLocationMessage };