import React from 'react';


class FilterMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			filterChoice: "All"
		};
	}
	
	onMenuChange(e) {
		e.preventDefault();
		this.props.onFilterChange(e.target.value);
		this.setState({filterChoice: e.target.value});
	}
	
	render() {
		return (
			<div className='filter-menu'>
			<form>
			<label htmlFor='filtering-results'>Filter results</label>
			<select name="filter" value={this.state.filterChoice}
				onChange={e => this.onMenuChange(e)}
				className='filter-menu'>
				<option value="All">All</option>
				<option value="Online" >Online</option>
				<option value="Offline" >Offline</option>
			</select>
			</form>
			</div>
		);
	} 
}


export default FilterMenu;
