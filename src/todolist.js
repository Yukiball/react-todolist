import React from 'react';
import './index.css';

class TodoList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			allList:[],
			hash:'',
		}
		this.addList = this.addList.bind(this)
		this.changeList = this.changeList.bind(this)
		this.delList = this.delList.bind(this)
		this.hashChange = this.hashChange.bind(this)
	}
	componentWillMount(){
		if (JSON.parse(localStorage.getItem('all',this.state.allList))) {
			let arr = JSON.parse(localStorage.getItem('all',this.state.allList))
			this.setState({
				allList:arr
			})
		}
		this.setState({
			hash:window.location.hash
		})
		setTimeout(()=>{
			let newarr = this.state.allList.filter(function(element){
				return element.checked === false
			})
		},0)
	}
	addList(title){
		this.setState({allList:[
			...this.state.allList,
			...[{title:title,checked:false}]
		]})
		setTimeout(()=>{
			localStorage.setItem('all',JSON.stringify(this.state.allList))
		},0)
	}
	changeList(index){
		let arr = this.state.allList
		arr[index].checked = !arr[index].checked
		this.setState({allList:arr})
		setTimeout(()=>{
			localStorage.setItem('all',JSON.stringify(this.state.allList))
		},0)
	}
	delList(index){
		let arr = this.state.allList
		arr.splice(index,1)
		this.setState({allList:arr})
		setTimeout(()=>{
			localStorage.setItem('all',JSON.stringify(this.state.allList))
		},0)
	}
	hashChange(savehash){
		this.setState({hash:savehash})
		setTimeout(()=>{
			console.log(this.state.hash)
		})
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
			value:''
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
					<li>{this.props.allList.filter((element)=>{return element.checked === false}).length}个未完成任务</li>
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
		}
		this.build = this.build.bind(this)
	}
	build(val,index){
		return (
			<li className={val.checked ? "list completed" : "list" } key={index}>
				<div className="view">
					<input 
						type="checkbox" 
						className="toggle" 
						checked={val.checked}
						onChange={()=>this.props.changeList(index)} 
					/>
					<label>{val.title}</label>
					<button 
						className="destory" 
						onClick={()=>this.props.delList(index)}
					></button>
				</div>
			</li>
		)
	}
	render(){
		return(
			<div className="tasks">
				{
					!this.props.allList.length ? <span className="no-task-tip">未添加</span>:
					<ul className="todo-list">
					{
						this.props.allList.map((val,index)=>(	
							this.props.hash === '#all'||this.props.hash === '' ? (
								this.build(val,index)
							) : (
								this.props.hash === '#unfinish' ? (
									!val.checked ?(
										this.build(val,index)
										):(console.log())
								) : (
									val.checked ?
									(
										this.build(val,index)
									):(console.log())
								)
							)
						))
					}
					</ul>
				}
			</div>
		)
	}
}

export default TodoList;
