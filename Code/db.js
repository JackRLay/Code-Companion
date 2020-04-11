var schemas = require ("./schemas");

async function getQuiz(name) {
    return await schemas.Card.findOne({"id": id});
}

module.exports.getCard = getCard;