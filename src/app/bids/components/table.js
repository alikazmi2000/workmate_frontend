import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from './modal';
import DeleteModal from './deleteModal';
import WorkerBidModal from './workerBidModal';
import VendorBidModal from './vendorBidModal';
import moment from "moment";
import { BsSendCheckFill } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import { DataGetAction } from "../../redux/actions/actionUtils";
import { Pagination } from 'react-bootstrap'; // Import Pagination component

const Index = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openWorkerBidModal, setOpenWorkerBidModal] = useState(false);
    const [openVendorBidModal, setOpenVendorBidModal] = useState(false);
    const workerTableData = useSelector((state) => state.bid.workerBids) || [];
    const vendorTableData = useSelector((state) => state.bid.vendorBids) || [];
    const jobData = useSelector((state) => state.bid.jobData) || {};
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');
    console.log(id);
    const vendorPagination = useSelector((state) => state.bid.vendorPagination) || {};
    const workerPagination = useSelector((state) => state.bid.workerPagination) || {};
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
        dispatch(DataGetAction("bids/getWorkerBidsByJobId", '', `jobId=${id}&bidType=worker_bid`))
        dispatch(DataGetAction("bids/getVendorBidsByJobId", '', `jobId=${id}&bidType=vendor_bid`))
    }, []);

    const totalVendorPages = Math.ceil(vendorPagination.totalItems / vendorPagination.limit);
    const totalWorkerPages = Math.ceil(workerPagination.totalItems / workerPagination.limit);
    const handlePageChange = (page, type) => {
        if (type == 'worker')
            dispatch(DataGetAction("bids/getWorkerBidsByJobId", '', `jobId=${id}&page=${page}&bidType=worker_bid`));
        if (type == 'vendor')
            dispatch(DataGetAction("bids/getVendorBidsByJobId", '', `jobId=${id}&page=${page}&bidType=vendor_bid`));
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-6'>
                                    <h4 className="card-title">Bids By Workers</h4>
                                    <p className="card-description"> You can manage Bids Here</p>
                                </div>
                                <div className='col-6'>
                                    <BiRefresh onClick={() => {
                                        dispatch(DataGetAction("bids/getWorkerBidsByJobId", '', `jobId=${id}&bidType=worker_bid`))
                                    }} size={'1.4rem'} className='ml-3 float-right' />
                                    <button type="button" onClick={() => setOpenModal(true)} className="btn btn-primary float-right ">Add</button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Bidder</th>
                                            <th>Bid Type</th>
                                            <th>Time</th>
                                            <th>status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            workerTableData && workerTableData.map(e => {
                                                return (
                                                    <tr key={e._id}> {/* Add key prop to each row */}
                                                        <td>{e.bidder && e.bidder[0] && (e.bidder[0].firstName + ' ' + e.bidder[0].lastName)}</td>
                                                        <td>{e.bidType}</td>
                                                        <td>{moment(e.createdAt).format("LLLL")}</td>
                                                        <td><label className="badge badge-success">{e.status}</label></td>
                                                        <td>
                                                            {
                                                                e.status == 'pending' && (
                                                                    <BsSendCheckFill
                                                                        onClick={() => {
                                                                            setSelectedRow(e);
                                                                            setOpenWorkerBidModal(true);
                                                                        }}
                                                                        color='blue'
                                                                        size='1.2rem'
                                                                        title='view & assign' />
                                                                )
                                                            }
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
                            disabled={workerPagination.currentPage === 1}
                            onClick={() => handlePageChange(workerPagination.currentPage - 1)}
                        />
                        {Array.from({ length: totalWorkerPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === workerPagination.currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={workerPagination.currentPage === totalWorkerPages}
                            onClick={() => handlePageChange(workerPagination.currentPage + 1, 'worker')}
                        />
                    </Pagination>
                </div>
                <Modal openModal={openModal} setOpenModal={setOpenModal} data={selectedRow} />
                <DeleteModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} data={selectedRow} />
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-6'>
                                    <h4 className="card-title">Bids By Vendors</h4>
                                    <p className="card-description"> You can manage Bids Here</p>
                                </div>
                                <div className='col-6'>
                                    <BiRefresh onClick={() => {
                                        dispatch(DataGetAction("bids/getVendorBidsByJobId", '', `jobId=${id}&bidType=vendor_bid`))
                                    }} size={'1.4rem'} className='ml-3 float-right' />
                                    <button type="button" onClick={() => setOpenModal(true)} className="btn btn-primary float-right ">Add</button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Bidder</th>
                                            <th>Bid Type</th>
                                            <th>Time</th>
                                            <th>status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            vendorTableData && vendorTableData.map(e => {
                                                return (
                                                    <tr key={e._id}> {/* Add key prop to each row */}
                                                        <td>{e.bidder && e.bidder[0] && (e.bidder[0].firstName + ' ' + e.bidder[0].lastName)}</td>
                                                        <td>{e.bidType}</td>
                                                        <td>{moment(e.createdAt).format("LLLL")}</td>
                                                        <td><label className="badge badge-success">{e.status}</label></td>
                                                        {
                                                            e.status == 'pending' && (
                                                                <BsSendCheckFill
                                                                    onClick={() => {
                                                                        setSelectedRow(e);
                                                                        setOpenVendorBidModal(true);
                                                                    }}
                                                                    color='blue'
                                                                    size='1.2rem'
                                                                    title='view & assign' />
                                                            )
                                                        }
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
                            disabled={vendorPagination.currentPage === 1}
                            onClick={() => handlePageChange(vendorPagination.currentPage - 1)}
                        />
                        {Array.from({ length: totalVendorPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === vendorPagination.currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={vendorPagination.currentPage === totalVendorPages}
                            onClick={() => handlePageChange(vendorPagination.currentPage + 1, 'vendor')}
                        />
                    </Pagination>
                </div>
                <Modal openModal={openModal} setOpenModal={setOpenModal} data={selectedRow} />
                <DeleteModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} data={selectedRow} />
                {openWorkerBidModal && (
                    <WorkerBidModal openModal={openWorkerBidModal} setOpenModal={setOpenWorkerBidModal} data={{ bidData: selectedRow, jobData }} />

                )}
                {openVendorBidModal && (
                    <VendorBidModal openModal={openVendorBidModal} setOpenModal={setOpenVendorBidModal} data={{ bidData: selectedRow, jobData }} />

                )}
            </div>
        </>
    )
}

export default Index;
