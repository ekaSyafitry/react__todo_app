import React, {useState, useEffect} from 'react'
import './modal.scss'
import DatePicker from "react-datepicker";
import firebase from 'firebase'


const Modal = (props) => {
    // console.log(props.dataModal, 'props')
    const modalActive = props.modalActive
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState('')
    const [notes, setNotes] = useState('')
    const [data_name , setDataName] = useState('')
    const [data_notes, setDataNotes] = useState('')
    const [data_date, setDataDate] = useState('')

    useEffect(() => {
        setDataName(props.dataModal.name);
        setDataNotes(props.dataModal.notes)
        setDataDate(props.dataModal.date)
      }, [props.dataModal.name, props.dataModal.notes,props.dataModal.date ] );
     
    // console.log(data_name)
    const handleSubmit = e => {
        if (props.type === 'add'){
            e.preventDefault()
            let frmt_date = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate()
            const rootRef = firebase.database().ref('todolist')
            const autoId = rootRef.push().key
            rootRef.child(autoId).set({
              name: name,
              notes: notes,
              date: frmt_date,
              complete: false
            })
            alert('Success add data !!')
            setName('')
            setNotes('')
            setStartDate(new Date())
            // notes = ''
            // startDate = new Date()
            props.changeModal()
            // fetchData()
        }
        else{
            e.preventDefault()
            let frmt_date = data_date.getFullYear() + "-" + (data_date.getMonth() + 1) + "-" + data_date.getDate()
            firebase.database().ref('todolist').child(props.dataModal.id).update({
              name: data_name,
              notes: data_notes,
              date: frmt_date
            });
            alert('Success edit data !!')
            props.changeModal()
            // console.log(data_name)
        }
    }
    
    return(
        <div>
            <div className={modalActive? 'bg-modal active' : 'bg-modal'} onClick={()=> props.changeModal()}></div>
            <form action="" onSubmit={handleSubmit} className={modalActive? 'add-modal active'  : 'add-modal'}>
                {props.type === 'edit' ? 
                 <div style={{height:'100%', position:'relative'}} >
                 <h2 > Edit Task</h2>
                 {props.dataModal.length !== 0?
                     <div>
                     <div>
                         <label htmlFor="task" className="title-mdl"><i className="fas fa-tasks"></i>TASK</label>
                         <input type="text" name="task" value={data_name !== undefined?
                             data_name : ''} required  onChange={event => setDataName(event.target.value)}/>
                     </div>
                     <div>
                         <label htmlFor="note" className="title-mdl"><i className="far fa-comment"></i>NOTES</label>
                         <textarea name="note" id="note" cols="30" rows="5" width="100%"
                             value={data_notes !== undefined? data_notes : ''} onChange={event => setDataNotes(event.target.value)}></textarea>
                     </div>
                     <div>
                         <label htmlFor="time" className="title-mdl"> <i className="far fa-calendar-alt"></i>DATE</label>
                         <DatePicker
                             selected={data_date !== undefined? data_date : ''}
                             onChange={date => setDataDate(date)} 
                             calendarClassName="setDate"
                             minDate={new Date()}
                             dateFormat="MMM dd yyyy"

                          />
                        
                     </div> 
                     <div className="btn-bg"></div>
                        <div className="btn-modal" >
                            <button><i className="fas fa-check"></i></button>
                        </div>
                 </div>
                 : ''

                 }
                
             </div>
            :
            <div>
            <h2>Add Task</h2>
            <div>
                <label htmlFor="task" className="title-mdl"><i className="fas fa-tasks"></i>TASK</label>
                <input type="text" name="task" value={name} required onChange={event => setName(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="note" className="title-mdl"><i className="far fa-comment"></i>NOTES</label>
                <textarea name="note" id="note" cols="30" rows="5" width="100%" value={notes} onChange={event => setNotes(event.target.value)}></textarea>
            </div>
            <div>
                <label htmlFor="time" className="title-mdl"> <i className="far fa-calendar-alt"></i>DATE</label>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    calendarClassName="setDate"
                    minDate={new Date()}
                    dateFormat="MMM dd yyyy"
                />
        </div>
        <div className="btn-bg"></div>
        <div className="btn-modal" >
            <button><i className="fas fa-check"></i></button>
        </div>
     </div>
            }      
        </form>
        </div>
    )
}

export default Modal;