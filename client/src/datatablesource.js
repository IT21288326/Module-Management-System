export const PresentationSheduleColumns = [
  {
    field: "groupNo", 
    headerName: "Group Number", 
    width: 150,
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },

  {
    field: "startTime",
    headerName: "Start Time", // Change from "Time" to "Start Time"
    width: 130,
  },

  {
    field: "endTime",
    headerName: "End Time", // New field "End Time"
    width: 130,
  },

  {
    field: "venue",
    headerName: "Venue",
    width: 130,
  },

  { 
    field: "pannelID", 
    headerName: "Pannel ID", 
    width: 150 
  },
];


export const PresentationPannelColumns = [
  {
    field: "pannelID", 
    headerName: "Pannel Name", 
    width: 230,
  },
  {
    field: "examiner_1",
    headerName: "Examiner 01",
    width: 200,
  },

  {
    field: "examiner_2",
    headerName: "Examiner 02",
    width: 200,
  },
  {
    field: "examiner_3",
    headerName: "Examiner 03",
    width: 250,
  },
];
