import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import TemplateDefault from '../../componentes/TemplateDefault';
import FormularioAutor from './FormularioAutor';
import TabelaAutores from './TabelaAutores';

class AutorBox extends Component {

	constructor() {
		super();    
		this.state = {lista : []};    
	}

	componentDidMount(){  
		$.ajax({
				url:"http://localhost:8080/api/autores",
				dataType: 'json',
				success:function(resposta){    
					this.setState({lista:resposta.reverse()});
				}.bind(this)
			} 
		);          

		PubSub.subscribe('atualiza-lista-autores',function(topico,novaLista){
			this.setState({lista:novaLista});
		}.bind(this));
	}   


	render(){
		return (	
			<TemplateDefault pagina="CadastroAutores" titulo="Cadastro de Autores">
				<FormularioAutor/>
				<TabelaAutores lista={this.state.lista}/>
			</TemplateDefault>
		);
	}
}

export default AutorBox;