const { removeListener } = require("../app");
const Role = require("../models/role");

async function add(req, res, next) {
    try {
        const role = new Role({
            role: req.body.role,
            });
        await role.save();
        res.status(200).send("add good");
    } catch (err) {
        console.log(err);
    }
}

async function getall(req, res, next) {
    try {
        const data = await Role.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}

async function getbyid(req, res, next) {
    try {
        const data = await Role.findById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}

async function deletebyid(req, res, next) {
    try {
        const data = await Role.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    add,
    getall,
    getbyid,
    deletebyid,

};