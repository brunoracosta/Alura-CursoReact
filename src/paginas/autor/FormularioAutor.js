import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import TratadorErros from  '../../componentes/TratadorErros';
import InputCustomizado from '../../componentes/InputCustomizado';
import ButtonSubmitCustomizado from '../../componentes/ButtonSubmitCustomizado';

class FormularioAutor extends Component {

	constructor() {
		super();    
		this.state = {
			nome:'',
			email:'',
			senha:''
		};
		this.enviaForm = this.enviaForm.bind(this);	
	}

	enviaForm(evento){
		evento.preventDefault();    
		$.ajax({
			url:'http://localhost:8080/api/autores',
			contentType:'application/json',
			dataType:'json',
			type:'post',
			data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
			success: function(novaListagem){
				PubSub.publish('atualiza-lista-autores',novaListagem.reverse());        
				this.setState({
					nome:'',
					email:'',
					senha:''
				});
			}.bind(this),
			error: function(resposta){
				if(resposta.status === 400) {
					new TratadorErros().publicaErros(resposta.responseJSON);
				}
			},
			beforeSend: function(){
				PubSub.publish("limpa-erros",{});
			}      
		});
	}

	salvaAlteracao(nomeInput,evento){
		var campoSendoAlterado = {};
		campoSendoAlterado[nomeInput] = evento.target.value;
		this.setState(campoSendoAlterado);
	}

	render() {
		return (
			<div className="pure-form pure-form-aligned">
				<form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
					
					<InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this,'nome')} label="Nome"/>

					<InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this,'email')} label="Email"/>

					<InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this,'senha')} label="Senha"/>

					<ButtonSubmitCustomizado label="Gravar" />

				</form>             

			</div>  

		);
	}
}

export default FormularioAutor;