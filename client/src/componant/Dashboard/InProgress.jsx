import React from 'react'
import { ProgressBar } from 'react-bootstrap';
export default function InProgress() {
  return (
    <div>
      <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: '15%' }}> Assesment </th>
                        <th style={{ width: '25%' }}> Progress </th>
                        <th style={{ width: '10%' }}> Deadline </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> Report 1 marking </td>
                        <td>
                          <ProgressBar variant="success" now={25} />
                        </td>
                        <td> May 15, 2024 </td>
                      </tr>
                      <tr>
                        <td> Report 2 marking </td>
                        <td>
                          <ProgressBar variant="danger" now={75} />
                        </td>
                        <td> July 1, 2024 </td>
                      </tr>
                      <tr>
                        <td> Final Report Marking </td>
                        <td>
                          <ProgressBar variant="warning" now={90} />
                        </td>
                        <td> Apr 12, 2024 </td>
                      </tr>
                      <tr>
                        <td> Log book Marking </td>
                        <td>
                          <ProgressBar variant="primary" now={50} />
                        </td>
                        <td> May 15, 2024 </td>
                      </tr>
                      <tr>
                        <td> Proposal Marking </td>
                        <td>
                          <ProgressBar variant="danger" now={60} />
                        </td>
                        <td> May 03, 2024 </td>
                      </tr>
                      <tr>
                        <td> Proposal Mark distribution </td>
                        <td>
                          <ProgressBar variant="info" now={65} />
                        </td>
                        <td> April 05, 2024 </td>
                      </tr>
                      <tr>
                        <td> Final Mark distribution </td>
                        <td>
                          <ProgressBar variant="warning" now={20} />
                        </td>
                        <td> June 16, 2024 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
    </div>
  )
}
