import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../add-presentation-shedule-record-comp/AddPresentationSheduleRecordComp.scss";

const UpdatePresentationPannel = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        pannelID: "",
        examiner_1: "",
        examiner_2: "",
        examiner_3: "",
    });
    const [staffMemberOptions, setStaffMemberOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [panelResponse, staffResponse] = await Promise.all([
                    axios.get(`http://localhost:3001/presentation-pannel/${id}`),
                    axios.get("http://localhost:3001/api/projectMembers"),
                ]);
                const panelData = panelResponse.data;
                const staffData = staffResponse.data;
                setValues({
                    pannelID: panelData.pannelID,
                    examiner_1: panelData.examiner_1,
                    examiner_2: panelData.examiner_2,
                    examiner_3: panelData.examiner_3,
                });
                setStaffMemberOptions(staffData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/presentation-pannel/update/${id}`, values);
            if (response.status === 200) {
                Swal.fire("Done!", "Presentation Pannel Updated Successfully!", "success");
            } else {
                throw new Error("Failed to update panel");
            }
        } catch (error) {
            console.error("Error updating panel:", error);
        }
    };

    return (
        <div className="R_container_update">
            <div className="R_form-container_update">
                <form onSubmit={handleUpdate}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="pannelID">Panel Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pannelID"
                                placeholder="Enter a Panel Name"
                                disabled
                                value={values.pannelID}
                                onChange={(e) => setValues({ ...values, pannelID: e.target.value })}
                                style={{
                                    maxWidth: "800px",
                                    height: "45px",
                                    border: "1px solid #ffb43c",
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="examiner_1">Examiner 1</label>
                            <select
                                className="form-control"
                                id="examiner_1"
                                value={values.examiner_1}
                                onChange={(e) => setValues({ ...values, examiner_1: e.target.value })}
                                style={{
                                    maxWidth: "800px",
                                    height: "45px",
                                    border: "1px solid #ffb43c",
                                }}
                            >
                                <option value="">Select an examiner</option>
                                {staffMemberOptions.map((option) => (
                                    <option
                                        key={option}
                                        value={option}
                                        disabled={values.examiner_2 === option || values.examiner_3 === option}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="examiner_2">Examiner 2</label>
                            <select
                                className="form-control"
                                id="examiner_2"
                                value={values.examiner_2}
                                onChange={(e) => setValues({ ...values, examiner_2: e.target.value })}
                                style={{
                                    maxWidth: "800px",
                                    height: "45px",
                                    border: "1px solid #ffb43c",
                                }}
                            >
                                <option value="">Select an examiner</option>
                                {staffMemberOptions.map((option) => (
                                    <option
                                        key={option}
                                        value={option}
                                        disabled={values.examiner_1 === option || values.examiner_3 === option}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="examiner_3">Examiner 3</label>
                            <select
                                className="form-control"
                                id="examiner_3"
                                value={values.examiner_3}
                                onChange={(e) => setValues({ ...values, examiner_3: e.target.value })}
                                style={{
                                    maxWidth: "800px",
                                    height: "45px",
                                    border: "1px solid #ffb43c",
                                }}
                            >
                                <option value="">Select an examiner</option>
                                {staffMemberOptions.map((option) => (
                                    <option
                                        key={option}
                                        value={option}
                                        disabled={values.examiner_1 === option || values.examiner_2 === option}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" id="R_Button">
                            Update Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePresentationPannel;
