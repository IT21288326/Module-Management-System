import React, { useEffect, useState } from 'react';
import './finalMarking.scss';

function ReportMarkingRubricsCard() {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:3001/assesment/assessments/type-weightage')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter data to include only items with assement_Name ending in "Presentation"
          const filteredData = data.filter(item => item.assement_Name.endsWith('Report'));
          setData(filteredData);
        } else {
          console.error('Data fetched is not an array:', data);
          setData([]); // Set data to an empty array or handle accordingly
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setData([]); // Set data to an empty array or handle accordingly in case of error
      });
  }, []);

  return (
    <div className='Russa_Final_Marking_Rubric'>
        <div className="rubric-table-container">
        <table className="rubric-table">
            <thead>
            <tr className="rubric-header-row">
                <th className="border-right rubric-header-cell">Assessment Name</th>
                <th className="rubric-header-cell">Weightage (Out of 100)</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
              <tr key={index} className="rubric-row">
                  <td className="border-right rubric-cell">{item.assement_Name}</td>
                  <td className="rubric-cell">{item.weightage}</td>
              </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
}
export default ReportMarkingRubricsCard;