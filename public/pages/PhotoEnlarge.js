import React from 'react';
import '../sass/photos-enlarge.scss';

export default React.createClass({
  componentDidMount: function() {
    this.resizeImages();
  },
  resizeImages(){
    $('.image').each(function(i,el){
      var screenImage = $(this);

      var nativeImage = new Image();
      nativeImage.src = screenImage.attr("src");
      
      let isPotrait = nativeImage.height > nativeImage.width;

      if(isPotrait)
        $(this).css('height','100%').css('width','auto');
      else
        $(this).css('width','100%').css('height','auto');

    })
  },
  render: function() {
    return (
      <div className='photo-enlarge'>
        <img className='image' src={`/img/DDE-${this.props.params.id}.jpg`}/>
        <a className="hide-button" href="#/photos">×</a>
      </div>
    );
  }
});
