import React from 'react';
import '../sass/components/instagram-post.scss';

export default React.createClass({
  render: function() {
    console.log(this.props.post)
    let {post} = this.props;
    return (
      <div className='instagram-post'>
        {
          post.type == "video"?
            <video className='media' autoPlay loop muted>
              <source src={post.videos.standard_resolution.url} type="video/mp4"/>
            </video>
          :
            <img className='media' src={post.images.standard_resolution.url}></img>
        }
        <img className="profile" src={post.user.profile_picture}/>
        <div className="tags">
          {
            post.tags.map(tag=>
              <span className='tag'>{`#${tag}`} </span>
            )
          }
        </div>
      </div>
    );
  }

});
