const Joi = require ('joi');
const express = require ('express');
const app = express();


app.use(express.json());

const genres = [
    {id: 1, name: 'Davido' },
    {id: 2, name: 'Wiz Kid' },
    {id: 3, name: 'Burna Boy' },
    {id: 4, name: 'Tiwa Savage' },
]


app.get('/vidly.com/api/genres', (req, res) => {
    res.send(genres)
})


//Single genre
app.get('/vidly.com/api/genres/:id', (req, res) =>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found') //404
    res.send(genre)
    });

app.post('/vidly.com/api/genres', (req, res) => {
    const { error } = validateGenre (req.body); /*  
    same thing as result.error
     There are only two possible outcomes from this validateGenre (req.body) which are value or error
    since we interested in the error, we therefore use object distrupturing feature with {}
        
    */
                             //404  Bad Request
    if(error) return res.status(400).send(error.details[0].message);
            
    const genre = {
    id: genres.length + 1,
    name: req.body.name
     };
     genres.push(genre);
     res.send(genre);
     });
    
    
    //Validation logic we can call elsewhere to validate a single course input
    function validateGenre(genre) {
        const schema = {
            name: Joi.string().min(3).required()
        };
             //instead of req.body argument, we replace it by course
        return   Joi.validate(genre, schema);
    }
    
app.put('/vidly.com/api/genres', (req, res) => {
        //Process is: validate, if invalid{return 400 - Bad request}
       
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found')
        
        
    const { error } = validateGenre (req.body); /*  
        same thing as result.error
        There are only two possible outcomes from this validateCourse (req.body) which are value or error
        since we interested in the error, we therefore use object distrupturing feature with {}
        
        */
    
        
            //404  Bad Request
        if(error) return res.status(400).send(error.details[0].message);
            
        
    
        //Update course
        genre.name = req.body.name;
        res.send(genre);
    });
    
app.delete('/vidly.com/api/genres/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found')
        
    //finding the index on the array and using splice to delete it
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    
    res.send(genre);
    });

//PORT 
const port = process.env.PORT || 3003

app.listen(port, () => console.log(`Listening on PORT ${port}...`));
