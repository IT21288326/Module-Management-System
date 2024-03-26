import React from 'react';
import DonutChart from './Dounut';
import LineChart from './Line';
import InProgress from './InProgress';

export default function SupervisorDashboard() {
  return (
    <div>
        <div class="card" style={{ width: '65%' }}>
        <div class="card-body">
        <h5>Deadlines and progress</h5>
          <br></br><InProgress/>
          
        </div>
      </div>
      <br></br><br></br>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div class="card" style={{ width: '30%' }}>
        <div class="card-body">
        <h5>Student enrollment with speacilization in 2024 acadamic year</h5>
          <br></br><DonutChart></DonutChart>
          
        </div>
      </div>
      <div class="card" style={{ width: '65%' }}>
        <div class="card-body">
            <h5>2022 and 2023 Progress Distribution</h5>
          <LineChart></LineChart>
        </div>
      </div>
    </div>
    
    
    </div>
  );
}
