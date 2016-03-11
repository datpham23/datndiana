import React from 'react';
import InstagramPost from '../components/InstagramPost';
import * as API from '../api/api';
import '../sass/instagram-feed.scss';

export default React.createClass({
  getInitialState: function() {
    API.getInstagramFeed('datdianawedding').then(res=>{
      this.setState({
        posts : res.entity
      })
    });

    return {
      posts : []
    };
  },
  render: function() {
    console.log(this.state);
    return (
      <div className='instagram-feed'>
        <div className='background'/>
        <div className='posts'>
          {
             this.state.posts.map(post=>{
               return (
                 <InstagramPost key={post.id} post={post}/>
               )
             })
           }
        </div>
      </div>
    );
  }
});
