import React from 'react'
import '../sass/photos-page.scss';

export default React.createClass({
  render() {
    let photos = [];

    for(var i=1; i<=33;i++){
      photos.push((
        <section key={`/img/DDE-${i}.jpg`}>
          <a href={`#/photos/${i}`}>
            <img className='preview' src={`/img/DDE-${i}.jpg`}/>
          </a>
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
