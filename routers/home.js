// const express = require('express');
// const Router = express.Router();
// const Club = require('../models/club')

// Router.get('/',(err,res)=>{
//     res.render('index')
// })

// // create / insert data

// // Router.post('/add',(req,res)=>{
// //      const name = req.body.name;
// //      const email = req.body.email;

// //     //  console.log(name,email)

// //    const club = new Club({
// //        name,
// //        email
// //    })
// //    club.save(err=>{
// //        if(err){
// //            console.log("err is ")
// //        }else{
// //            res.redirect('/')
// //        }
// //    })
// // })



// Router.post('/add', async (req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;

//     const club = new Club({
//         name,
//         email
//     });

//     try {
//         await club.save();
//         res.redirect('/');
//     } catch (err) {
//         console.log("Error is:", err);
//         res.status(500).send("Error occurred while saving data.");
//     }
// });


// // find data 

// // Router.get('/show',(req,res)=>{
// //     Club.find((err,docs)=>{
// //         if(err) throw err;
       
// //         res.render('show',{
// //             students : docs
// //         })
        
// //     })
// // })





// // Find data
// Router.get('/show', async (req, res) => {
//     try {
//         // Use async/await for find()
//         const docs = await Club.find();
//         res.render('show', {
//             students: docs
//         });
//     } catch (err) {
//         console.log("Error while fetching data:", err);
//         res.status(500).send("Error occurred while fetching data.");
//     }
// });




// // update data

// Router.get('/edit/:id',(req,res)=>{
//     // console.log(req.params.id)

//     Club.findOneAndUpdate({_id: req.params.id},req.body,{new:true},(err,docs)=>{
//         if(err){
//             console.log("cant update")
//         }else{
//             res.render('edit',{studentdata:docs})
//         }
//     })
// })

// // Router.post('/edit/:id',(req,res)=>{
// //     Club.findByIdAndUpdate({_id:req.params.id},req.body,(err,docs)=>{
// //         if(err){
// //             console.log("err")
// //         }else{
// //             res.redirect('/show')
// //         }
// //     })
// // })



// // Update data
// Router.get('/edit/:id', async (req, res) => {
//     try {
//         const docs = await Club.findOneAndUpdate(
//             { _id: req.params.id },
//             req.body,
//             { new: true }  // Ensure we get the updated document
//         );
//         res.render('edit', { studentdata: docs });
//     } catch (err) {
//         console.log("Can't update:", err);
//         res.status(500).send("Error occurred while updating data.");
//     }
// });







// // Del data 

// Router.get('/delete/:id',(req,res)=>{
//     Club.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
//          if(err){
//              console.log("Err is")
//          }else{
//              console.log("Delted")
//              res.redirect('/show')
//          }
//     })
// })



// module.exports = Router;






















const express = require('express');
const Router = express.Router();
const Club = require('../models/club');

// Render the index page
Router.get('/', (req, res) => {
    res.render('index');
});

// Create / insert data
Router.post('/add', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const club = new Club({
        name,
        email
    });

    try {
        await club.save();
        res.redirect('/');
    } catch (err) {
        console.log("Error is:", err);
        res.status(500).send("Error occurred while saving data.");
    }
});

// Find data
Router.get('/show', async (req, res) => {
    try {
        const docs = await Club.find(); // use async/await
        res.render('show', {
            students: docs
        });
    } catch (err) {
        console.log("Error while fetching data:", err);
        res.status(500).send("Error occurred while fetching data.");
    }
});

// Update data
Router.get('/edit/:id', async (req, res) => {
    try {
        const docs = await Club.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }  // Ensure updated document is returned
        );
        res.render('edit', { studentdata: docs });
    } catch (err) {
        console.log("Can't update:", err);
        res.status(500).send("Error occurred while updating data.");
    }
});

// Edit form submission
Router.post('/edit/:id', async (req, res) => {
    try {
        await Club.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.redirect('/show');
    } catch (err) {
        console.log("Error while updating:", err);
        res.status(500).send("Error occurred while updating data.");
    }
});

// Delete data
Router.get('/delete/:id', async (req, res) => {
    try {
        await Club.findByIdAndDelete({ _id: req.params.id });
        console.log("Deleted");
        res.redirect('/show');
    } catch (err) {
        console.log("Error while deleting:", err);
        res.status(500).send("Error occurred while deleting data.");
    }
});

module.exports = Router;
