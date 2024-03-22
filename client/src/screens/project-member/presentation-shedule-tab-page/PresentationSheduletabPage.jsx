import "./presentationSheduletabPage.scss"
import PresentationSheduleTable from "../../../componant/project-member/presentation-shedule-tab-comp/PresentationSheduletabComp"

const presentationSheduleTable = () =>{
    return(
        <div className="R_presentationShedulePage">
            <div className="R_presentationShedulePageHomeContainer">
                <h1>Presentation Shedule</h1>
                <PresentationSheduleTable/>
            </div>
        </div>
    )
}


export default presentationSheduleTable