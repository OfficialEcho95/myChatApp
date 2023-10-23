//this function generates the message emitted and received
const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

module.exports = { generateMessage };