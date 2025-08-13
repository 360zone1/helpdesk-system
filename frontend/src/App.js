import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
  });

  const { subject, description } = formData;

  useEffect(() => {
    axios.get('/api/tickets')
      .then(res => {
        setTickets(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/tickets', formData)
      .then(res => {
        setTickets([res.data, ...tickets]);
        setFormData({ subject: '', description: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/tickets/${id}`)
      .then(() => {
        setTickets(tickets.filter(ticket => ticket._id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };


  const [editingTicket, setEditingTicket] = useState(null);

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setFormData({ subject: ticket.subject, description: ticket.description });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`/api/tickets/${editingTicket._id}`, formData)
      .then(res => {
        setTickets(tickets.map(ticket => (ticket._id === res.data._id ? res.data : ticket)));
        setEditingTicket(null);
        setFormData({ subject: '', description: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Helpdesk Tickets</h1>
      
      <div className="card mb-4">
        <div className="card-body">
...
          <h5 className="card-title">
            {editingTicket ? "Edit ticket" : "Create a new ticket"}
          </h5>
          <form onSubmit={editingTicket ? handleUpdate : handleSubmit}>
            {/* ... baqi form input fields same rahengi ... */}
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input 
                type="text" 
                className="form-control" 
                name="subject"
                value={subject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea 
                className="form-control"
                name="description"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingTicket ? "Update" : "Submit"}
            </button>
            {editingTicket && (
              <button onClick={() => setEditingTicket(null)} className="btn btn-secondary ms-2">
                Cancel
              </button>
            )}
          </form>




        </div>
      </div>

      <ul className="list-group">

        {tickets.map(ticket => (
       
            <li key={ticket._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{ticket.subject}</h5>
                <p>{ticket.description}</p>
                <small>Status: {ticket.status}</small>
              </div>
              <div>
                <button onClick={() => handleEdit(ticket)} className="btn btn-info btn-sm me-2">Edit</button>
                <button onClick={() => handleDelete(ticket._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </li>



        ))}
      </ul>
    </div>
  );
}

export default App;