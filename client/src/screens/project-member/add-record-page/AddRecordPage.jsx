import "./addRecordPage.scss"
import AddRecord from "../../../componant/project-member/add-presentation-shedule-record-comp/AddPresentationSheduleRecordComp"


const Addrecord = () =>{
    return(
        <div className="addrecord_R">  
            <div className="homeContainer">
                <h1>Add new Record</h1>
                <AddRecord/>                
            </div>
        </div>
    )
}

export default Addrecord