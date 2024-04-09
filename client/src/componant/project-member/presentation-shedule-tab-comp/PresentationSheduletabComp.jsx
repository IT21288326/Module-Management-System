import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./presentationSheduletabComp.scss";
import { PresentationSheduleColumns } from "../../../datatablesource.js";
import SearchIcon from '@mui/icons-material/Search';
// import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRecord from '../add-presentation-shedule-record-comp/AddPresentationSheduleRecordComp.jsx';
import UpdatePresentationShedule from '../update-presetation-shedule-comp/UpdatepresetationSheduleComp.jsx';

const PresentationSheduleTable = () => {
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPannelModal, setShowAddPannelModal] = useState(false);
  const [updatePanelId, setUpdatePanelId] = useState(null); 

  useEffect(() => {
    const fetchPresentationSchedule = async () => {
      try {
        const response = await axios.get("http://localhost:3001/presentation-shedule");
        setList(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching presentation schedule:", error);
      }
    };

    fetchPresentationSchedule();
  }, []);

  useEffect(() => {
    // Filter data based on searchQuery
    const filtered = list.filter(item =>
      item.groupNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [list, searchQuery]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(141, 67, 252)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3001/presentation-shedule/${id}`);
        setList(list.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting presentation schedule:", error);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    const text="Presentation Shedule Details";
    const textWidth = doc.getTextDimensions(text).w;
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, 50);
    const sliitlogo = require('../../../Images/SLIIT_logo.png')
    doc.addImage(sliitlogo, 'png', 95,10,23,25);
    var fontSize = 20;
    doc.setFontSize(fontSize);
    doc.autoTable({
      startY:60,
      theme: "striped",
      headStyles :{fillColor : [92, 30, 154]}, 
      alternateRowStyles: {fillColor : [231, 215, 252]}, 
      tableLineColor: [92, 30, 154], 
      tableLineWidth: 0.1,
      head: [
        [  
          "Group Number",       
          "Scheduled Date",
          "Starting Time",
          "Ending Time",
          "Venue",
          "Presentation Type",
          "Examiner 01",
          "Examiner 02",
          "Examiner 03",
        ],
      ],
      body: list.map((item) => [
        item.groupNo,
        item.date,
        item.startTime,
        item.endTime,
        item.venue,
        item.presentationType,
        item.examiner_1,
        item.examiner_2,
        item.examiner_3,
      ]),
    });
    doc.save("Presentation Shedule Details.pdf");
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="Russa_PresentationShedeuleTable_cellAction">
          {/* <button className="Russa_PresentationShedeuleTable_updateButton" onClick={() => setUpdatePanelId(params.row._id)}>
          <UpdateIcon />
          </button> */}
          <button className="Russa_PresentationShedeuleTable_deleteButton" onClick={() => handleDelete(params.row._id)}>
          <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const updatePresentationScheduleList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/presentation-shedule");
      setList(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching presentation schedule:", error);
    }
  };

  return (
    <div className="Russa_PresentationShedeuleTable">
      <h1>Presentation Shedule</h1>
      <div className="Russa_PresentationShedeuleTable_searchContainer">
        <button onClick={downloadPdf} className="Russa_PresentationShedeuleTable_export">
          Export as PDF
        </button>
        <div className="Russa_PresentationShedeuleTable_input_search">
          <div className="Russa_PresentationShedeuleTable_searchIcon">
            <SearchIcon />
          </div>
          <input
            className="Russa_PresentationShedeuleTable_input_field_search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Group Number"
          />
        </div>
        <button onClick={() => setShowAddPannelModal(true)} className="Russa_PresentationShedeuleTable_addNew">
          <AddIcon />
          Add New Record
        </button>
      </div>
      <div className="Russa_PresentationSheduleTable_presentationGridContainer">
        <DataGrid
          rows={filteredData}
          columns={[...PresentationSheduleColumns, ...actionColumn]}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          getRowId={(row) => row._id}
          columnWidth={200} // Adjust the column width as needed
        />
      </div>
      
      {updatePanelId && <UpdatePresentationShedule id={updatePanelId} onClose={() => setUpdatePanelId(null)} updatePresentationScheduleList={updatePresentationScheduleList} />}
      {showAddPannelModal && <AddRecord onClose={() => setShowAddPannelModal(false)} updatePresentationScheduleList={updatePresentationScheduleList} />}
    </div>
  );
};

export default PresentationSheduleTable;
