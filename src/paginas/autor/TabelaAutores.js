import React, { Component } from 'react';

class TabelaAutores extends Component {

	render() {
		return(
			<div>            
				<table className="pure-table">
					<thead>
						<tr>
							<th>Nome</th>
							<th>email</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.lista.map(function(autor){
								return (
									<tr key={autor.id}>
										<td>{autor.nome}</td>
										<td>{autor.email}</td>
									</tr>
								);
							})
						}
					</tbody>
				</table> 
			</div>                     
		);
	}
}

export default TabelaAutores;