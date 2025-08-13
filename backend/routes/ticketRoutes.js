const express = require('express');
const router = express.Router();
const { getTickets, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController');

router.route('/').get(getTickets).post(createTicket);
router.route('/:id').delete(deleteTicket).put(updateTicket);

module.exports = router;