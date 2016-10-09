import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import TemplateDefault from '../../componentes/TemplateDefault';
import FormularioLivro from './FormularioLivro';
import TabelaLivros from './TabelaLivros';

class LivroBox extends Component {

	constructor() {
		super();    
		this.state = {
			listaAutores : [],
			listaLivros: []
		};
	}

	componentDidMount(){  
		$.ajax({
			url:"http://localhost:8080/api/livros",
			dataType: 'json',
			success:function(resposta){    
				this.setState({listaLivros:resposta.reverse()});
			}.bind(this)
		});

		$.ajax({
			url:"http://localhost:8080/api/autores",
			dataType: 'json',
			success:function(resposta){    
				this.setState({listaAutores:resposta.reverse()});
			}.bind(this)
		});

		PubSub.subscribe('atualiza-lista-livros',function(topico,novaLista){
			this.setState({listaLivros:novaLista});
		}.bind(this));

	}   


	render(){
		return (
			<TemplateDefault pagina="CadastroLivro" titulo="Cadastro de Livros">
				<FormularioLivro listaAutores={this.state.listaAutores}/>
				<TabelaLivros lista={this.state.listaLivros} listaAutores={this.state.listaAutores}/>
			</TemplateDefault>
		);
	}
}

export default LivroBox;