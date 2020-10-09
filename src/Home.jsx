import React, {Fragment, Component} from "react"
import firebase from 'firebase'
import DatePicker from "react-datepicker";
import empty from './assets/undraw_empty_xct9.svg'
import Modal from './component/modal'
import ModalConf from './component/modalConfirm'
import "react-datepicker/dist/react-datepicker.css";
import './Home.scss'

class Home extends Component{
    state ={
        startDate: new Date(),
        sel_date : '',
        day : '',
        database: firebase.database(),
        todolist: [],
        todos: [],
        todolist_completed: [],
        todolist_incompleted: [],
        isLoad : false,
        hasLoad: false,
        addActive: false,
        editActive: false,
        dataModal:[],
        id_td : '',
        complete: false,
        completeActive: false,
        incompleteActive: false,
        trashActive: false,
        current: 'all'
    }
  async  componentDidMount() {
      await this.setState({
            isLoad : true,
        })
        // console.log(React.findDOMNode(this.refs.all))
        // console.log(this.state.isLoad)
        await this.formateDate(this.state.startDate)
        await  this.getData(this.state.startDate)
    }
    CustomInput(onClick){
        return(
            <div className="custom-input" onClick={onClick}>
             <i className="far fa-calendar-alt"></i>
          </div>
        )   
    }
    setStartDate = (dt) => {
        this.setState({
            startDate : dt,
            current : 'all'
        })
        this.formateDate(dt)
        this.getData(dt)
    }
    formateDate = (f_date) => {
        // console.log(f_date)
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let a = f_date.getDate() + "/" + (f_date.getMonth() + 1) + "/" + f_date.getFullYear()
        let b = days[f_date.getDay()]
        this.setState({
            sel_date : a,
            day : b
        })
    }
     getData = async (dt) =>{
        let g_date = dt.getFullYear() + "-" +  (dt.getMonth() + 1) + "-" + dt.getDate() 
        // let g_date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear()
        this.state.database.ref('todolist').orderByChild('date').equalTo(g_date).on('value', (snapshot) => { this.realtimedata(snapshot) })     
    }
    realtimedata = async(data)=>{
        let reads = []
        data.forEach(function (val) {
            // console.log(val, 'valllll')
            reads.push({...val.val(), id: val.key})
        })
        await this.setState({
                todolist : reads,
                todos : reads,
                isLoad : false,
                hasLoad : true
            })

        await this.setState({
            todolist_completed: this.state.todolist.filter((todo)=> { return todo.complete  }),
            todolist_incompleted : this.state.todolist.filter((todo)=> {return !todo.complete}),
        })
        // console.log(this.state.todos)
        // console.log(this.state.todolist_incompleted)
    }
    allBtn = async () =>{
        await this.setState({
            todos : this.state.todolist,
            current : 'all'
        })
    }
    comBtn = async () =>{
        // console.log(this.todolist)
        await this.setState({
            todos : this.state.todolist_completed,
            current : 'com'
        })
    }
    inBtn = async () =>{
        await  this.setState({
            todos : this.state.todolist_incompleted,
            current: 'incom'
        })
    }
    editData =async (td) =>{
        let tgl = new Date(td.date)
        td.date = tgl
       await this.setState({
            editActive : true,
            dataModal: td
        })
        // console.log(this.state.dataModal)
    }
    changeComplete = async () =>{
        // console.log(this.state.complete)
        if (this.state.complete) {
            this.state.database.ref('todolist/' + this.state.id_td + '/complete').set(
                false
            );
          await  this.setState({
            incompleteActive: false
            })
        } else {
            this.state.database.ref('todolist/' + this.state.id_td + '/complete').set(
                true
            );
            await  this.setState({
                completeActive: false
            })
        }
    }
    deleteData = async () => {
        let userRef = this.state.database.ref('todolist/' + this.state.id_td)
        userRef.remove()
        this.setState({
            trashActive : false
        })
    }
render(){
return(
<Fragment>
    <div className="container home">
        <div className="calender-box">
            <div className="circle">
                <div id="all" onClick={this.allBtn} className={this.state.current === 'all' ? 'active' : ''}>All</div>
                <div id="complete" onClick={this.comBtn} className={this.state.current === 'com' ? 'active' : ''}>Complete</div>
                <div id="incomplete" onClick={this.inBtn} className={this.state.current === 'incom' ? 'active' : ''}>Incomplete</div>
            </div>
            <div style={{alignSelf: 'center'}}>
                <h1>Let's Plan</h1>
                <div className="capt">
                    let's try, and feel the ease of managing your schedule</div>
            </div>
            <div className="box-date">
                <div className="cal">
                    {/* <div></div> */}
                    <DatePicker selected={this.state.startDate} onChange={date=> this.setStartDate(date)}
                        customInput={this.CustomInput()}
                        calendarClassName="getDate" />
                </div>
                <div className="date">
                    <i className="fas fa-sun"></i>
                    <div style={{fontSize:'16px', opacity:0.7}}>{this.state.day}</div>
                    <div style={{fontSize:'13px', opacity:0.7}}>{this.state.sel_date}</div>
                </div>
            </div>
        </div>
        <div className="card">
            {this.state.isLoad === true ?
            <div className="wrapLoad">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            : ''
            }
            {this.state.hasLoad ?
            <div>
                {this.state.todos.length === 0 ?
                <div>
                    <img src={empty} alt="" width="100%" />
                    <div className="empty">No plan yet..</div>
                    <div className="btn-float" onClick={(async () => {
                       await this.setState ({
                            addActive : true
                        })
                    })}>
                        <button><i className="fas fa-plus"></i></button>
                    </div>
                </div>
                :
                <div>
                    <ul style={{marginLeft:'20px', paddingLeft: '0px'}}>
                        {this.state.todos.map((td, index) => {
                        return (
                        <li className="card-list" key={index}>
                            <div className={td.complete? 'title cross' : 'title' }>{td.name}</div>
                            <div className={td.complete? 'card-desc cross' : 'card-desc' }>{td.notes} </div>
                            <div className="btn-group">
                                {td.complete ?
                                 <div
                                   onClick={async () => {
                                    await this.setState ({
                                         id_td : td.id,
                                         complete : td.complete,
                                         incompleteActive: true
                                     })
                                 }}><i className="fas fa-times"></i></div>
                                : <div onClick={async () => {
                                    await this.setState ({
                                         id_td : td.id,
                                         complete : td.complete,
                                         completeActive: true
                                     })
                                 }}
                                  ><i className="fas fa-check"></i></div>
                                }
                                <div onClick={() => this.editData(td)}><i className="far fa-edit"></i></div>
                                <div onClick={async () =>{
                                    await this.setState ({
                                        id_td: td.id,
                                        trashActive: true
                                    })}}><i className="far fa-trash-alt"></i></div>
                            </div>
                        </li>
                        )
                        })}
                    </ul>
                    <div className="btn-float" onClick={async () => {
                       await this.setState ({
                            addActive : true
                        })
                    }}>
                        <button><i className="fas fa-plus"></i></button>
                    </div>
                </div>
                }
            </div>
            : ''
            }
        </div>
            <Modal modalActive={this.state.addActive} type={'add'} dataModal={this.state.dataModal} changeModal={async () => {
                       await this.setState ({
                            addActive : false
                        })
                    }}
            />
            <Modal modalActive={this.state.editActive} type={'edit'} dataModal={this.state.dataModal} changeModal={async () => {
                       await this.setState ({
                            editActive : false
                        })
                    }}
             />
             <ModalConf type={'complete'} confirmActive={this.state.completeActive} yesBtn={this.changeComplete} cancelBtn = {async () => {
                       await this.setState ({
                            completeActive : false
                        })
                    }}/>
             <ModalConf type={'incomplete'} confirmActive={this.state.incompleteActive} yesBtn={this.changeComplete}  cancelBtn = {async () => {
                       await this.setState ({
                            incompleteActive : false
                        })
                    }}/>
             <ModalConf type={'trash'} confirmActive={this.state.trashActive} yesBtn={this.deleteData} cancelBtn={async () => {
                      await this.setState ({
                        trashActive : false
                    })
             }
             }/>
             {/* <ModalConf type={'trash'}/> */}
    </div>
</Fragment>
)
}
}

export default Home;