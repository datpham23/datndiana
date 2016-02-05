import React                    from 'react';
import {Link}                   from 'react-router';
import {connect}                from 'react-redux';
import {bindActionCreators}     from 'redux';
import $                        from 'jquery';
import classnames               from 'classnames';
window.$ = $;
window.jQuery = $;
import './sass/app-root.scss';




const App = React.createClass({
  getInitialState: function() {
    return {
      invertNav : $(window).scrollTop() > 50
    };
  },
  onScroll(){
    this.setState({
      invertNav : $(window).scrollTop()>50
    });
  },
  componentWillMount() {
    $(window).on('scroll',this.onScroll)
  },
  componentWillUnmount: function() {
    $(window).unBind('scroll',this.onScroll)
  },
  render(){
    return (
      <div className="app-root">
        <nav id="mainNav" className={classnames('navbar navbar-default navbar-fixed-top',{'affix' : this.state.invertNav})}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand page-scroll" href="#/">Dat & Diana</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a className="page-scroll" href="#photos">Photos</a>
                </li>
                <li>
                  <a className="page-scroll" href="#party">Meet The Party</a>
                </li>
                <li>
                  <a className="page-scroll" href="#rsvp">RSVP</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <section className="child-route">
          {this.props.children}
        </section>
      </div>
    )
  }
});


export default connect(state => state)(App);
