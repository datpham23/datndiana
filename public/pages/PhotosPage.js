import React from 'react'
import '../sass/photos-page.scss';





export default React.createClass({
  getInitialState: function() {
    return {
      expandedIndex : -1
    };
  },
  render() {
    let photos = [];

    for(var i=1; i<=33;i++){
      let className = i === this.state.expandedIndex? 'expanded' : '';
      photos.push((
        <section className={className}>
          <img className="preview" src={`/img/DDE-${i}.jpg`}/>
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
