
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from './modal';
import DeleteModal from './deleteModal';
import moment from "moment"
import { BsTrash, BsPencilFill, } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import { DataGetAction } from "../../redux/actions/actionUtils"
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
        //DataGetAction params route,data,querystring
        dispatch(DataGetAction("users/getAll/worker", '', ''))
    }, [newUser])
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
                                <BiRefresh onClick={() => {
                                    dispatch(DataGetAction("users/getAll/worker", '', ''))

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
                                                <tr>
                                                    <td>{e.firstName + ' ' + e.lastName}</td>
                                                    <td>{e.phoneNumber}</td>
                                                    <td>{e.role}</td>
                                                    <td>{moment(e.createdAt).format("LLLL")}</td>
                                                    <td><label className="badge badge-success">{e.status}</label></td>
                                                    <td><BsPencilFill onClick={() => { onEdit(e) }} color='blue'>
                                                    </BsPencilFill> | <BsTrash color='red' onClick={() => { onDelete(e) }} ></BsTrash> </td>
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
            <Modal openModal={openModal} setOpenModal={setOpenModal} data={selectedRow} />
            <DeleteModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} data={selectedRow} />
        </div>
    )
}
export default Index