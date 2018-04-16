var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var ARTICLE_COLLECTION = "articles";
var ARTICLE_CATEGORY_COLLECTION = "articleCategories";
var BRANDS_COLLECTION = "brands";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// ARTICLES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

/*  "/api/articles"
 *    GET: finds all articles
 *    POST: creates a new article
 */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/api/articles", function (req, res) {
    var urlquery = req.query;
    var query = {};
    var nameFilter = urlquery.name;

    if (!!nameFilter) {
        query.name = { "$regex": ".*" + nameFilter + ".*", "$options": "i" }
    }

    console.log("query", query);

    db.collection(ARTICLE_COLLECTION).find(query).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            handleError(res, err.message, "Failed to get articles.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/api/articles", function (req, res) {
    var newArticle = req.body;

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    }

    db.collection(ARTICLE_COLLECTION).insertOne(newArticle, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new article.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/api/articles/:id"
 *    GET: find article by id
 *    PUT: update article by id
 *    DELETE: deletes article by id
 */

app.get("/api/articles/:id", function (req, res) {
    db.collection(ARTICLE_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get article");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/articles/:id", function (req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(ARTICLE_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update article");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete("/api/articles/:id", function (req, res) {
    db.collection(ARTICLE_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete article");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});


app.get("/api/articlecategories", function (req, res) {
    var urlquery = req.query;
    var query = {};
    var nameFilter = urlquery.name;

    if (!!nameFilter) {
        query.name = { "$regex": ".*" + nameFilter + ".*", "$options": "i" }
    }

    console.log("query", query);

    db.collection(ARTICLE_CATEGORY_COLLECTION).find(query).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            handleError(res, err.message, "Failed to get article collections.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.get("/api/brands", function (req, res) {
    var urlquery = req.query;
    var query = {};
    var nameFilter = urlquery.name;

    if (!!nameFilter) {
        query.name = { "$regex": ".*" + nameFilter + ".*", "$options": "i" }
    }

    console.log("query", query);

    db.collection(BRANDS_COLLECTION).find(query).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            handleError(res, err.message, "Failed to get brands.");
        } else {
            res.status(200).json(docs);
        }
    });
});