import "./presentationSheduletabPage.scss"
import PresentationPannelTable from "../../../componant/project-member/presentation-pannel-tab-comp/PresentationPanneltabComp"

const presentationPannelTable = () =>{
    return(
        <div className="R_presentationShedulePage">
            <div className="R_presentationShedulePageHomeContainer">
                <h1>Presentation Shedule</h1>
                <PresentationPannelTable/>
            </div>
        </div>
    )
}


export default presentationPannelTable