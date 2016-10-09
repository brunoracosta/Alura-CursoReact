import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import './index.css';

import App from './App';
import AutorBox from './paginas/autor/AutorBox';
import HomeBox from './paginas/home/HomeBox';
import LivroBox from './paginas/livro/LivroBox';


ReactDOM.render(
	(<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={HomeBox}/>
			<Route path="/autor" component={AutorBox}/>
			<Route path="/livro" component={LivroBox}/>
		</Route>
	</Router>),
	document.getElementById('root')
);
