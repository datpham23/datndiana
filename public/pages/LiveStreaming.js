import React from 'react';
import '../sass/live-streaming.scss';
import config from '../../config';

export default React.createClass({

  render: function() {
    return (
      <div className='live-streaming-page'>
        <iframe className='video' width="700" height="393" src={config.liveStreamUrl} frameborder="0" allowfullscreen></iframe>
      </div>
    );
  }

});
