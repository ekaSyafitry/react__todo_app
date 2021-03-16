import React, {useState, useEffect} from 'react'
import './modal.scss'
import DatePicker from "react-datepicker";
import axios from "../axios"


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
        setDataNotes(props.dataModal.note)
        setDataDate(props.dataModal.date)
      }, [props.dataModal.name, props.dataModal.note,props.dataModal.date ] );
     
    // console.log(data_name)
    const handleSubmit = async e => {
        if (props.type === 'add'){
            e.preventDefault()
            let frmt_date = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate()
            try{
                const postTodo = await axios({
                    method: 'post',
                    url: '/todo/post',
                    // headers: {
                    //   Authorization: 'bW5jaW5ub2NlbnQ='
                    // },
                    data: {
                        name: name,
                        note: notes,
                        date: frmt_date,
                    }
                  })
                  console.log(postTodo)
                alert('Success add data !!')
                props.updateStartDate(startDate)  
                setName('')
                setNotes('')
                setStartDate(new Date())
                props.changeModal()
            }
            catch (err){
                console.log(err)
            }
           
        }
        else{
            e.preventDefault()
            let frmt_date = data_date.getFullYear() + "-" + (data_date.getMonth() + 1) + "-" + data_date.getDate()
            try{
                console.log(props.dataModal._id)
                const updateTodo = await axios({
                    method: 'put',
                    url: `/todo/update/${props.dataModal._id}`,
                    data: {
                        name: data_name,
                        note: data_notes,
                        date: frmt_date,
                    }
                })
                console.log(updateTodo)
                props.updateStartDate(data_date)
                alert('Success edit data !!')
                props.changeModal()
            }catch (err){
                console.log(err)
            }          
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