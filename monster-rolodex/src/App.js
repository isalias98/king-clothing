import { Component } from 'react';
import { useState, useEffect } from 'react';
//import logo from './logo.svg';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
	const [searchField, setSearchField] = useState('');
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilterMonsters] = useState(monsters);
	const [strigField, setStringField] = useState('');


	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then((users)
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(searchField);
		});

		setFilterMonsters(newFilteredMonsters);
	}, [monsters, searchField]);
	

	const onSearchChange = (event) => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);


		const filteredMonsters = monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(searchField);
		});

		this.setState(() => {
			return { searchField };
		});
	};
	return (
		<div className="App">
				<h1 className="app-title">Monsta Roladex</h1>
				<SearchBox
					className="monsters-search-box"
					onChangeHandler={onSearchChange}
					placeholder="Search monsters"
				/>
				<CardList monsters={filteredMonsters} />
			</div>
	)
}

class App extends Component {
	constructor() {
		//super();

		this.state = {
			monsters: [],
			searchField: ''
		};
		console.log('constructor');
	}

	componentDidMount() {
		console.log('componentDidMount');
		fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then((users) =>
			this.setState(
				() => {
					return { monsters: users };
				},
				() => {
					console.log(this.state);
				}
			)
		);
	}

	onSearchChange = 
	render() {
		console.log('render');

		const { monsters, searchField } = this.state;
		const { onSearchChange } = this;
		

		return (
			<div className="App">
				<h1 className="app-title">Monsta Roladex</h1>
				<SearchBox
					className="monsters-search-box"
					onChangeHandler={onSearchChange}
					placeholder="Search monsters"
				/>
				<CardList monsters={filteredMonsters} />
			</div>
		);
	};
};

export default App;
