import React from 'react'
import DonutChart from './Dounut'

export default function DashboardCoordinator() {
  return (
    <div>
      <div class="card" style={{width:'20%'}}>
  <div class="card-body">
    <DonutChart></DonutChart>
  </div>
</div>
    </div>
  )
}
