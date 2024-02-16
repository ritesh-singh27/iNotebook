import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const [alert, setAlert] = useState(null);

    const handleDelete = () => {
        const shouldDelete = window.confirm("Are you sure you want to delete this note?");
        if (shouldDelete) {
            deleteNote(note._id);
            setAlert({ msg: 'Note deleted successfully', type: 'success' });

            // Clear the alert after a certain duration
            setTimeout(() => {
                setAlert(null);
            }, 1500);
        }
    };

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={handleDelete}></i>
                        <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>

            {/* Display the alert message */}
            {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.msg}
                </div>
            )}
        </div>
    );
};

export default Noteitem;
