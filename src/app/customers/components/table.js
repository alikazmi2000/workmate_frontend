import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from './modal';
import DeleteModal from './deleteModal';
import moment from "moment";
import { BsTrash, BsPencilFill, } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import { DataGetAction } from "../../redux/actions/actionUtils";
import { Pagination } from 'react-bootstrap'; // Import Pagination component

const Index = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const tableData = useSelector((state) => state.user.users) || [];
    const newUser = useSelector((state) => state.user.newUser) || {};
    console.log(tableData);
    const pagination = useSelector((state) => state.user.pagination) || {};
    const dispatch = useDispatch();
    const onEdit = (row) => {
        setOpenModal(true);
        setSelectedRow(row)
    }
    const onDelete = (row) => {
        setOpenDeleteModal(true);
        setSelectedRow(row)
    }
    useEffect(() => {
        dispatch(DataGetAction("users/getAll/customer", '', ''))
    }, [newUser]);

    // Calculate the total number of pages
    const totalPages = Math.ceil(pagination.totalItems / pagination.limit);

    // Define a function to handle page change
    const handlePageChange = (page) => {
        dispatch(DataGetAction("users/getAll/customer", '', `page=${page}`));
    }

    return (
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-6'>
                                <h4 className="card-title">Customers Data</h4>
                                <p className="card-description"> You can manage your users here</p>
                            </div>
                            <div className='col-6'>
                                <BiRefresh onClick={() => {
                                    dispatch(DataGetAction("users/getAll/customer", '', ''))
                                }} size={'1.4rem'} className='ml-3 float-right' />
                                <button type="button" onClick={() => setOpenModal(true)} className="btn btn-primary float-right ">Add</button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone Number</th>
                                        <th>Role.</th>
                                        <th>Created</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tableData && tableData.map(e => {
                                            return (
                                                <tr key={e._id}> {/* Add key prop to each row */}
                                                    <td>{e.firstName + ' ' + e.lastName}</td>
                                                    <td>{e.phoneNumber}</td>
                                                    <td>{e.role}</td>
                                                    <td>{moment(e.createdAt).format("LLLL")}</td>
                                                    <td><label className="badge badge-success">{e.status}</label></td>
                                                    <td>
                                                        <BsPencilFill onClick={() => { onEdit(e) }} color='blue' />
                                                        {" | "}
                                                        <BsTrash color='red' onClick={() => { onDelete(e) }} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add Pagination component */}
            <div className="col-lg-12">
                <Pagination className="mt-3 justify-content-center">
                    <Pagination.Prev
                        disabled={pagination.currentPage === 1}
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                    />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === pagination.currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        disabled={pagination.currentPage === totalPages}
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                    />
                </Pagination>
            </div>
            <Modal openModal={openModal} setOpenModal={setOpenModal} data={selectedRow} />
            <DeleteModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} data={selectedRow} />
        </div>
    )
}

export default Index;
