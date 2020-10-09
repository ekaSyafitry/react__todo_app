import React from 'react'
import './modal.scss'

const ModalConf = (props) => {
    return(
        <div>    
        <div className={props.confirmActive? 'bg-modalComplete active' : 'modalComplete'} onClick={()=> props.cancelBtn()}></div>
        <div className={props.confirmActive? 'modalComplete active' : 'modalComplete'}>
            {props.type === 'complete' ? 
            <div>
                <div className="title" >Add to complete task?</div>
            </div>
            : props.type === 'incomplete' ?
            <div >
                <div className="title"> Add to incomplete task?</div>
            </div>
            :
            <div >
                <div className="title"> Are you sure to delete data?</div>
            </div>
            } 
            <button className="btnY" onClick={()=> props.yesBtn()}>Yes</button> 
            <button className="btnN" onClick={()=> props.cancelBtn()}>No</button> 
        </div>
    </div>
    )
}

export default ModalConf;