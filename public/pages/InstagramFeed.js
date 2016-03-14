import React from 'react';
import InstagramPost from '../components/InstagramPost';
import * as API from '../api/api';
import '../sass/instagram-feed.scss';
import io from 'socket.io-client';
import config from '../../config';
import _ from 'lodash';

const tag = 'datdianawedding';

export default React.createClass({
  getInitialState: function() {
    API.getInstagramFeed(tag).then(res=>{
      this.setState({
        posts : res.entity.posts
      });

      if(res.entity.pagination.next_max_id){
        this.getNextPage(res.entity.pagination.next_max_id);
      }

    });

    return {
      posts : []
    };
  },
  getNextPage(id){
    $.ajax({
      url: `https://api.instagram.com/v1/tags/${tag}/media/recent?client_id=${config.instagram.client_id}&max_tag_id=${id}`,
      dataType: 'jsonp',
    }).done(entity=>{
      let posts = [...this.state.posts,...entity.data];

      posts = _.uniq(posts, function(post){
        return post.id;
      });

      this.setState({
        posts : posts
      });

      if(this.state.posts.length<100 && entity.pagination.next_max_id){
        this.getNextPage(entity.pagination.next_max_id)
      }
    });
  },
  componentDidMount: function() {
    var socket = io(window.location.origin);
    socket.on('newPosts', (dataBundle)=>{
      $.ajax({
        url: `https://api.instagram.com/v1/tags/${tag}/media/recent?client_id=${config.instagram.client_id}&max_tag_id=${null}`,
        dataType: 'jsonp',
      }).done(entity=>{
        let posts = [...entity.data,...this.state.posts];

        posts = _.uniq(posts, function(post){
          return post.id;
        });

        this.setState({
          posts : posts
        });
      })
    });
  },
  render: function() {
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
