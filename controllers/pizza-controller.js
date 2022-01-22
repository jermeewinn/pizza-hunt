// const res = require('express/lib/response');
const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas, equivalent to GET /api/pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => res.json(dbPizzaData))
                .then(dbPizzaData => res.json(dbPizzaData))
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                });
    },
    //get one pizza by ID, equivalent to GET /api/pizzas/:id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                // if no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this ID' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //createPizza, equivalent to POST /api/pizzas
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },
    //updatePizza, equivalent to PUT /api/pizzas:id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza found with this ID' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(404).kson(err));
    },
    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;