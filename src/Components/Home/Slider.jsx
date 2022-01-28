import { useState, useEffect } from 'react';
import Container from '../UI/Container';

const data = [
    {
        title: "10 Million+ Products At Your Doorstep",
        image: "headphones.svg"
    },
    {
        title: "Explore More And Modern Products",
        image: "virtual_reality.svg"
    },
    {
        title: "eKart Choose The Best Products For You.",
        image: "scooter.svg"
    }
]

const Slider = () => {
    const [currSlider, setCurrSlider] = useState(0);

    let i = currSlider;
    useEffect(() => {
        const timer = setInterval(() => {
            i < data.length - 1 ? i++ : i = 0;
            setCurrSlider(i)
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const handleDot = (i) => setCurrSlider(i);

    const isActiveSlider = (idx) => idx === currSlider ? 'active' : '';

    const handleArrow = (step) => {
        step === "prev" && setCurrSlider(currSlider !== 0 ? currSlider - 1 : data.length - 1)
        step === "next" && setCurrSlider(currSlider !== data.length - 1 ? currSlider + 1 : 0)
    }

    return (
        <Container>
            <div className="slider--container">
                <div className="slider--container-body">
                    <div className="slider">
                        <div className="slider--text">{data[currSlider].title}</div>
                        <img src={`./assets/svgs/${data[currSlider].image}`} alt="" />
                    </div>
                </div>

                <div className="slider--container-footer">
                    <div className="chevron chevron-left" onClick={() => handleArrow('prev')}>
                        <i className="bi bi-chevron-left"></i>
                    </div>

                    <div className="dots">
                        {data.map((el, i) => (
                            <div 
                                key={i}
                                onClick={() => handleDot(i)}
                                className={`${isActiveSlider(i)}`}
                            ></div>
                        ))}
                    </div>

                    <div className="chevron chevron-right" onClick={() => handleArrow('next')}>
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Slider;