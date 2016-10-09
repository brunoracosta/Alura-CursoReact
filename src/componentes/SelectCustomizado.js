import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class SelectCustomizado extends Component{

	constructor(){
		super();
		this.state = {
			msgErro:''
		};
	}

	componentDidMount() {
		PubSub.subscribe("erro-validacao",function(topico,erro){            
			if(erro.field === this.props.name){
				this.setState({msgErro:erro.defaultMessage});            
			}
		}.bind(this));

		PubSub.subscribe("limpa-erros",function(topico){
			this.setState({msgErro:''});                        
		}.bind(this));        
	}

	render() {
		return (
			<div className="pure-control-group">
			  <label htmlFor={this.props.id}>{this.props.label}</label>
			  <select {...this.props}>
			  	<option>Selecione o Autor</option>
				{
					this.props.dataSource.map(function(autor){
						return (
							<option key={autor.id} value={autor.id}>
								{autor.nome}
							</option>
						);
					})
				}
			  </select>
			  <span className="error">{this.state.msgErro}</span>
			</div>
		);
	}
}

export default SelectCustomizado;                 
