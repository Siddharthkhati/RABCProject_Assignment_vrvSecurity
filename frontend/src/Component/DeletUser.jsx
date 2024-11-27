import React from 'react';

export default function DeleteUser({ handleUserDelete }) {
    return (
        <div id="deleteEmployeeModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Delete User</h4>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this user?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-default" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={handleUserDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
