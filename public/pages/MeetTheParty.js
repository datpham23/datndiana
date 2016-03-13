import React from 'react';
import '../sass/meet-the-party.scss';

export default React.createClass({
  render: function() {
    return (
      <div className='meet-the-party'>
        <div className='background'/>
        <h1 className='header'>The Wedding Party</h1>
        <div className='group'>
          <div className='person'>
            <img src='/img/daucao.jpg' className='picture'/>
            <div className='name'>Dau Cao</div>
            <div className='title'>Father of the Groom</div>
          </div>
          <div className='person'>
            <img src='/img/ngocpham.jpg' className='picture'/>
            <div className='name'>Ngoc Pham</div>
            <div className='title'>Mother of the Groom</div>
          </div>
          <div className='person'>
            <img src='/img/ngochuynh.jpg' className='picture'/>
            <div className='name'>Ngoc Huynh</div>
            <div className='title'>Mother of the Bride</div>
          </div>
          <div className='person'>
            <img src='/img/namdo.jpg' className='picture'/>
            <div className='name'>Nam Do</div>
            <div className='title'>Father of the Bride</div>
          </div>
        </div>


        <div className='group'>
          <div className='person'>
            <img src='/img/datcao.jpg' className='picture'/>
            <div className='name'>Dat Cao</div>
            <div className='title'>Groom</div>
          </div>
          <div className='person'>
            <img src='/img/dianahuynh.jpg' className='picture'/>
            <div className='name'>Diana Huynh</div>
            <div className='title'>Bride</div>
          </div>
        </div>
        <div className='group'>
          <div className='person'>
            <img src='/img/datpham.jpg' className='picture'/>
            <div className='name'>Dat Pham</div>
            <div className='title'>Best Man</div>
          </div>
          <div className='person'>
            <img src='/img/cindydo.jpg' className='picture'/>
            <div className='name'>Cindy Do</div>
            <div className='title'>Maid of Honor</div>
          </div>
        </div>

        <div className='group'>
          <div className='person'>
            <img src='/img/lawrencego.jpg' className='picture'/>
            <div className='name'>Lawrence Go</div>
            <div className='title'>Groomsman</div>
          </div>
          <div className='person'>
            <img src='/img/lainguyen.jpg' className='picture'/>
            <div className='name'>Lai Nguyen</div>
            <div className='title'>Groomsman</div>
          </div>

          <div className='person'>
            <img src='/img/nancyhuynh.jpg' className='picture'/>
            <div className='name'>Nancy Huynh</div>
            <div className='title'>Bridesmaid</div>
          </div>
          <div className='person'>
            <img src='/img/natashaly.jpg' className='picture'/>
            <div className='name'>Natasha Ly</div>
            <div className='title'>Bridesmaid</div>
          </div>
        </div>

        <div className='group'>
          <div className='person'>
            <img src='/img/vinhdiep.jpg' className='picture'/>
            <div className='name'>Vinh Diep</div>
            <div className='title'>Groomsman</div>
          </div>
          <div className='person'>
            <img src='/img/thoaitran.jpg' className='picture'/>
            <div className='name'>Thoai Tran</div>
            <div className='title'>Groomsman</div>
          </div>

          <div className='person'>
            <img src='/img/ngatran.jpg' className='picture'/>
            <div className='name'>Nga Tran</div>
            <div className='title'>Bridesmaid</div>
          </div>
          <div className='person'>
            <img src='/img/giovannarepich.jpg' className='picture'/>
            <div className='name'>Giovanna Repich</div>
            <div className='title'>Bridesmaid</div>
          </div>
        </div>
        <div className='group'>
          <div className='person'>
            <img src='/img/anthonyvo.jpg' className='picture'/>
            <div className='name'>Anthony Vo</div>
            <div className='title'>Groomsman</div>
          </div>
          <div className='person'>
            <img src='/img/jansenzhang.jpg' className='picture'/>
            <div className='name'>Jansen Zhang</div>
            <div className='title'>Groomsman</div>
          </div>
          <div className='person'>
            <img src='/img/erikalara.jpg' className='picture'/>
            <div className='name'>Erika Lara</div>
            <div className='title'>Bridesmaid</div>
          </div>
          <div className='person'>
            <img src='/img/berenicegarcia.jpg' className='picture'/>
            <div className='name'>Berenice Garcia</div>
            <div className='title'>Bridesmaid</div>
          </div>
        </div>
      </div>
    );
  }

});
