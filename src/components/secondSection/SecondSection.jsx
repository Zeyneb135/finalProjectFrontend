import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import style from "./secondSection.module.scss";

const SecondSection = () => {
    return (
        <section className={style.second}>
            <div className={style.container}>
                <div className={style.textContent}>
                    <h2>Why Choose Us?</h2>
                    <p>We provide the best travel experiences with exclusive offers, flexible bookings, and trusted partners.</p>
                    <ul>
                        <li><FaRegCheckCircle className={style.icon} /> Best Price Guarantee</li>
                        <li><FaRegCheckCircle className={style.icon} /> Easy & Fast Booking</li>
                        <li><FaRegCheckCircle className={style.icon} /> Trusted Partners</li>
                        <li><FaRegCheckCircle className={style.icon} /> Flexible Reservations</li>
                    </ul>
                </div>
                <div className={style.imageContent}>
                    <img src="https://avatars.mds.yandex.net/i?id=724d2974dea3a1b3aa93c58adc18fe8c33ceb4d9-4011284-images-thumbs&n=13" alt="Travel" width={500} height={350} className={style.image} />
                </div>
            </div>
        </section>
    );
};

export default SecondSection;