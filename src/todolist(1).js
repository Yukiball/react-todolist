import React from 'react';
import './index.css';

class TodoList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			allList:[{title:'1',checked:false},{title:'2',checked:true},{title:'3',checked:false},{title:'4',checked:false}],
			hash:'',
		}
		this.addList = this.addList.bind(this)
		this.changeList = this.changeList.bind(this)
		this.delList = this.delList.bind(this)
		this.hashChange = this.hashChange.bind(this)
	}
	componentWillMount(){
		this.setState({
			hash:window.location.hash
		})
	}
	addList(title){
		this.setState({allList:[
			...this.state.allList,
			...[{title:title,checked:false}]
			]})
		// setTimeout(()=>{
		// 	localStorage.setItem('all',JSON.stringify(this.state.allList))
		// },0)
	}
	changeList(title){
		let arr = this.state.allList
		arr.map(function(val,index){
			if(val.title === title){
				val.checked = !val.checked
			}
		})
		this.setState({allList:arr})
		// setTimeout(()=>{
		// 	localStorage.setItem('all',JSON.stringify(this.state.allList))
		// },0)
	}
	delList(title){
		console.log(title)
		let arr = this.state.allList
		arr = arr.filter(function(element){
			return element.title !== title
		})
		console.log(arr)
		this.setState({allList:arr})
		// setTimeout(()=>{
		// 	localStorage.setItem('all',JSON.stringify(this.state.allList))
		// },0)
	}
	hashChange(savehash){
		this.setState({hash:savehash})
	}
	render(){
		return (
			<React.Fragment>
				<Title/>
				<div className="main">
					<Todo addList={this.addList}
						  allList={this.state.allList}
						  hashChange={this.hashChange}
					/>
					<List hash = {this.state.hash}
						  allList={this.state.allList}
						  changeList={this.changeList}
						  delList={this.delList}
					/>
				</div>
			</React.Fragment>
		)
	}
		
} 
function Title(){
	return (
		<div className="page-top">
			<div className="page-content">
				<h2>任务计划列表</h2>
			</div>
		</div>
	)
}
class Todo extends React.Component{
	constructor(props){
		super(props)
		this.state={
			value:'',
		}
		this.keydown = this.keydown.bind(this)
		this.handleChangle = this.handleChangle.bind(this)
	}
	keydown(e){
		if(e.keyCode === 13){
			this.props.addList(this.state.value)
			this.setState({value:''})
		}
	}
	handleChangle(val){
		this.setState({
			value:val
		})
	}
	render(){
		return (
			<React.Fragment>
				<h3 className="big-title">添加任务</h3>
				<input 
					type="text" 
					className="task-input"
					value={this.state.value} 
					onChange={(e) => this.handleChangle(e.target.value)} 
					onKeyDown={(e)=> this.keydown(e)}
				/>
				<ul className="task-count">
					<li>{this.props.allList.length}个未完成任务</li>
					<li className="action">
						<a href="#all" onClick={()=>this.props.hashChange('#all')}>所有任务</a>
						<a href="#unfinish" onClick={()=>this.props.hashChange('#unfinish')}>未完成任务</a>
						<a href="#finish" onClick={()=>this.props.hashChange('#finish')}>完成任务</a>
					</li>
				</ul>
				<h3 className="big-title">任务列表</h3>
			</React.Fragment>
		)
	}
}
class List extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list:[]
		}
		this.filterList = this.filterList.bind(this)
	}
	componentWillMount(){
		if (this.props.hash === '#all' || this.props.hash === '') {
			this.setState({list : this.props.allList})
		} else if (this.props.hash === '#unfinish') {
			this.setState({list : this.filterList(this.props.allList,false)})
		} else if (this.props.hash === '#finish') {
			this.setState({list : this.filterList(this.props.allList,true)})
		}
	}
	componentWillReceiveProps(next){
		if (next.hash === '#all' || next.hash === '') {
			this.setState({list : next.allList})
		} else if (next.hash === '#unfinish') {
			this.setState({list : this.filterList(next.allList,false)})
		} else if (next.hash === '#finish') {
			this.setState({list : this.filterList(next.allList,true)})
		}
	}
	filterList(element,condition){
		return this.props.allList.filter((element)=>{
			return element.checked === condition
		})
	}
	render(){
		return(
			<div className="tasks">
				{
					!this.props.allList.length ? <span className="no-task-tip">未添加</span>:
					<ul className="todo-list">
					{
						this.state.list.map((val,index)=>(	
								<li className={val.checked ? "list completed" : "list" } key={index}>
									<div className="view">
										<input 
											type="checkbox" 
											className="toggle" 
											checked={val.checked}
											onChange={()=>this.props.changeList(val.title)} 
										/>
										<label>{val.title}</label>
										<button 
											className="destory" 
											onClick={()=>this.props.delList(val.title)}
										></button>
									</div>
								</li>
							)
						)
					}
					</ul>
				}
			</div>
		)
	}
}

export default TodoList;
