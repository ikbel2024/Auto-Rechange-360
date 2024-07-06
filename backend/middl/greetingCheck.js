// middlewares/greetingCheck.js
const greetings = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"];

const checkGreetings = (req, res, next) => {
    if (req.body.post) {
        let postContent = req.body.post;
        greetings.forEach(greeting => {
            const regex = new RegExp(`\\b${greeting}\\b`, 'gi');
            postContent = postContent.replace(regex, '*'.repeat(greeting.length));
        });
        req.body.post = postContent;
    }
    next();
};

module.exports = checkGreetings;
