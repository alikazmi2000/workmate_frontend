import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DataRequestAction } from '../../redux/actions/actionUtils';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SurveyForm from './surveyForm'; // Import the SurveyForm component

const Index = ({ openModal, setOpenModal, data }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('userData'));
  const [isSurveyCompleted, setSurveyCompleted] = useState(false);
  const [surveyData, setSurveyData] = useState({});
  const [publishToVendors, setPublishToVendors] = useState(false); // State for "Publish to Vendors" switch
  const [publishToWorkers, setPublishToWorkers] = useState(false); // State for "Publish to Workers" switch

  const onClose = () => {
    setOpenModal(false);
  };

  const onAccept = () => {
    dispatch(DataRequestAction('POST', 'jobs/submitSurvey', { _id: data._id, surveyForm: surveyData, publishToVendors, publishToWorkers }));
    setOpenModal(false);

  };

  const onCompleteSurvey = (survey) => {
    setSurveyData(survey.data)
    setSurveyCompleted(true);
  };

  const handlePublishToVendorsChange = (event) => {
    setPublishToVendors(event.target.checked);
  };

  const handlePublishToWorkersChange = (event) => {
    setPublishToWorkers(event.target.checked);
  };

  return (
    <>
      <Modal show={openModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dear {user.firstName + ' ' + user.lastName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSurveyCompleted ? (
            <p>Thank you for completing the survey!</p>
          ) : (
            <div>
              <p>Please fill out the survey form below to describe the problem and situation.</p>
              {/* Survey Form */}
              <SurveyForm onCompleteSurvey={onCompleteSurvey} />
              {/* Form Switches */}
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="publishToVendors"
                  checked={publishToVendors}
                  onChange={handlePublishToVendorsChange}
                />
                <label className="form-check-label" htmlFor="publishToVendors">
                  Publish to Vendors
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="publishToWorkers"
                  checked={publishToWorkers}
                  onChange={handlePublishToWorkersChange}
                />
                <label className="form-check-label" htmlFor="publishToWorkers">
                  Publish to Workers
                </label>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          {isSurveyCompleted && (
            <Button variant="success" onClick={onAccept}>
              I am
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Index;
