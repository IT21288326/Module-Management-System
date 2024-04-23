import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import './reportMarkingRubricsView.scss';
import AddReportMarkingRubrics from '../Add Report marking Rubrics/AddReportMarkingRubrics';

const ReportMarkingRubricsView = () => {
  const [markingRubrics, setMarkingRubrics] = useState([]);
  const [showAddPanelModal, setShowAddPanelModal] = useState(false);

  useEffect(() => {
    fetchMarkingRubrics();
  }, []);

  const fetchMarkingRubrics = async () => {
    try {
      const response = await axios.get('http://localhost:3001/markingRubrics');
      const filteredRubrics = response.data.filter(
        rubric => rubric.type === 'Topic Assessment Form Report' || 
        rubric.type === 'Project Charter Report'|| 
        rubric.type === 'Status Document 1 Report'|| 
        rubric.type === 'Log Book Report'|| 
        rubric.type === 'Proposal Document Report'|| 
        rubric.type === 'Status Document 2 Report'|| 
        rubric.type === 'Final Report'
      );
      setMarkingRubrics(filteredRubrics);
    } catch (error) {
      console.error('Error fetching marking rubrics:', error);
    }
  };

  const handleDelete = async (rubricId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(141, 67, 252)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3001/markingRubrics/${rubricId}`);
        fetchMarkingRubrics(); // Fetch updated marking rubrics after deletion
        Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting report marking rubric:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This will delete all records of selected types. You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(141, 67, 252)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete all records!',
      });
  
      if (result.isConfirmed) {
        const rubricIdsToDelete = markingRubrics
          .map(rubric => rubric._id);

        await Promise.all(
          rubricIdsToDelete.map(async rubricId => {
            await axios.delete(`http://localhost:3001/markingRubrics/${rubricId}`);
          })
        );

        fetchMarkingRubrics();
        Swal.fire('Deleted!', 'All records have been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting all report marking rubrics:', error);
      Swal.fire('Error', 'Failed to delete all records.', 'error');
    }
  };
  
  return (
    <div className='Russa_ReportMarkingRubrics_Container'>
      <div className="container mt-4">
        <h2 className="mb-4">Reports Marking Rubrics</h2>
        <button onClick={() => setShowAddPanelModal(true)} className="Russa_PresentationMarkingRubrics_addNew">
          <AddIcon />
          Add New Marking Rubric
        </button>
        <button className="Russa_PresentationShedeuleTable_deleteRecords" onClick={handleDeleteAll}>
          <DeleteIcon className="DeleteIcon" />
          Delete All Records
        </button>

        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Report Type</th>
              <th>Marking Area</th>
              <th>Allocated Marks (Out of 100)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {markingRubrics.map((rubric) => (
              <React.Fragment key={rubric._id}>
                <tr>
                  <td rowSpan={rubric.marking.length}>{rubric.type}</td>
                  <td>{rubric.marking[0].markingArea}</td>
                  <td>{rubric.marking[0].marks}</td>
                  <td rowSpan={rubric.marking.length}>
                    <button className="Russa_markingRubrics_deleteButton" onClick={() => handleDelete(rubric._id)}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
                {rubric.marking.slice(1).map((item) => (
                  <tr key={item._id}>
                    <td>{item.markingArea}</td>
                    <td>{item.marks}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {showAddPanelModal && <AddReportMarkingRubrics onClose={() => setShowAddPanelModal(false)} reloadMarkingRubrics={fetchMarkingRubrics} />}
      </div>
    </div>
  );
};

export default ReportMarkingRubricsView;
