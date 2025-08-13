const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Public
const getTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
});

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Public
const createTicket = asyncHandler(async (req, res) => {
    if (!req.body.subject || !req.body.description) {
        res.status(400);
        throw new Error('Please add a subject and description');
    }
    
    const ticket = await Ticket.create({
        subject: req.body.subject,
        description: req.body.description,
        status: 'open',
    });
    res.status(201).json(ticket);
});

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
// @access  Public
const deleteTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    await ticket.deleteOne();

    res.status(200).json({ success: true, id: req.params.id });
});

// @desc    Update a ticket
// @route   PUT /api/tickets/:id
// @access  Public
const updateTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedTicket);
});

module.exports = {
    getTickets,
    createTicket,
    deleteTicket,
    updateTicket,
};