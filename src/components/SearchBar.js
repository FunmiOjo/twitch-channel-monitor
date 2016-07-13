import React from 'react';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {term: ''};
		this.onClearRequest = this.onClearRequest.bind(this);
	}
	
	onInputSubmit(e) {
		e.preventDefault();
		this.props.onTermSubmit(this.state.term);
	}
	
	onInputChange(term) {
		this.setState({term});
	}
	
	onClearRequest() {
		this.props.onSearchClear();
	}
	
	render() {
		return (
			<div className='form-container'>
			<form className= 'form-group'
				onSubmit={event => this.onInputSubmit(event)} >
				
				<div className='input-group'>
				<input className='form-control' type='text'
					value={this.state.term}
					onChange={e => this.onInputChange(e.target.value)}
					placeholder='Search for a channel'/>
				
				
				<input className='btn btn-primary' type='submit'/>
				
				
				<input className='btn btn-default' type='button' 
				value='Clear search'
				onClick={this.onClearRequest} />
				</div>
				
				
			</form>
			</div>	
		);
	}
}


export default SearchBar;
