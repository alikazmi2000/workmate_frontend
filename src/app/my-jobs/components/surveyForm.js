import React from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

const SurveyForm = ({ onCompleteSurvey }) => {
  // Survey JSON definition
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

  return (
    <div className="survey-form">
      <Survey.Survey
        json={surveyJSON}
        showCompletedPage={false}
        onComplete={onCompleteSurvey}
      />
    </div>
  );
};

export default SurveyForm;
