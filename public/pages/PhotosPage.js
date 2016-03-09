import React from 'react'
import '../sass/photos-page.scss';





export default React.createClass({
  getInitialState: function() {
    return {
      index : -1
    };
  },
  onExpand(i){
    this.setState({
      index : i
    });
  },
  componentDidMount: function() {
    this.resizeImages();
  },
  componentDidUpdate(){
    // let el = document.querySelector('section.expanded');
    // if(el){
    //   var screenImage = $('section.expanded .preview');
    //
    //   var nativeImage = new Image();
    //   nativeImage.src = screenImage.attr("src");
    //   var imageWidth = nativeImage.width;
    //   var imageHeight = nativeImage.height;
    //   let isPotrait = nativeImage.height > nativeImage.width;
    //
    //   if(isPotrait)
    //     $('section.expanded .preview').css('height','100%').css('width','auto');
    //   else
    //     $('section.expanded .preview').css('width','100%').css('height','auto');
    // }

    this.resizeImages();
  },
  resizeImages(){
    $('.preview').each(function(i,el){
      var screenImage = $(this);

      var nativeImage = new Image();
      nativeImage.src = screenImage.attr("src");
      var imageWidth = nativeImage.width;
      var imageHeight = nativeImage.height;
      let isPotrait = nativeImage.height > nativeImage.width;


      if($(this).hasClass('expanded')){
        if(isPotrait)
          $(this).css('height','100%').css('width','auto');
        else
          $(this).css('width','100%').css('height','auto');
      }else{
        $(this).css('height','100%').css('width','100%');
      }
    })
  },
  render() {
    let photos = [];

    for(var i=1; i<=33;i++){
      let className = i === this.state.index? 'expanded' : '';
      photos.push((
        <section className={className} key={`/img/DDE-${i}.jpg`}>
          <img
            className={"preview "+className }
            src={`/img/DDE-${i}.jpg`}
            onClick={this.onExpand.bind(null,i)}
          />
        <div className="hide-button" onClick={this.onExpand.bind(null,-1)}>×</div>
        </section>
      ));
    }

    return (
      <div className="photos-page">
        <div className="background"/>
        <div className="photos-container">
          <article>
            {photos}
          </article>
        </div>
      </div>
    )
  }
})
