import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from './components/Modal'

const serverIp = "http://10.10.13.116:8080";

class App extends Component{
	
	// 생성자
	constructor(props){
		super(props);
		this.state = {
				server_item : [],
				server_value : [],
				isModalOpen : false,
				searchOwns : "",
				searchIpmiIp : "",
				pagingView : [],
				paging : 1,
				totalPaging : 1,
				startPaging : 1,
				endPaging : 1,
				init : ""
		}
	}
	
	// 컴포넌트 주기의 끝점
	componentDidMount(){
		this.get_list();
	}
	
	openModal = (idx) => {
		this.setState({isModalOpen : true});
		this.setState({init : "1"});
		this.state.server_value = this.state.server_item[idx];
	}
	
	closeModal = () =>{
		this.setState({isModalOpen : false});
	}
	
		//서버 api 호출 
		get_list = async (p) => {
			
			try{
				if(typeof p == 'undefined'){
					p = 1;
				}
				else if(p == "prev"){
					if(this.state.paging == 1){
						return
					}
					p = this.state.paging - 1;
				}else if (p == "after"){
					if(this.state.totalPaging == this.state.paging){
						return
					}
					p = this.state.paging + 1;
				}
				let { data } = await axios.get(serverIp + '/api/svlt/1',{
					params : {paging : p,
					searchOwns : this.state.searchOwns,
					searchIpmiIp : this.state.searchIpmiIp}
				}).finally(function(){
					
				});
				this.setState({
					server_item: data.data,
					totalPaging : data.totalCnt,
					paging : data.paging,
					startPaging : data.startPage,
					endPaging : data.endPage
				});
				
			}catch (e){
				console.log(e);
			}
		  }
		
		
	render(){
		
		this.state.pagingView = [];
		for(let i= this.state.startPaging; i <= this.state.endPaging; i++){
			this.state.pagingView.push(i);
		}
		return(
				<div style={{marginTop:"40px"}}>
				 <main className="App">
				  	<Modal isOpen={this.state.isModalOpen} close={this.closeModal} value={this.state.server_value} init = {this.state.init} listChange = {this.get_list} />
				 </main>
				<form class="form-inline my-2 my-lg-0">
				<div style={{width:"1920px", textAlign:"center"}}>
					<input class="form-control mr-sm-2" type="text" onChange={this.handleChange} name="searchIpmiIp" id="searchIpmiIp" value={this.state.searchIpmiIp} placeholder="ipmiIp" />
					<input class="form-control mr-sm-2" type="text" onChange={this.handleChange} name="searchOwns" id="searchOwns" value={this.state.searchOwns} placeholder="owns" />
					<button class="btn btn-secondary my-2 my-sm-0" type="button" onClick = { () => this.get_list() }>Search</button>
				</div>
				
				<table class="table table-hover" style={{textAlign:"center", width:"80%", marginLeft:"10%", marginTop:"20px"}}>
				  <thead>
				    <tr class="table-info">
				      <th scope="col">id</th>
				      <th scope="col">hostname</th>
				      <th scope="col">equipusage</th>
				      <th scope="col">os ip</th>
				      <th scope="col">os id</th>
				      <th scope="col">os pass</th>
				      <th scope="col">ipmi ip</th>
				      <th scope="col">ipmi id</th>
				      <th scope="col">ipmi pass</th>
				      <th scope="col">nvme port</th>
				      <th scope="col">server type</th>
				      <th scope="col">own</th>
				    </tr>
				  </thead>
				  <tbody>
				  {this.state.server_item.map((info, info_idx) => {
					  return (
							  <tr class="table-default" >
							  <th>{info.id}</th>
							  <th style={{cursor:"pointer"}} onClick={() => this.openModal(info_idx)}>{info.hostname}</th>
							  <th>{info.equipUsage}</th>
							  <th>{info.osIp}</th>
							  <th>{info.osId}</th>
							  <th>{info.osPassword}</th>
							  <th>{info.ipmiIp}</th>
							  <th>{info.ipmiId}</th>
							  <th>{info.ipmiPassword}</th>
							  <th>
							  <div style= {{overflow:'auto', height:info.nvmePort != '{}' && info.nvmePort !=''?'50px':''}}>
							  {info.nvmePort} 
							  </div>
							  </th>
							  <th>{info.serverType}</th>
							  <th>{info.owns}</th>
							  </tr>
					  ) 
				  })}
				  </tbody>
				</table>
				<div style = {{marginLeft:'39%'}}>
				<ul class='pagination'>
			    <li class='page-item '>
			      <a class='page-link' onClick = { () => this.get_list('prev') }>&laquo;</a>
			    </li>
			    {
			    	this.state.pagingView.map((info, info_idx) => {
			    		return (
			    				<li class={'page-item ' + (info == this.state.paging ? 'active':'')}>
							      <a class='page-link' onClick = { () => this.get_list(info) }>{info}</a>
							    </li>
			    		)
			    	}
			    			
			    	)
			    }
			    <li class='page-item'>
			      <a class='page-link' onClick = { () => this.get_list('after') }>&raquo;</a>
			    </li>
			  </ul>
				</div>
				</form>
				</div>
				
		)
	}
}

export default App;
