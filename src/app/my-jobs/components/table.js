import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ScheduleModal from "./scheduleAppointment";
import SurveyModal from "./surveyModal";
import CancelModal from "./cancelModal";
import WorkerBidModal from "./workerBidModal";
import moment from "moment";
import { BiRefresh, BiTimeFive, BiMoney, BiTrash } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { FcSurvey } from "react-icons/fc";
import { DataGetAction } from "../../redux/actions/actionUtils";
import { Pagination } from 'react-bootstrap'; // Import Pagination component
import { BsEye } from 'react-icons/bs';

const Index = () => {
    const [openScheduleModal, setOpenScheduleModal] = useState(false);
    const [openSurveyModal, setOpenSurveyModal] = useState(false);
    const [openWorkerBidModal, setOpenWorkerBidModal] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const tableData = useSelector((state) => state.job.jobs) || [];
    const pagination = useSelector((state) => state.job.pagination) || {};
    const dispatch = useDispatch();
    const userData = JSON.parse(localStorage.getItem('userData'));

    const onSchedule = (row) => {
        setOpenScheduleModal(true);
        setSelectedRow(row)
    }
    const onSurvey = (row) => {
        setOpenSurveyModal(true);
        setSelectedRow(row)
    }
    const onCancel = (row) => {
        setOpenCancelModal(true);
        setSelectedRow(row)
    }
    const onBid = (row) => {
        setOpenWorkerBidModal(true);
        setSelectedRow(row)
    }
    useEffect(() => {
        dispatch(DataGetAction("jobs/getMyJobs", '', ''))
    }, [pagination.currentPage]); // Update the useEffect dependency to include pagination.currentPage

    // Calculate the total number of pages
    const totalPages = Math.ceil(pagination.totalItems / pagination.limit);

    // Define a function to handle page change
    const handlePageChange = (page) => {
        dispatch(DataGetAction("jobs/getMyJobs", '', `page=${page}`));
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

    const actionButtonGenerator = (data) => {
        if (data.status == 'in_review' && userData.role == 'manager') {
            return <BiTimeFive onClick={() => { onSchedule(data) }} style={{ cursor: 'pointer' }} title='Schedule Appointment' className='mx-2' size={'1.4rem'} color='orange'></BiTimeFive>
        }
        if (data.status == 'scheduled' && userData.role == 'manager') {
            return <>
                <FcSurvey onClick={() => { onSurvey(data) }} style={{ cursor: 'pointer' }} title='Schedule Appointment' className='mx-2' size={'1.4rem'} color='orange'></FcSurvey>
                {" | "}
                <BiTrash color='red' size={'1.4rem'} style={{ cursor: 'pointer' }} title='Cancel Job' onClick={() => { onCancel(data) }} />
            </>
        }
        if (data.status == 'cancelled') {
            return <>
                <AiFillEye title='Bid' size={'1.4rem'} style={{ cursor: 'pointer' }} onClick={() => {
                    onCancel(data)

                }} />
            </>
        }
        if (data.status == 'active') {
            return <>
                <BiMoney title='Reason' size={'1.4rem'} style={{ cursor: 'pointer' }} onClick={() => {
                    onBid(data)

                }} />
            </>
        }

    }
    return (
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-6'>
                                <h4 className="card-title">My Jobs</h4>
                                <p className="card-description">You can manage your jobs here</p>
                            </div>
                            <div className='col-6'>
                                <BiRefresh onClick={() => {
                                    dispatch(DataGetAction("jobs/getMyJobs", '', ''))
                                }} size={'1.4rem'} className='ml-3 float-right' />
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
                                                        {/* <BsPencilFill onClick={() => { onEdit(e) }} color='blue' /> */}
                                                        {/* {" | "} */}
                                                        {/* <BsTrash color='red' onClick={() => { onDelete(e) }} />
                                                        {
                                                            " | "
                                                        } */}
                                                        {/* {
                                                           
                                                        }
                                                        {
                                                            ['worker', 'vendor'].includes(userData.role) && e.status == 'active' && (
                                                                <BiMoney color='green' size={"1.4rem"} onClick={() => { onStart(e) }} ></BiMoney>

                                                            )
                                                        } */}
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
            <ScheduleModal openModal={openScheduleModal} setOpenModal={setOpenScheduleModal} data={selectedRow} />
            <SurveyModal openModal={openSurveyModal} setOpenModal={setOpenSurveyModal} data={selectedRow} />
            <CancelModal openModal={openCancelModal} setOpenModal={setOpenCancelModal} data={selectedRow} />
            <WorkerBidModal openModal={openWorkerBidModal} setOpenModal={setOpenWorkerBidModal} data={selectedRow} />
        </div >
    )
}

export default Index;
