
import React, { useState } from 'react';
import Modal from './modal';
import DeleteModal from './deleteModal';
import { BsTrash, BsPencilFill } from "react-icons/bs";

const Index = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const onEdit = (row) => {
        setOpenModal(true);
        setSelectedRow(row)

    }
    const onDelete = (row) => {
        setOpenDeleteModal(true);
        setSelectedRow(row)

    }

    return (
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-6'>
                                <h4 className="card-title">Workers Data</h4>
                                <p className="card-description"> You can manage your users here
                                </p>
                            </div>
                            <div className='col-6'>
                                <button type="button" onClick={() => setOpenModal(true)} class="btn btn-primary float-right">Add</button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Profile</th>
                                        <th>VatNo.</th>
                                        <th>Created</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Jacob</td>
                                        <td>53275531</td>
                                        <td>12 May 2017</td>
                                        <td><label className="badge badge-danger">Pending</label></td>
                                        <td><BsPencilFill onClick={() => { onEdit() }} color='blue'>
                                        </BsPencilFill> | <BsTrash color='red' onClick={() => { onDelete() }} ></BsTrash> </td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal openModal={openModal} setOpenModal={setOpenModal} data={selectedRow} />
            <DeleteModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} data={selectedRow} />
        </div>
    )
}
export default Index