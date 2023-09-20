const firebase = require("firebase");
const express = require("express");
const bodyParser = require("body-parser");
const firebaseConfig = require("./config");

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const User = db.collection("users");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res)=>{
    res.render("login",{message:"TRY TO LOGIN"});
})
app.get("/about", (req, res)=>{
    res.render("ABOUT");
})
app.get("/CONTACT", (req, res)=>{
    res.render("CONTACT");
})
app.get("/SERVICE", (req, res)=>{
    res.render("SERVICE");
})

app.get("/LANGUAGES", (req, res)=>{
    res.render("LANGUAGES");
})

app.get("/NEWSPAPER", (req, res)=>{
    res.render("NEWSPAPER");
})
app.get("/english", (req, res)=>{
    res.render("english");
})
app.get("/hindi", (req, res)=>{
    res.render("hindi");
})
app.get("/marathi", (req, res)=>{
    res.render("marathi");
})
app.get("/maly", (req, res)=>{
    res.render("maly");
})
app.get("/urdu", (req, res)=>{
    res.render("urdu");
})
app.get("/sindhi", (req, res)=>{
    res.render("sindhi");
})
app.get("/kannada", (req, res)=>{
    res.render("kannada");
})
app.get("/punjabi", (req, res)=>{
    res.render("punjabi");
})
app.get("/odia", (req, res)=>{
    res.render("odia");
})
app.get("/bengali", (req, res)=>{
    res.render("bengali");
})
app.get("/bhoj", (req, res)=>{
    res.render("bhoj");
})
app.get("/telugu", (req, res)=>{
    res.render("telugu");
})
app.get("/tamil", (req, res)=>{
    res.render("tamil");
})
app.get("/ ", (req, res)=>{
    res.render(" ");
})
// app.post("/login", (req, res)=>{
//     const email = req.body.usermail;
//     const password = req.body.password;
//     firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
//         res.redirect("/welcome");
//     }).catch((error) => {
//             console.log(error.message);
//         });
// });

app.route("/login")
.post((req, res)=>{
    const email = req.body.useremail;
    const password = req.body.password;
    const first_name = req.body.firstname;
    const last_name = req.body.lastname;
    
    console.log(req.body)
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userData) => {
        db.collection("users").doc(userData.user.uid).set({
            "First Name": first_name,
            "Last Name": last_name,
            
            "Email":email,
            "Password":password,
            
        }).then(()=>{
            res.redirect("/index");
        });
    })
        .catch((error) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
                        res.redirect("/index");
                    }).catch((error) => {
                            console.log(error.message);
                            res.render("login",{message:error.message})
                        });
        });
})

app.get("/index", (req, res)=>{
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
        //    redirected after authentication
           res.render("index")
        }else{
            res.redirect("/");
        }
    });
});

app.get("/logout", (req, res)=>{
    firebase.auth().signOut().then(()=>{
        res.redirect("/");
    });
})


app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server is started at port 3000");
    }
});
