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
