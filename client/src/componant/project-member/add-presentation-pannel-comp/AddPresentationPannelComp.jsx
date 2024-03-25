import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../add-presentation-shedule-record-comp/AddPresentationSheduleRecordComp.scss";

const AddPresentationPannel = () => {
    const [pannelID, setPannelID] = useState("");
    const [examiner_1, setExaminer_1] = useState("");
    const [examiner_2, setExaminer_2] = useState("");
    const [examiner_3, setExaminer_3] = useState("");
    const [examinerOptions, setExaminerOptions] = useState([]);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        const fetchExaminers = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/projectMembers");
                if (response.ok) {
                    const data = await response.json();
                    setExaminerOptions(data);
                } else {
                    throw new Error("Failed to fetch examiners");
                }
            } catch (error) {
                console.error("Error fetching examiners:", error);
            }
        };

        fetchExaminers();
    }, []);

    const handleExaminerChange = (e, setter, otherExaminers) => {
        const selectedExaminer = e.target.value;
        if (!otherExaminers.includes(selectedExaminer)) {
            setter(selectedExaminer);
        } else {
            Swal.fire("Error", "This examiner has already been selected.", "error");
        }
    };

    const renderOptions = (selectedExaminer, otherExaminers) => {
        return examinerOptions.map((option, index) => {
            const disabled = otherExaminers.includes(option) && option !== selectedExaminer;
            const style = disabled ? { color: "gray" } : {};
            return (
                <option key={index} value={option} disabled={disabled} style={style}>
                    {option}
                </option>
            );
        });
    };

    const checkPanelID = async () => {
        try {
            const response = await fetch(`http://localhost:3001/presentation-pannel/panel/${pannelID}`);
            const data = await response.json();
            return data.exists; // Assuming the backend returns whether the panel ID exists or not
        } catch (error) {
            console.error("Error checking panel ID:", error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emptyFields = [];
        if (!pannelID.trim()) {
            emptyFields.push("pannelID");
        }
        if (!examiner_1.trim()) {
            emptyFields.push("examiner_1");
        }
        if (!examiner_2.trim()) {
            emptyFields.push("examiner_2");
        }
        if (!examiner_3.trim()) {
            emptyFields.push("examiner_3");
        }

        if (emptyFields.length > 0) {
            setEmptyFields(emptyFields);
            return;
        }

        try {
            const panelExists = await checkPanelID();
            if (panelExists) {
                Swal.fire("Error", "This Panel already exists!", "error");
                return;
            }

            const formattedPanelID = formatPanelName(pannelID);
            const presentation_Pannel = {
                pannelID: formattedPanelID,
                examiner_1,
                examiner_2,
                examiner_3,
            };

            const response = await fetch("http://localhost:3001/presentation-pannel", {
                method: "POST",
                body: JSON.stringify(presentation_Pannel),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                setPannelID("");
                setExaminer_1("");
                setExaminer_2("");
                setExaminer_3("");
                Swal.fire("Done", "Panel added successfully!", "success");
            }
        } catch (error) {
            console.error("Error adding panel:", error);
        }
    };

    const formatPanelName = (name) => {
        return name.trim().toUpperCase();
    };

    return (
        <div className="R_container">
            <div className="R_form-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="pannelID">Panel Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pannelID"
                                placeholder="Enter a Panel Name"
                                value={pannelID}
                                onChange={(e) => setPannelID(e.target.value)}
                                style={{
                                    maxWidth: "800px",
                                    height: "45px",
                                    border: "1px solid #ffb43c"
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="examiner_1">Examiner 1</label>
                            <select
                                className="form-control"
                                id="examiner_1"
                                value={examiner_1}
                                onChange={(e) => handleExaminerChange(e, setExaminer_1, [examiner_2, examiner_3])}
                                style={{
                                    maxWidth: "800px",
                                    height: "45px",
                                    border: "1px solid #ffb43c"
                                }}
                            >
                                <option value="">Select an examiner</option>
                                {renderOptions(examiner_1, [examiner_2, examiner_3])}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="examiner_2">Examiner 2</label>
                            <select
                                className="form-control"
                                id="examiner_2"
                                value={examiner_2}
                                onChange={(e) => handleExaminerChange(e, setExaminer_2, [examiner_1, examiner_3])}
                                style={{
                                    maxWidth: "800px",
                                    height: "45px",
                                    border: "1px solid #ffb43c"
                                }}
                            >
                                <option value="">Select an examiner</option>
                                {renderOptions(examiner_2, [examiner_1, examiner_3])}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="examiner_3">Examiner 3</label>
                            <select
                                className="form-control"
                                id="examiner_3"
                                value={examiner_3}
                                onChange={(e) => handleExaminerChange(e, setExaminer_3, [examiner_1, examiner_2])}
                                style={{
                                    maxWidth: "800px",
                                    height: "45px",
                                    border: "1px solid #ffb43c"
                                }}
                            >
                                <option value="">Select an examiner</option>
                                {renderOptions(examiner_3, [examiner_1, examiner_2])}
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" id="R_Button">
                            Submit Record
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPresentationPannel;


