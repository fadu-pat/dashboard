import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import '../css/modal.css';

const serverIp = "http://10.10.13.116:8080";

class Modal extends Component {
	
	// 생성자
	constructor(props){
		super(props);
		this.state = {
				id : "",
				hostname : "",
				equipUsage : "",
				osIp : "",
				osId : "",
				osPassword : "",
				ipmiIp : "",
				ipmiId : "",
				ipmiPassword : "",
				nvmePort : "",
				serverType : "",
				owns : "",
				init : false,
				nodata : "1"
		}
	}
	
	handleChange = (e) => {
		this.setState({ [e.target.name] : e.target.value });
	}
	
	update_list = async () => {
		try{
			let { data } = await axios.put(serverIp + '/api/svlt', this.state);
			if(data == "S"){
				alert("data update success");
			}else{
				alert("data update fail");
			}
		}catch (e){
			console.log(e);
		}
	}
	
	insert_list = async () => {
		try{
			console.log(this.id)
			let { data } = await axios.post(serverIp + '/api/svlt', this.state);
			if(data == "S"){
				alert("data insert success");
			}else{
				alert("data insert fail");
			}
		}catch (e){
			console.log(e);
		}
	}

	delete_list = async (id) => {
		try{
			
			let { data } = await axios.delete(serverIp + '/api/svlt', {
				params : {
					id : id
				}
			});
			if(data == "S"){
				alert("data delete success");
			}else{
				alert("data delete fail");
			}
		}catch (e){
			console.log(e);
		}
	}
	
	init_list = () => {
		this.setState({init:true});
		this.setState({id : "",
			hostname : "",
			equipUsage : "",
			osIp : "",
			osId : "",
			osPassword : "",
			ipmiIp : "",
			ipmiId : "",
			ipmiPassword : "",
			nvmePort : "",
			serverType : "",
			owns : ""});
	}
	
		  componentWillReceiveProps() {
			 console.log(this.props.value);
		    console.log('componentWillReceiveProps');
		  }

	oneTimeInit = () => {
		this.setState({init:false});
	}
	
	// 이거 때문에 3일을 잡아 먹었어!!!
	  componentWillReceiveProps(nextProps) {
		    this.setState(nextProps.value);
	  }
	
	render(){
		
		let isOpen = this.props.isOpen;
		let close = this.props.close;
		
		return (
				<React.Fragment>
				{
						isOpen ?
			    <React.Fragment>
			   	  <div className="Modal-overlay" onClick={ event => {close(); this.oneTimeInit();} }  />
			      <div className="Modal">
			        <p className="title"></p>
			        <div className="content">
			          <form>
			          <fieldset>
			          <div class="form-group row">
			          <label for="hostname" class="col-sm-2 col-form-label">hostname</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="hostname"  id="hostname" value={this.state.hostname}  />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="equipUsage" class="col-sm-2 col-form-label">equip usage</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="equipUsage"  id="equipUsage" value={this.state.equipUsage} />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="osIp" class="col-sm-2 col-form-label">osip</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="osIp" id="osIp" value={this.state.osIp} />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="osId" class="col-sm-2 col-form-label">os id</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="osId" id="osId" value={this.state.osId} />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="osPass" class="col-sm-2 col-form-label">os pass</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="osPassword" id="osPassword" value={this.state.osPassword} />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="ipmiIp" class="col-sm-2 col-form-label">ipmi ip</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="ipmiIp" id="ipmiIp" value={this.state.ipmiIp} />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="ipmiId" class="col-sm-2 col-form-label">ipmi id</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="ipmiId" id="ipmiId" value={this.state.ipmiId} />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="ipmiPass" class="col-sm-2 col-form-label">ipmi pass</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="ipmiPassword" id="ipmiPassword" value={this.state.ipmiPassword} />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="nvmePort" class="col-sm-2 col-form-label">nvme port</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="nvmePort" id="nvmePort" value={this.state.nvmePort} />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="serverType" class="col-sm-2 col-form-label">server type</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="serverType" id="serverType" value={this.state.serverType} />
			          </div>
			          </div>
			          
			          <div class="form-group row">
			          <label for="serverType" class="col-sm-2 col-form-label">owns</label>
			          <div class="col-sm-10">
			            <input type="text"  class="form-control-plaintext" onChange={this.handleChange} name="owns" id="owns" value={this.state.owns} />
			          </div>
			          </div>
			          
			          </fieldset>
			          </form>
			        </div>
			        <div class="modal-footer">
			        <button type="button" class="btn btn-primary" onClick={() => this.init_list()}>init</button>
			        <button type="button" class="btn btn-danger" onClick={() => this.delete_list(this.state.id)}>DELETE</button>
			        <button type="button" class="btn btn-primary" onClick={this.state.init ? this.insert_list: this.update_list}>{this.state.init ? 'Save':'Update'} changes</button>
			        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={ event => { close(); this.oneTimeInit();} }>Close</button>
			      </div>
			      </div>
			    </React.Fragment>
			    : null
				}
			    </React.Fragment>
			  )
	}
}



export default Modal;