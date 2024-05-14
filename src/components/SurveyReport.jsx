import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importing Chart.js library

function SurveyReport({ survey }) { // SurveyReport component with a prop survey
  const chartRef = useRef(null); // Creating a reference to the canvas element
  let chartInstance = null; // Initializing chart instance variable

  useEffect(() => { // useEffect hook to handle side effects
    if (!survey) return; // If survey data is not available, exit early

    // Calculating male count by iterating over questions and options
    const maleCount = survey.questions.reduce((total, question) => {
      return (
        total +
        question.options.reduce(
          (sum, option) =>
            option.gender === 'male' ? sum + option.count : sum,
          0
        )
      );
    }, 0);

    // Calculating female count by iterating over questions and options
    const femaleCount = survey.questions.reduce((total, question) => {
      return (
        total +
        question.options.reduce(
          (sum, option) =>
            option.gender === 'female' ? sum + option.count : sum,
          0
        )
      );
    }, 0);

    const ctx = chartRef.current.getContext('2d'); // Getting canvas context

    if (chartInstance) { // If chart instance exists, destroy it to avoid memory leaks
      chartInstance.destroy();
    }

    // Creating new Chart instance with pie chart configuration
    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'], // Labels for pie chart
        datasets: [
          {
            label: 'Gender Distribution', // Dataset label
            data: [maleCount, femaleCount], // Data for the pie chart
            backgroundColor: ['#007bff', '#ff1493'], // Colors for each data segment
          },
        ],
      },
    });

    return () => { // Cleanup function to destroy chart instance when component unmounts
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [survey]); // Dependency array ensures useEffect runs only when survey prop changes

  if (!survey) { // If survey data is not available, show loading message
    return <div>Loading...</div>;
  }

  // Rendering survey report with title, description, image, and chart
  return (
    <div className="container">
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <div className="row">
        <div className="col-md-6">
          <img src={survey.img} alt={survey.title} className="img-fluid" /> {/* Survey image */}
        </div>
        <div className="col-md-6">
          <canvas ref={chartRef} /> {/* Canvas element for chart */}
          <h2>Survey Questions and Results</h2>
          {survey.questions.map(question => ( // Mapping over survey questions
            <div className="card mb-3" key={question.id}>
              <div className="card-header">{question.qs}</div> {/* Question */}
              <div className="card-body">
                <ul className="list-group">
                  {question.options.map(option => ( // Mapping over options for each question
                    <li className="list-group-item" key={option.id}>
                      {option.op}: {option.count} responses {/* Option and response count */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyReport; // Exporting SurveyReport component