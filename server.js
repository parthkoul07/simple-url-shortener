const express = require ('express')
const mongoose = require('mongoose')
const { nanoid } = require('nanoid');

const app = express();

//DATABASE:
mongoose.connect('mongodb://localhost/urlShortener') 
  //by running this you are telling this express server where to look for the database;
  //the urlShortener at the end tells mongoDb to create a database for this project - so a new db is created;
  .then(()=>{     //.then cuz establishing is async;
    console.log("connected to mongodb")
  })
  .catch((err)=>{
    console.error("the following error occured: ", err)
  })

//the schema:
const shortUrlSchema = new mongoose.Schema({
  full: { type: String, required: true },
  short: { type: String, required: true },
  clicks: { type: Number, required: true, default: 0 } 
});
//turn the blueprint/schema into a Model (the actual tool we use to interact with the DB):
const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);
//basically we will refer to the database as ShortUrl for making it interact with our script;







//SERVER CODE:
app.use(express.urlencoded({ extended: false })); 
//if you use express.json() it will parse the body from post/fetch request except from html post form.
//for parsing info from an html form with method=POST, you need urlencoded extended:false;
//more generally: see 03.urlencoded.png in basics folder;
app.set('view engine', 'ejs')

//HOMEPAGE:
app.get('/', async (req,res)=>{
  // Grab every single URL from the database
  const short_urls = await ShortUrl.find();
  // Inject them into the index.ejs file and send the HTML to the browser
  res.render('index', { shortUrls: short_urls });
})

//CREATE THE SHORT URL: 
app.post('/shortUrls', async (req,res)=>{  //form sends the form data to this route /shortUrls because action="/shortUrls" kra tha in the form;
  await ShortUrl.create({   //requests the db to create a new document with the given model;
    full: req.body.fullUrl,
    short: nanoid(7)
  });
  // After saving, immediately refresh the page so the user sees the new link in the table;
  res.redirect('/')
})

app.get('/:shortUrl', async(req,res)=>{   //: is used for dynamic routing...
  // Find the database entry that matches the clicked short link
  const short_url = await ShortUrl.findOne({short : req.params.shortUrl});
  // If it doesn't exist, send a 404
  if (short_url == null) return res.sendStatus(404);

  // Increment the click counter and save it back to the database
  short_url.clicks++;
  short_url.save();

  // Redirect the user to the actual destination
  res.redirect(short_url.full);
})

app.listen(process.env.PORT || 5000, ()=>{
  console.log("listening on http://localhost:5000")
})

