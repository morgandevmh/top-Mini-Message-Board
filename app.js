const express = require("express");
const path = require("path");

const app = express();
const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    },
    {
        text: "Salut à tous!",
        user: "Jean",
        added: new Date()
    }
];

app.use(express.urlencoded({ extended: true }));

  

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    res.render("index", {
        title: "Mini Messageboard",
        messages: messages
    })
})

app.get("/new", (req, res) => {
    res.render("form")
})

app.post("/new", (req, res) => {
    const author = req.body.author
    const message = req.body.message

    messages.push({ text: message, user: author, added: new Date() });

    res.redirect("/")
})

app.get("/message-details/:id", (req, res) => {
    const messageId = req.params.id;
    const message = messages[messageId];
    
    res.render("message-details", {
        message: message
    });
});

app.listen(3003, () => {
    console.log("server => http://localhost:3003")
})

