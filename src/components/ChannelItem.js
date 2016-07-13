import React from 'react';

const ChannelItem = props => {
	if (props.channelInfo.error) {
		return (
			<li className='list-group-item'>
			<img src='https://placeholdit.imgix.net/~text?txtsize=25&txt=+&w=100&h=100&txttrack=0'
			width='100px'/>
			
			<p className='channel-name'>{props.channelInfo.searchedName}</p>
			<p className='status'>No account</p>
			</li>
	 	);
	}
	
	var streamStatus = "Offline";
	
	if (props.channelInfo.stream) {
		streamStatus = "Online";
	}
	
	var name = props.channelInfo.searchedName;
	var url = `http://www.twitch.tv/${name}`;
	
	return (
		<li className='list-group-item'>
		<img src={props.channelInfo.image} className='img-thumbnail'
			width='100px'/>
		<p className='channel-name'><a href={url}>{props.channelInfo.searchedName}</a></p>
		<p className='status'>{streamStatus}</p>	
		</li>
	);
}


export default ChannelItem;
