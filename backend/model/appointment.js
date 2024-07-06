const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    clientPhone: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    serviceRequired: {
        type: String,
        required: true
    },
    garage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Garage'
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
