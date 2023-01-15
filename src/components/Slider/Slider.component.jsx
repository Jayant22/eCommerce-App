import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Slider.css';

import { SliderProducts } from './../../data/new';

const Slider = () => {
  return (
    <div className='s_container'>
      <Swiper
        breakpoints={{
          640: { slidesPerView: 3 },
          0: { slidesPerView: 1 },
        }}
        className='mySwiper'
        modules={[Pagination, Navigation]}
        navigation={true}
        loopFillGroupWithBlank={true}
        slidesPerView={3}
        spaceBetween={40}
        slidesPerGroup={1}
        loop={true}
      >
        {SliderProducts.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className='left_s'>
              <div className='name'>
                <span>{slide.brand}</span>
                <span>{slide.title}</span>
              </div>
              <span>{slide.price}$</span>
              <div>Shop Now</div>
            </div>
            <img
              src={slide.thumbnail}
              alt='product Image'
              className='img-p'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
