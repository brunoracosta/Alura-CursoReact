import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import TratadorErros from  '../../componentes/TratadorErros';
import InputCustomizado from '../../componentes/InputCustomizado';
import ButtonSubmitCustomizado from '../../componentes/ButtonSubmitCustomizado';
import SelectCustomizado from '../../componentes/SelectCustomizado';


class FormularioLivro extends Component {

	constructor() {
		super();    
		this.state = {
			titulo:'',
			preco:'',
			autorId:''
		};
		this.enviaForm = this.enviaForm.bind(this);
	}

	enviaForm(evento){
		evento.preventDefault();    
		$.ajax({
			url:'http://localhost:8080/api/livros',
			contentType:'application/json',
			dataType:'json',
			type:'post',
			data: JSON.stringify({titulo:this.state.titulo,preco:this.state.preco,autorId:this.state.autorId}),
			success: function(novaListagem){
				PubSub.publish('atualiza-lista-livros',novaListagem.reverse());        
				this.setState({
					titulo:'',
					preco:'',
					autorId:''
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
					
					<InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.salvaAlteracao.bind(this,'titulo')} label="titulo"/>

					<InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.salvaAlteracao.bind(this,'preco')} label="preco"/>

					<SelectCustomizado id="autorId" name="autorId" value={this.state.autorId} dataSource={this.props.listaAutores} onChange={this.salvaAlteracao.bind(this,'autorId')} label="autorId"/>                      

					<ButtonSubmitCustomizado label="Gravar" />

				</form>             

			</div>  

		);
	}
}

export default FormularioLivro;