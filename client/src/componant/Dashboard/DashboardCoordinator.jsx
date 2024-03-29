import React from 'react';
import DonutChart from './Dounut';
import LineChart from './Line';
import InProgress from './InProgress';
import BarChart from './Bar';
import CardsGroup from './CardsGroup';
import Calendar from './Calender';

export default function DashboardCoordinator() {
  return (
    <div>
        
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div class="card" style={{ width: '60%' }}>
        <div class="card-body">
        <h5>Student enrollment with speacilization in 2024 acadamic year</h5><br></br><br></br>
          <BarChart/>
          
        </div>
      </div>
      <div class="card" >
        <div class="card-body">
           <CardsGroup></CardsGroup>
        </div>
      </div>
    </div>
    <br></br><br></br>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div class="card" style={{ width: '32%' }}>
        <div class="card-body">
        <h5>Student enrollment with speacilization in 2024 acadamic year</h5>
          <br></br><DonutChart></DonutChart>
          
        </div>
      </div>
      <div class="card" style={{ width: '65%' }}>
        <div class="card-body">
            <h5>2022 and 2023 Progress Distribution</h5>
            <InProgress/>
        </div>
      </div>
    </div>
<br></br><br></br>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div class="card" style={{ width: '65%' }}>
        <div class="card-body">
        <h5>Progress comparing to 2023</h5>
          <br></br>
        <LineChart/>
          
        </div>
      </div>
      <div class="card" style={{ width: '33%' }}>
        <div class="card-body">
        <Calendar></Calendar>
        </div>
      </div>
    </div>

    

      

    </div>
  );
}
