
// PresentationPannelTable.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { PresentationPannelColumns } from "../../../datatablesource.js";
import AddPresentationPannel from "../add-presentation-pannel-comp/AddPresentationPannelComp";
import UpdatePresentationPannel from "../update-presentation-pannel-comp/UpdatePresentationPannel.jsx";
import "./presentationPanneltabComp.scss";

const PresentationPannelTable = () => {
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPannelModal, setShowAddPannelModal] = useState(false);
  const [updatePanelId, setUpdatePanelId] = useState(null);
  const [reload, setReload] = useState(false); // State to trigger reload

  useEffect(() => {
    const fetchPresentationPannel = async () => {
      try {
        const response = await axios.get("http://localhost:3001/presentation-pannel");
        setList(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching presentation pannel:", error);
      }
    };

    fetchPresentationPannel();
  }, [reload]); // Reload when 'reload' state changes

  useEffect(() => {
    const filtered = list.filter((item) =>
      item.presentationType.toLowerCase().includes(searchQuery.toLowerCase())
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
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3001/presentation-pannel/${id}`);
        setList(list.filter((item) => item._id !== id));
        setFilteredData(filteredData.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Your Pannel has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting presentation Pannel:", error);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    const text = "Presentation Pannel Details";
    const textWidth = doc.getTextDimensions(text).w;
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, 50);
    const sliitlogo = require("../../../Images/SLIIT_logo.png");
    doc.addImage(sliitlogo, "png", 95, 10, 23, 25);
    const fontSize = 20;
    doc.setFontSize(fontSize);
    doc.autoTable({
      startY: 60,
      theme: "striped",
      headStyles: { fillColor: [92, 30, 154] },
      alternateRowStyles: { fillColor: [231, 215, 252] },
      tableLineColor: [92, 30, 154],
      tableLineWidth: 0.1,
      head: [["Pannel Name","Presentation Type" ,"Examiner 01", "Examiner 02", "Examiner 03"]],
      body: list.map((item) => [item.pannelID,item.presentationType, item.examiner_1, item.examiner_2, item.examiner_3]),
    });
    doc.save("Presentation Panel Details.pdf");
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="Russa_PresentationPannelTable_cellAction">
          <button className="Russa_PresentationPannelTable_updateButton" onClick={() => setUpdatePanelId(params.row._id)}>
            <UpdateIcon />
          </button>
          <button className="Russa_PresentationPannelTable_deleteButton" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const handlePanelUpdate = () => {
    setReload(!reload); // Trigger reload
  };

  return (
      <div className="Russa_PresentationPannelTable">
        <h1>Presentation Pannels</h1>
        <div className="Russa_PresentationPannelTable_searchContainer">
          <button onClick={downloadPdf} className="Russa_PresentationPannelTable_export">
            Export as PDF
          </button>
          <div className="Russa_PresentationPannelTable_input_search">
            <div className="Russa_PresentationPannelTable_searchIcon">
              <SearchIcon />
            </div>
            <input
              className="Russa_PresentationPannelTable_input_field_search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Presentation Type"
            />
            
          </div>
          <button onClick={() => setShowAddPannelModal(true)} className="Russa_PresentationPannelTable_addNew">
            <AddIcon />
            Add New Pannel
          </button>
        </div>
        <div className="Russa_PresentationPannelTable_presentationGridContainer">
          <DataGrid
            rows={filteredData}
            columns={[...PresentationPannelColumns, ...actionColumn]}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
            getRowId={(row) => row._id}
            columnWidth={200} // Adjust the column width as needed
          />
        </div>
        {updatePanelId && <UpdatePresentationPannel id={updatePanelId} onClose={() => setUpdatePanelId(null)} onPanelUpdate={handlePanelUpdate} />}
        {showAddPannelModal && <AddPresentationPannel onClose={() => { setShowAddPannelModal(false); setReload(!reload); }} />}
      </div>
  );
};

export default PresentationPannelTable;
