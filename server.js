const express = require("express"); //Express importálása
const app = express(); //Express példányosítása
const port = 3000; //Port beállítása

//Middleware - köztes alkalmazások
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]


//GET végpont egy szöveges üzenet visszaküldésre
app.get('/hello', (req, res) => {
    res.send("Hello itt az Express webszerver!");
})

app.get('/api/courses', (req, res) => {
    res.json(courses);
})
app.get('/api/courses/:id',(req,res)=>{
    //Keresés  a tömbben  ID (URL paraméter alapján)
    const course =courses.find(c => c.id == parseInt(req.params.id));
    //A keresett elem nem található statusz kód {400} statusz kód és hibaüzenet visszaadása 
    if(!course) res.status(404).send('A megadott id-val nem létezik kurzus!');
    res.json(course);//Visszadjuk a keresett kurzust 
})
//POST végpont kurzus adatok küldésére a szerernek
app.post('/api/courses', (req,res)=>{
//új kurzus létrehozása (az id automatikus növelése)
   
        const course ={
            id: courses.length+1,
            name : req.body.name
        }
    
courses.push(course);
res.status(200).json({ message: "új elem hozzáadva", data:req.body}); //Az új kurzus objektum hozzáadása a courses tömbhöz
//res.json(req.body);// A kibűvítet kurzus adatok lekérése JSON formátumban 
})

//Delete végpont a kurzus
app.delete('/api/course/:id',(req,res)=>{
    //Keresés  a tömbben  ID (URL paraméter alapján)
    const course =courses.find(c => c.id == parseInt(req.params.id));
    //A keresett elem nem található statusz kód {400} statusz kód és hibaüzenet visszaadása 
    if(!course) res.status(404).send('A megadott id-val nem létezik kurzus!');
    const index =course.indexOf(course);
    courses.splice({message : "Sikeres adattörlés",data:req.body});
})

//A webszerver elindítása
app.listen(port, () => {
    console.log(`A webszerver figyel a localhost:${port} webcímen`);
})
