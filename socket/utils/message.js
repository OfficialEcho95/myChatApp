//this function generates the message emitted and received
function generateMessage(from, text){
    return {
        from,
        text,
        createdAt: new Date().d
    }
}

module.exports = { generateMessage };