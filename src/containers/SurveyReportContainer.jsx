import React from 'react';
import { useParams } from 'react-router-dom';

// Importing the SurveyReport component
import SurveyReport from '../components/SurveyReport';

// Defining the SurveyReportContainer function component
function SurveyReportContainer({data}) {
  // Extracting the 'id' parameter from the URL using the useParams hook
  const { id } = useParams();
  
  // Finding the survey data corresponding to the extracted 'id' parameter
  const survey = data[id];

  // Rendering the SurveyReport component and passing the survey data as a prop
  return <SurveyReport survey={survey} />;
}

// Exporting the SurveyReportContainer component as the default export
export default SurveyReportContainer;