import React from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

const SurveyViewModal = ({ surveyData, onClose }) => {
  const surveyJSON = {
    pages: [
      {
        name: 'page1',
        elements: [
          {
            type: 'text',
            name: 'problemDescription',
            title: 'Describe the problem or situation:',
            isRequired: true,
          },
          {
            type: 'radiogroup',
            name: 'severity',
            title: 'How severe is the problem?',
            isRequired: true,
            choices: ['Low', 'Medium', 'High'],
          },
          {
            type: 'checkbox',
            name: 'affectedAreas',
            title: 'Areas affected by the problem:',
            isRequired: true,
            choices: ['Production', 'Sales', 'Operations', 'Other'],
          },
          {
            type: 'text',
            name: 'otherAffectedArea',
            visibleIf: '{affectedAreas.contains("Other")}',
            title: 'Please specify other affected areas:',
          },
          {
            type: 'comment',
            name: 'additionalComments',
            title: 'Additional Comments (if any):',
          },
        ],
      },
    ],
  };

  // Create a new instance of Survey.Model with surveyJSON and surveyData
  const model = new Survey.Model(surveyJSON);
  model.data = surveyData;
  model.mode = 'display';

  return (
    <div className="survey-view-modal">
      <h3>Survey Form Data</h3>
      <Survey.Survey
        model={model} // Use the new model instance
        showCompletedPage={false}
      />
      <button className="btn btn-primary" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default SurveyViewModal;
