import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import { ReactTabulator as Tabulator} from 'react-tabulator';
import moment from 'moment';

const todaysDate = new Date().toISOString().substr(0,10);

const initialState = {
	sheetData: [],
	date: todaysDate,
	artist: '',
	album: '',
	notable:false,
}

const tableHeaders = [
	{
		title:'Date', 
		field:'date',
		editor: 'input'
	},
	{
		title:'Artist',
		field:'band',
		headerFilter: 'input',
		editor: "input"
	},
	{
		title:'Album',
		field:'album',
		editor: "input",
		headerFilter: 'input'
	},
	{
		title:'Notable?',
		field:'johnoNotables',
		editor: "input"
	}
]

const options = {
	height: 400,
	movableRows:true
}

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = initialState;
		this.updateData = this.updateData.bind(this);
		this.updateDataOnPageLoad = this.updateDataOnPageLoad.bind(this);
		this.fixDate = this.fixDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.save = this.save.bind(this);
	}

	componentWillMount() {
		fetch('http://localhost:3000/list')
			.then(result => result.json())
			.then(result => {
				// console.log(result);
				this.updateDataOnPageLoad(result);
			});
	}

	save() {
		console.log(this.state.sheetData);

		fetch('http://localhost:3000/list', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.sheetData)
		})
			.then(res => res.json())
			.then(res => console.log(res));
	}

	updateDataOnPageLoad(result) {
		const data = this.fixDate(result);
		this.updateData(data);
	}

	updateData(dataArray) {
		this.sortByDate(dataArray);
		this.setState({
			sheetData: dataArray,
			date: todaysDate,
			artist: '',
			album: '',
			notable:'',
		});
	}

	fixDate(data) {
		var currentDate;
		for(var i = 0; i < data.length; i++) {
			if(data[i].date) {
				currentDate = data[i].date;
			} else {
				data[i].date = currentDate;
			}
			// data[i].date = moment(data[i].date).format('MM/DD/YY');
		}
		return data;
	}

	// renderTableData() {
	// 	return this.state.sheetData.map((entry, index) => {
	// 		return (
	// 			<tr key={index}>
	// 				<td>{entry.date}</td>
	// 				<td>{entry.band}</td>
	// 				<td>{entry.album}</td>
	// 				<td>{entry.johnoNotable}</td>
	// 			</tr>
	// 		);
	// 	})
	// }

	sortByDate(data) {
		data.sort(function (a, b) {
			a = new Date(a.date);
			b = new Date(b.date);
			return a>b ? 1 : a<b ? -1 : 0;
		});
	}

	handleInputChange(event) {
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}

	handleSubmit(event){
		console.log("adding to list");
		var updatedSheetData = this.state.sheetData.slice();
		var formattedDate = moment(this.state.date).format('MM/DD/YY');
		var newEntry = {
			date: formattedDate,
			band: this.state.artist,
			album: this.state.album,
			johnoNotables: this.state.notable
		}
		updatedSheetData.push(newEntry);
		this.updateData(updatedSheetData);
	}

	render() {
		return (
			<div>
				<div>
					<Tabulator columns={tableHeaders} data={this.state.sheetData} options={options}/>
				</div>
				<div>
					<label>Date</label>
					<input type="date" name="date" value={this.state.date || new Date()} onChange={this.handleInputChange} />
					<label>Artist</label>
					<input type="text" name="artist" value={this.state.artist} onChange={this.handleInputChange}/>
					<label>Album</label>
					<input type="text" name="album" value={this.state.album} onChange={this.handleInputChange}/>
					<label>Notable</label>
					<input type="checkbox" name="notable" value={this.state.notable ? "-" : ""} onChange={this.handleInputChange}/>
					<button type="button" onClick={this.handleSubmit}>Add to List</button>
				</div>
				<div>
					<button type="button" onClick={this.save}>Save List</button>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
