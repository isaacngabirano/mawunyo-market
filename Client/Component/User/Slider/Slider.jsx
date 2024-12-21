import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import { ServerId } from '@/Config/Server';
import style from './Slider.module.scss';

const Slider = ({ sliderTwo }) => {
    console.log('Slider component is being rendered');
    console.log('sliderTwo:', sliderTwo);

    return (
        <div>
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
                loop={true}
            >
                {sliderTwo && sliderTwo.items && sliderTwo.items.map((obj, key) => {
                    console.log('sliderTwo.items:', sliderTwo.items);
                    return (
                        <SwiperSlide key={key}>
                            <div>
                                <div
                                    className={style.SlideImgDiv}
                                    style={{
                                        background: `url(${ServerId}/${sliderData.for}/${obj.uni_id}/${obj.file.filename})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className={style.SlideTextDiv}>
                                        <div>
                                            <h5 className={style.SlideSmallText}>{obj.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default Slider;
