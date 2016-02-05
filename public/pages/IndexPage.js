import React, {PropTypes} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Carousel, CarouselItem} from 'react-bootstrap';
import '../sass/index-page.scss';
import ReactDOMServer     from 'react-dom/server';

const style = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#f7505a"},{"visibility":"on"}]}];


/** @constructor */
function USGSOverlay(bounds, image, map) {

  // Initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

USGSOverlay.prototype.draw = function() {

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};


export default React.createClass({
  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('teaMap'), {
      center: {
        lat: 37.368568,
        lng: -121.84053
      },
      zoom: 10
    });

    this.map.setOptions({styles: style});

    var marker = new google.maps.Marker({
      position: {lat: 37.368568, lng: -121.84053},
      map: this.map,
      icon : '/img/tea-ceremony.png'
    });

    var marker2 = new google.maps.Marker({
      position: {lat: 37.179879, lng: -121.71453300000002},
      map: this.map,
      icon : '/img/reception.png'
    });

    var latlngbounds = new google.maps.LatLngBounds();
    latlngbounds.extend(marker.position);
    latlngbounds.extend(marker2.position);
    this.map.setCenter(latlngbounds.getCenter());
    this.map.fitBounds(latlngbounds);

    var infowindow = new google.maps.InfoWindow({
      content: ReactDOMServer.renderToString(
        <div className='pop-over'>
          <h4>Tea Ceremony</h4>
          <p>10:00 AM</p>
          <p>Do & Huynh Residence</p>
          <address>
            2718 Riverrun Drive San Jose California, 95127
          </address>
        </div>
      )
    });

    var infowindow2 = new google.maps.InfoWindow({
      content: ReactDOMServer.renderToString(
        <div className='pop-over'>
          <h4>The Reception</h4>
          <p>5:00 PM</p>
          <p>Tran Residence</p>
          <address>
            9905 Lantz Drive Morgan Hill California, 95037
          </address>
        </div>
      )
    });

    marker.addListener('click', function() {
     infowindow.open(this.map, marker);
    });

    marker2.addListener('click', function() {
     infowindow2.open(this.map, marker2);
    });

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
        <div className="maps">
          <div id="teaMap" style={{
            height: '700px',
            width: '100%'
          }}/>

          {/*
            <div className="row">
              <div className="col-md-6">
                <h2>Tea Ceremony location</h2>
                <iframe
                  style={{'border' : 0, 'height' : '500'}}
                  className="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.8987639013385!2d-121.84271868424477!3d37.36857224319754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcd094a958ed1%3A0x5c7d211c344b0b18!2s2718+Riverrun+Dr%2C+San+Jose%2C+CA+95127!5e0!3m2!1sen!2sus!4v1454574967721"
                  frameborder="0"/>
              </div>
              <div className="col-md-6">
                <h2>The Reception Location</h2>
                <iframe
                  style={{'border' : 0, 'height' : '500'}}
                  className="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25430.852716915895!2d-121.72329309599918!3d37.179878979773285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e267e034e9773%3A0xa98014961a5ac766!2s9905+Lantz+Dr%2C+Morgan+Hill%2C+CA+95037!5e0!3m2!1sen!2sus!4v1454576376392"
                  frameborder="0"/>
              </div>
            </div>
            */}

        </div>
      </div>
    )
  }
})
