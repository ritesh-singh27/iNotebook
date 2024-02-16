import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate, useLocation } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const [firstTimeAccess, setFirstTimeAccess] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (firstTimeAccess && !localStorage.getItem('token') && location.pathname === '/Notes') {
            setFirstTimeAccess(false);
            navigate('/Login');
        } else if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/Login');
        }
    }, [getNotes, navigate, firstTimeAccess, location.pathname]);

    const updateNote = (currentNote) => {
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
        setShowModal(true);
    };

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setShowModal(false);
        setAlert({ msg: 'Note updated successfully', type: 'success' });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Form>
                    <Form.Group controlId="etitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="etitle" value={note.etitle} onChange={handleChange} minLength={5} required />
                    </Form.Group>
                    <Form.Group controlId="edescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required />
                    </Form.Group>
                    <Form.Group controlId="etag">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control type="text" name="etag" value={note.etag} onChange={handleChange} />
                    </Form.Group>
                </Form>
                <Button onClick={handleClick} variant="primary">
                    Update Note
                </Button>
            </Modal>

            {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.msg}
                </div>
            )}

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;