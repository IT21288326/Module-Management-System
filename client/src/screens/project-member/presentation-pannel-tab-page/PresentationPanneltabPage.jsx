import "./presentationPanneltabPage.scss"
import PresentationPannelTable from "../../../componant/project-member/presentation-pannel-tab-comp/PresentationPanneltabComp"

const PresentationPannelTablep = () =>{
    return(
        <div className="R_presentationShedulePage">
            <div className="R_presentationShedulePageHomeContainer">
                {/* <h1>Presentation Pannel</h1> */}
                <PresentationPannelTable/>
            </div>
        </div>
    )
}


export default PresentationPannelTablep