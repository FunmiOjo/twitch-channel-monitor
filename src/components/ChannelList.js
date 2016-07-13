import React from 'react';
import ChannelItem from './ChannelItem';

const ChannelList = props => {
	console.log(props.channels);
	if (Object.keys(props.channels).length > 0) {
		var items = [];
		var chan;
		var counter = 0;
		
		for (var chan in props.channels) {
			items.push(<ChannelItem key={counter} channelInfo={props.channels[chan]}/>);
			counter += 1;
		}
		
		return <div>
			<ul className='channel-list'>{items}
			</ul></div>;
					
	} else {
		return (
			<div></div>
		);
	}
}

export default ChannelList;
