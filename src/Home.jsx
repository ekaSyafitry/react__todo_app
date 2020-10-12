import React, {Fragment, Component} from "react"
import firebase from './index.js'
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
        current: 'all',
        showMenu: false,
        totalComplete: 0,
        totalIncomplete: 0,
        percent: 0,
        sum: 0,
        installActive: false,
        deferredPrompt : null
    }
  async componentDidMount() {
        await this.setState({
            isLoad : true,
        })
        await this.formateDate(this.state.startDate)
        await  this.getData(this.state.startDate)

        window.addEventListener('beforeinstallprompt', (e) => {
            this.showInstallPromt(e);
        });
          
      window.addEventListener('appinstalled', async (evt) => {
            await this.setState({
                installActive :  !this.state.installActive,
            })
        });
    }
    installModal = async () =>{
        await this.setState({
            installActive :  false,
        })
        this.state.deferredPrompt.prompt();
    }
   showInstallPromt = async (e) =>{
        await this.setState({
            deferredPrompt :  e,
            installActive :  !this.state.installActive
        })
    }
    countProgress = async () =>{
        if (this.state.current === 'all'){
            await this.setState({
                totalComplete : this.state.todolist_completed.length,
                totalIncomplete : this.state.todolist_incompleted.length,
                sum : this.state.todos.length
            })
            let num = this.state.totalComplete / this.state.sum * 100    
            if(this.state.sum === 0){
                await this.setState({
                    percent : 0
                })
            }
            else{
                await this.setState({
                    percent : num
                })
            }
          }
    }
    myBarElement = (style) => {
       return(
        <div id="myBar" style={{width : `${this.state.percent}%`}}></div>
       )
    }
    CustomInput(onClick){
        return(
            <div className="custom-input" onClick={onClick}>
             <i className="far fa-calendar-alt"></i>
          </div>
        )   
    }
    setStartDate = (dt) => {
        console.log(dt)
        this.setState({
            startDate : dt,
            current : 'all'
        })
        this.formateDate(dt)
        this.getData(dt)
    }
    formateDate = async (f_date) => {
        let now = new Date()
        if (f_date.toDateString() !== now.toDateString()){
            var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec",];
            await this.setState({
                sel_date : months[(f_date.getMonth())] + " " + (f_date.getDate()) + " " + f_date.getFullYear()
            })
        }
        else{
            await this.setState({
                sel_date : "Today's tasks"
            })
        }
    }
     getData = async (dt) =>{
        let g_date = dt.getFullYear() + "-" +  (dt.getMonth() + 1) + "-" + dt.getDate() 
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
                isLoad : false,
                hasLoad : true
            })

        await this.setState({
            todolist_completed: this.state.todolist.filter((todo)=> { return todo.complete  }),
            todolist_incompleted : this.state.todolist.filter((todo)=> {return !todo.complete}),
        })

        if (this.state.current === 'all'){
            await this.setState({
                todos : this.state.todolist
            })
        }
        else if (this.state.current === 'com'){
            await this.setState({
                todos : this.state.todolist_completed
            })
        }
        else{
            await this.setState({
                todos : this.state.todolist_incompleted
            })
        }

        this.countProgress()
    }
    allBtn = async () =>{
        await this.setState({
            todos : this.state.todolist,
            current : 'all',
            showMenu : false
        })
        setTimeout(() => {
            // console.log(document.getElementById("myBar"))
          this.countProgress()
        }, 500);
    }
    comBtn = async () =>{
        // console.log(this.todolist)
        await this.setState({
            todos : this.state.todolist_completed,
            current : 'com',
            showMenu : false
        })
    }
    inBtn = async () =>{
        await  this.setState({
            todos : this.state.todolist_incompleted,
            current: 'incom',
            showMenu: false
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
            <div className="header">
                <h1>To-do</h1>
                <div className="box-date">
                    <div className="cal">
                        {/* <div></div> */}
                        <DatePicker selected={this.state.startDate} onChange={date=> this.setStartDate(date)}
                            customInput={this.CustomInput()}
                            calendarClassName="getDate" />
                    </div>
                </div>
            </div>
        </div>
        <div className="card"> 
            <div className="wrapTitle">
                <div className="wrapDay">
                    {this.state.current==='all'? 
                      <h2>{this.state.sel_date}</h2>
                    : this.state.current==='com' ?
                      <h2>Complete tasks</h2>
                    :
                      <h2>Incomplete tasks</h2>
                     }
                    
                    <div className="btnFilter" onClick={async () => {
                        await this.setState ({
                            showMenu : !this.state.showMenu
                        })}} >
                    <i className="fas fa-filter"></i>
                    </div>
                    <div className={this.state.showMenu? "circle show" : "circle"}>
                        <div id="all" onClick={this.allBtn} className={this.state.current === 'all' ? 'active' : ''}>All</div>
                        <div id="complete" onClick={this.comBtn} className={this.state.current === 'com' ? 'active' : ''}>Complete</div>
                        <div id="incomplete" onClick={this.inBtn} className={this.state.current === 'incom' ? 'active' : ''}>Incomplete</div>
                    </div>
                </div>
                {this.state.current==='all'?
                    <div>
                       <div className="unfinished">{this.state.totalIncomplete} unfinished tasks from total {this.state.sum} </div>
                       <div className="meter">
                           {this.myBarElement()}
                           {/* <div id="myBar" style={this.state.myStyle} ></div> */}
                       </div>
                   </div>
                   : this.state.current==='com' ?
                   <div>
                        <div style={{color: '#60563d'}}>{this.state.totalComplete} tasks </div>
                   </div>
                   :
                   <div>
                       <div style={{color: '#60563d'}} >{this.state.totalIncomplete} tasks </div>
                   </div>
                }
             
            </div>

            <div className="card-box">
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
                        <ul style={{listStyleType: 'none'}}>
                            {this.state.todos.map((td, index) => {
                            return (
                            <li className="card-list" key={index}>
                                   <div className="btn-check">
                                    {td.complete ?
                                        <div
                                        onClick={async () => {
                                            await this.setState ({
                                                id_td : td.id,
                                                complete : td.complete,
                                                incompleteActive: true
                                            })
                                        }}><i className="fas fa-check-circle"></i></div>
                                        : <div onClick={async () => {
                                            await this.setState ({
                                                id_td : td.id,
                                                complete : td.complete,
                                                completeActive: true
                                            })
                                        }}
                                        ><i className="far fa-circle"></i></div>
                                        }
                                    </div>
                                <div  style={{width: "73%", marginRight: "8px"}}>
                                    <div className={td.complete? 'title cross' : 'title' }>{td.name}</div>
                                    {td.notes !== ''? 
                                     <div className={td.complete? 'card-desc cross' : 'card-desc' }>{td.notes} </div>
                                     : ''
                                    }
                                   
                                </div>
                               
                                <div className="btn-group">
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
        </div>
            <Modal modalActive={this.state.addActive} type={'add'} dataModal={this.state.dataModal} 
                    changeModal={async () => {
                       await this.setState ({
                            addActive : false
                        })
                    }}
                    updateStartDate={this.setStartDate}
            />
            <Modal modalActive={this.state.editActive} type={'edit'} dataModal={this.state.dataModal} 
                    changeModal={async () => {
                       await this.setState ({
                            editActive : false
                        })
                    }}
                    updateStartDate={this.setStartDate}
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

             <ModalConf type={'install'} confirmActive={this.state.installActive}  yesBtn={this.installModal} cancelBtn={async () => {
                      await this.setState ({
                        installActive : false
                    })
             }
             } />
    </div>
</Fragment>
)
}
}

export default Home;