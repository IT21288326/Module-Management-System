import React, { useEffect, useState } from 'react';
import './finalMarking.scss';

function MarkingRubricsCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/markingRubrics')
      .then(response => response.json())
      .then(data => {
        const finalMarkingData = data.filter(item => 
          item.type === 'Final Marking' && 
          item.marking.some(mark => mark.markingArea.endsWith('Presentation'))
        );
        setData(finalMarkingData);
      });
  }, []);

  return (
    <div className='Russa_Final_Marking_Rubric'>
        <div className="rubric-table-container">
        <table className="rubric-table">
            <thead>
            <tr className="rubric-header-row">
                <th className="border-right rubric-header-cell">Presentation Type</th>
                <th className="rubric-header-cell">Weightage (Out of 100)</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                item.marking
                  .filter(mark => mark.markingArea.endsWith('Presentation'))
                  .map((mark, i) => (
                    <tr key={`${index}-${i}`} className="rubric-row">
                        <td className="border-right rubric-cell">{mark.markingArea}</td>
                        <td className="rubric-cell">{mark.marks}%</td>
                    </tr>
                  ))
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
}

export default MarkingRubricsCard;