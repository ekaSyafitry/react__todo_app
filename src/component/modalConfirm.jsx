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
            : props.type === 'trash' ?
            <div >
                <div className="title"> Are you sure to delete data?</div>
            </div>
            : 
            <div>
                 <div className="title"> Do you like this application?</div>
            </div>
            } 
            {props.type === 'install'?
            <div style={{display:'flex', justifyContent: 'space-between'}}> 
                <button className="btnY" onClick={()=> props.yesBtn()}>Download Now</button> 
                <button className="btnN" onClick={()=> props.cancelBtn()}>Cancel</button> 
            </div>
            :
            <div>
                <button className="btnYes" onClick={()=> props.yesBtn()}>Yes</button> 
                <button className="btnN" onClick={()=> props.cancelBtn()}>Cancel</button> 
            </div>
        }
    
            
        </div>
    </div>
    )
}

export default ModalConf;