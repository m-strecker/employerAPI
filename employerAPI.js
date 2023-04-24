//Import express model
var express = require('express');
//Instantiate express model
var app = express();



//Turn on server on port 8000
var server = app.listen(8000, function(){
    console.log("Server is ON")
})

//Create Employer ojbect array
const Employer = [{id: 1, name: 'Name 1', department: "Dept 3", salary: 100000},
{id: 2, name: 'Name 2', department: "Dept 3", salary: 125000},
{id: 3, name: 'Name 3', department: "Dept 1", salary: 150000},
{id: 4, name: 'Name 4', department: "Dept 2", salary: 130000}];


//Create Get method to send data when visiting localhost:8000
app.get('/Employers',(req, res)=>{
    res.send(Employer);
});


//Parse data into req.body
app.use(express.json());
//Create Post method to add another object to Employer array
app.post('/Employers/Add_Employer', (req, res)=>{
    //read new record from json
    const addition = {
         id: req.body.id,
         name: req.body.name,
         department: req.body.department,
         salary: req.body.salary
    };
    //add new record to Employer object
    Employer.push(addition);
    res.status(200).send(addition);
    
    });




//Create Patch method to update Employer record
app.patch('/Employers/Update_Employer/:id', (req, res)=>{
    
        
        //ID is compared to each ID in the array
            const recordUpdate = Employer.find((element)=>{
            if (element.id === parseInt(req.params.id)) 
            {return true;}
            });
       //If record with ID exists, update record using for/in loop, 
       //For/in loops will loop through the properties of an object   
            if (recordUpdate) {
                for (let i in req.body){
                recordUpdate[i] = req.body[i];
                }
                return res.status(200).send(recordUpdate);
            }
        //If there isn't a student with the given ID, a 404-status code will be sent with a suitable message    
            return res.status(404).send('Wrong ID, No Employer Found');
    });





//Create Delete method to delete Employer record
app.delete('/Employers/Delete/:id', (req, res)=>{

   //ID is compared to each ID in the array
    const recordDelete = Employer.find((element)=>{
        if (element.id === parseInt(req.params.id)) 
        {return true;}
    });
    //If record with ID exists, locate index of object in Employer array using indexOf method 
    //Then use the splice method to delete that record 
    //Next, send back the deleted record with a 200-status code
    if(recordDelete){
        const index = Employer.indexOf(recordDelete);
        Employer.splice(index, 1);
        return res.status(200).send(recordDelete);
    }
    return res.status(404).send('Wrong ID, No Employer Found');
});   