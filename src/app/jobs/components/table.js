import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from './modal';
import StartModal from './startModal';
import DeleteModal from './deleteModal';
import moment from "moment";
import { BsTrash, BsPencilFill, BsPlay } from "react-icons/bs";
import { BiRefresh, BiMoney } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { DataGetAction } from "../../redux/actions/actionUtils";
import { Pagination } from 'react-bootstrap'; // Import Pagination component
import WorkerBidModal from "./workerBidModal";
import VendorBidModal from "./vendorBidModal";
import CancelModal from "./cancelModal";

const Index = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openWorkerBidModal, setOpenWorkerBidModal] = useState(false);
    const [openVendorBidModal, setOpenVendorBidModal] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openStartModal, setOpenStartModal] = useState(false);
    const tableData = useSelector((state) => state.job.jobs) || [];
    const pagination = useSelector((state) => state.job.pagination) || {};
    const dispatch = useDispatch();
    const onCancel = (row) => {
        setOpenCancelModal(true);
        setSelectedRow(row)
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    const onEdit = (row) => {
        setOpenModal(true);
        setSelectedRow(row)
    }
    const onStart = (row) => {
        setOpenStartModal(true);
        setSelectedRow(row)
    }
    const onDelete = (row) => {
        setOpenDeleteModal(true);
        setSelectedRow(row)
    }
    const onWorkerBid = (row) => {
        setOpenWorkerBidModal(true);
        setSelectedRow(row)
    }
    const onVendorBid = (row) => {
        setOpenVendorBidModal(true);
        setSelectedRow(row)
    }
    const actionButtonGenerator = (data) => {
        if (data.status === 'new') {
            return <>
                <BsPencilFill onClick={() => { onEdit(data) }} color='blue' />
                {" | "}
                <BsTrash color='red' onClick={() => { onDelete(data) }} />

            </>
        }
        if (data.status == 'cancelled') {
            return <>
                <AiFillEye title='Bid' size={'1.4rem'} style={{ cursor: 'pointer' }} onClick={() => {
                    onCancel(data)

                }} />
            </>
        }
        if (userData.role == 'manager' && data.status == 'new')
            return <BsPlay color='green' size={"1.4rem"} onClick={() => { onStart(data) }} ></BsPlay>


        if (data.status == 'active' && userData.role == 'worker') {
            return <>
                <BiMoney color='green' title='Worker Bid' size={'1.4rem'} style={{ cursor: 'pointer' }} onClick={() => {
                    onWorkerBid(data)

                }} />
            </>
        }
        if (data.status == 'active' && userData.role == 'vendor') {
            return <>
                <BiMoney  color='green' title='Vendor Bid' size={'1.4rem'} style={{ cursor: 'pointer' }} onClick={() => {
                    onVendorBid(data)

                }} />
            </>
        }

    }
    useEffect(() => {
        dispatch(DataGetAction("jobs/getAll", '', ''))
    }, [pagination.currentPage]); // Update the useEffect dependency to include pagination.currentPage

    const totalPages = Math.ceil(pagination.totalItems / pagination.limit);

    const handlePageChange = (page) => {
        dispatch(DataGetAction("jobs/getAll", '', `page=${page}`));
    }
    const createStatus = (status) => {
        switch (status) {
            case 'new':
                return <label className="badge badge-success">New</label>;
            case 'in_review':
                return <label className="badge badge-info">In Review</label>;
            case 'scheduled':
                return <label className="badge badge-primary">Scheduled</label>;
            case 'active':
                return <label className="badge badge-primary">Active</label>;
            case 'confirmed':
                return <label className="badge badge-primary">Confirmed</label>;
            case 'in_progress':
                return <label className="badge badge-warning">In Progress</label>;
            case 'completed':
                return <label className="badge badge-success">Completed</label>;
            case 'paid':
                return <label className="badge badge-success">Paid</label>;
            case 'finished':
                return <label className="badge badge-success">Finished</label>;
            case 'cancelled':
                return <label className="badge badge-danger">Cancelled</label>;
            case 'rejected':
                return <label className="badge badge-danger">Rejected</label>;
            default:
                return null;
        }
    }
    return (
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-6'>
                                <h4 className="card-title">Job Board</h4>
                                <p className="card-description">Job Posted Here</p>
                            </div>
                            <div className='col-6'>
                                <BiRefresh onClick={() => {
                                    dispatch(DataGetAction("jobs/getAll", '', ''))
                                }} size={'1.4rem'} className='ml-3 float-right' />
                                <button type="button" onClick={() => setOpenModal(true)} className="btn btn-primary float-right">Add</button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Assigned To</th>
                                        <th>Job Requester</th>
                                        <th>Job Manager</th>
                                        <th>Job Vendor</th>
                                        <th>Type</th>
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
                                                    <td>{e.name}</td>
                                                    <td>{e.description}</td>
                                                    <td>{e.category}</td>
                                                    <td>{e.assignedTo}</td>
                                                    <td>{e.jobRequester && e.jobRequester.firstName + ' ' + e.jobRequester.lastName}</td>
                                                    <td>{e.jobManager && e.jobManager.firstName + ' ' + e.jobManager.lastName}</td>
                                                    <td>{e.jobVendor && e.jobVendor.firstName + ' ' + e.jobVendor.lastName}</td>
                                                    <td>{e.type}</td>
                                                    <td>{moment(e.createdAt).format("LLLL")}</td>
                                                    <td>{createStatus(e.status)}</td>
                                                    <td>

                                                        {actionButtonGenerator(e)}
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
            <StartModal openModal={openStartModal} setOpenModal={setOpenStartModal} data={selectedRow} />
            {openWorkerBidModal && (
                <WorkerBidModal openModal={openWorkerBidModal} setOpenModal={setOpenWorkerBidModal} data={selectedRow} />
            )}
             {openVendorBidModal && (
                <VendorBidModal openModal={openVendorBidModal} setOpenModal={setOpenVendorBidModal} data={selectedRow} />
            )}
            <CancelModal openModal={openCancelModal} setOpenModal={setOpenCancelModal} data={selectedRow} />

        </div >
    )
}

export default Index;
