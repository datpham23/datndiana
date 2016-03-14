import React, {PropTypes} from 'react'
import {Carousel, CarouselItem} from 'react-bootstrap';
import '../sass/index-page.scss';
import InstagramPost from '../components/InstagramPost';
import ReactDOMServer from 'react-dom/server';
import * as API from '../api/api';

const style = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#444444"
      }
    ]
  }, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#f2f2f2"
      }
    ]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      }, {
        "lightness": 45
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  }, {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "color": "#F2687F"
      }, {
        "visibility": "on"
      }
    ]
  }
];

export default React.createClass({
  getInitialState: function() {
    API.getInstagramFeed('datdianawedding').then(res=>{
      this.setState({
        posts : res.entity.posts
      })
    });

    return {
      countDown : '',
      posts : []
    };
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
  },
  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('teaMap'), {
      center: {
        lat: 37.368568,
        lng: -121.84053
      },
      zoom: 10,
      scrollwheel: false
    });

    this.map.setOptions({styles: style});

    var marker = new google.maps.Marker({
      position: {
        lat: 37.368568,
        lng: -121.84053
      },
      map: this.map,
      icon: '/img/tea-ceremony.png'
    });

    var marker2 = new google.maps.Marker({
      position: {
        lat: 37.179879,
        lng: -121.71453300000002
      },
      map: this.map,
      icon: '/img/reception.png'
    });

    var latlngbounds = new google.maps.LatLngBounds();
    latlngbounds.extend(marker.position);
    latlngbounds.extend(marker2.position);
    this.map.setCenter(latlngbounds.getCenter());
    this.map.fitBounds(latlngbounds);

    var infowindow = new google.maps.InfoWindow({
      content: ReactDOMServer.renderToString( < div className = 'pop-over' > <h4>Tea Ceremony</h4> < p > 10 : 00 AM < /p>
          <p>Do & Huynh Residence</p > <address>
        2718 Riverrun Drive San Jose California, 95127
      </address> < /div>
      )
    });

    var infowindow2 = new google.maps.InfoWindow({
      content: ReactDOMServer.renderToString(
        <div className='pop-over'>
          <h4>The Reception</h4 > <p>5:00 PM</p> < p > Tran Residence < /p>
          <address>
            9905 Lantz Drive Morgan Hill California, 95037
          </address > </div>)
    });

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });

    marker2.addListener('click', function() {
      infowindow2.open(this.map, marker2);
    });



    var end = new Date('05/28/2016 10:00 AM');

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    this.timer;

    const showRemaining = ()=>{
      var now = new Date();
      var distance = end - now;
      if (distance < 0) {

          clearInterval(timer);
          document.getElementById(id).innerHTML = 'EXPIRED!';

          return;
      }
      var days = Math.floor(distance / _day);
      var hours = Math.floor((distance % _day) / _hour);
      var minutes = Math.floor((distance % _hour) / _minute);
      var seconds = Math.floor((distance % _minute) / _second);

      var outPut = days + ':';
      outPut += hours + ':';
      outPut += minutes + ':';
      outPut += seconds + '';

      this.setState({
        countDown : outPut
      })
    }

    this.timer = setInterval(showRemaining, 1000);

  },
  render() {
    return (
      <div className="index-page">
        <Carousel interval={2000}>
          <CarouselItem>
            <img width='100%' height='100%' src="/img/cover1.jpg"/>
          </CarouselItem>
          <CarouselItem>
            <img width='100%' height='100%' src="/img/cover2.jpg"/>
          </CarouselItem>
          <CarouselItem>
            <img width='100%' height='100%' src="/img/cover3.jpg"/>
          </CarouselItem>
        </Carousel>
        <div className="details">
          <div className="row">
            <div className="col-md-6 calendar-column">
              <div className="calendar-container">
                <header>
                  <div className="day">28</div>
                  <div className="month">May</div>
                  <div className="year">2016</div>
                </header>
                <table className="calendar">
                  <thead>
                    <tr>
                      <td>Sun</td>
                      <td>Mon</td>
                      <td>Tue</td>
                      <td>Wed</td>
                      <td>Thu</td>
                      <td>Fri</td>
                      <td>Sat</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                      <td>7</td>
                    </tr>

                    <tr>
                      <td>8</td>
                      <td>9</td>
                      <td>10</td>
                      <td>11</td>
                      <td>12</td>
                      <td>13</td>
                      <td>14</td>
                    </tr>

                    <tr>
                      <td>15</td>
                      <td>16</td>
                      <td>17</td>
                      <td>18</td>
                      <td>19</td>
                      <td>20</td>
                      <td>21</td>
                    </tr>

                    <tr>
                      <td>22</td>
                      <td>23</td>
                      <td>24</td>
                      <td>25</td>
                      <td>26</td>
                      <td>27</td>
                      <td className="current-day">
                        <div className="heart"></div>
                      </td>
                    </tr>

                    <tr>
                      <td>29</td>
                      <td>30</td>
                      <td>31</td>
                      <td className="next-month">1</td>
                      <td className="next-month">2</td>
                      <td className="next-month">3</td>
                      <td className="next-month">4</td>
                    </tr>
                  </tbody>
                </table>
                <div className="ring-left"></div>
                <div className="ring-right"></div>

              </div>
            </div>
            <div className="col-md-6 date-column">
              <img src="/img/tea-ceremony.png"/>
              <h2>Tea Ceremony</h2>
              <p>10:00 AM</p>
              <p>Do & Huynh Residence</p>
              <address>
                2718 Riverrun Drive San Jose California, 95127
              </address>
              <hr/>
              <img src="/img/reception.png"/>
              <h2>The Reception</h2>
              <p>5:00 PM</p>
              <p>Tran Residence</p>
              <address>
                9905 Lantz Drive Morgan Hill California, 95037
              </address>
            </div>
          </div>
        </div>
        <div className="map-container">
          <div id="teaMap" style={{
            height: '700px',
            width: '100%'
          }}/>
        </div>
        <div className="count-down-container">
          <p className="count-down">{this.state.countDown}</p>
          <p className="caption">Til The Big Day!</p>
        </div>
        <div className='instagram-container'>
          <img className='instagram-icon' src='/img/instagramicon.png'/>
          <span className='hashtag'>#datdianawedding</span>
        </div>
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
    )
  }
})
