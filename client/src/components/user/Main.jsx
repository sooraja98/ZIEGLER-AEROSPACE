import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import mainImage from '../../img/mainImage.jpg'
import Jhon from '../../img/jhonSmith.jpg'
import David from '../../img/David Miller.jpg'
import Emily from '../../img/Emily Davis.jpg'
import sara from '../../img/Sarah Johnson.jpg'
import sidemain from '../../img/sidemain.jpg'
export default function Main() {
    return (
        <section className="text-black body-font lg:pt-20">
            <div className=" flex container px-5 pt-32 mx-auto lg:px-4 lg:py-4">
                <div className="flex flex-col w-full mb-2 text-center">
                    <h1 className="mb-2 text-6xl font-bold tracking-tighter text-white md:text-8xl">
                        <span> Elevate Your 

                        </span>
                        <br className="hidden lg:block"></br>
                        Aircraft Shopping Experience
                    </h1>
                    <br></br>
                    <p className=" text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3">
                    WingWares: Elevating Aviation Excellence with Top-Quality Products and Lightning-Fast Delivery
                    </p>
                </div>
            </div>
            <div className="container flex flex-col items-center justify-center py-8 mx-auto rounded-lg md:p-1 p-3">
                <img className="object-cover object-center w-full mb-10 border-gray-200 dark:border-gray-900 g327 border rounded-lg shadow-md" alt="hero"
                    src={mainImage}></img>
            </div>
            <section className="text-gray-600 body-font">
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-10 mx-auto">
                        <div className="flex flex-wrap -m-4 text-center">
                            <div className="p-4 sm:w-1/3 w-1/2">
                                <h2 className="title-font font-medium sm:text-5xl text-3xl text-white">
                                    <CountUp end={100010}
                                        redraw={true}>
                                        {
                                        ({countUpRef, start}) => (
                                            <VisibilitySensor onChange={start}
                                                delayedCall>
                                                <span ref={countUpRef}/>
                                            </VisibilitySensor>
                                        )
                                    } </CountUp>
                                </h2>
                                <p className="leading-relaxed">Customers</p>
                            </div>
                            <div className="p-4 sm:w-1/3 w-1/2">
                                <h2 className="title-font font-medium sm:text-5xl text-3xl text-white">
                                    <CountUp end={21740}
                                        redraw={true}>
                                        {
                                        ({countUpRef, start}) => (
                                            <VisibilitySensor onChange={start}
                                                delayedCall>
                                                <span ref={countUpRef}/>
                                            </VisibilitySensor>
                                        )
                                    } </CountUp>
                                </h2>
                                <p className="leading-relaxed">Products</p>
                            </div>
                            <div className="p-4 sm:w-1/3 w-1/2">
                                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                                    <CountUp end={115}
                                        redraw={true}>
                                        {
                                        ({countUpRef, start}) => (
                                            <VisibilitySensor onChange={start}
                                                delayedCall>
                                                <span ref={countUpRef}/>
                                            </VisibilitySensor>
                                        )
                                    } </CountUp>
                                </h2>
                                <p className="leading-relaxed">Provide Global Services</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                        <img alt="feature" className="object-cover object-center h-full w-full" src={sidemain}></img>
                    </div>
                    <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                        <div className="flex flex-col mb-10 lg:items-start items-center">
                            <div className="flex-grow">
                                <h2 className="text-white text-2xl title-font font-medium mb-3">
                                    High-Quality Aircraft Components
                                </h2>
                                <p className="leading-relaxed text-lg">
                                    Explore our extensive range of top-quality aircraft components,
                                                        meticulously crafted for optimal performance and safety.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col mb-10 lg:items-start items-center">
                            <div className="flex-grow">
                                <h2 className="text-white text-2xl title-font font-medium mb-3">
                                    Reliable Aviation Solutions
                                </h2>
                                <p className="leading-relaxed text-lg">
                                    Count on us for reliable aviation solutions and a wide selection of
                                                        components to meet your aircrafts needs.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col mb-10 lg:items-start items-center">
                            <div className="flex-grow">
                                <h2 className="text-white text-2xl title-font font-medium mb-3">
                                    Expertly Designed for Performance
                                </h2>
                                <p className="leading-relaxed text-lg">
                                    Our aircraft components are expertly designed to enhance performance
                                                        and ensure the safety of your flights.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col mb-10 lg:items-start items-center">
                            <div className="flex-grow">
                                <h2 className="text-white text-2xl title-font font-medium mb-3">
                                    Fast and Efficient Delivery
                                </h2>
                                <p className="leading-relaxed text-lg">
                                    Experience fast and efficient delivery of essential aircraft parts to
                                                        minimize downtime.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col mb-10 lg:items-start items-center">
                            <div className="flex-grow">
                                <h2 className="text-white text-2xl title-font font-medium mb-3">
                                    Partnering with Aviation Professionals
                                </h2>
                                <p className="leading-relaxed text-lg">
                                    We proudly partner with aviation professionals worldwide, providing
                                                        top-notch components and services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className="text-gray-600 body-font">
                <div className="container px-5 mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="md:text-5xl text-4xl te font-medium title-font text-white mb-4">
                            Real Stories, Real Satisfaction
                        </h2>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                            This is what we are
                        </p>
                        <div className="flex mt-6 justify-center">
                            <div className="w-16 h-1 rounded-full bg-white inline-flex"></div>
                        </div>
                        <div className="container px-5 py-16 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                <div className="p-4 lg:w-1/4 md:w-1/2">
                                    <div className="h-full flex flex-col items-center text-center">
                                        <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                                            src={Jhon}></img>
                                        <div className="w-full">
                                            <h2 className="title-font font-medium text-lg text-white">
                                                John Smith
                                            </h2>
                                            <h3 className="text-gray-500 mb-3">Aircraft Engineer</h3>
                                            <p className="mb-4">
                                                I purchased aircraft cabin components from this website, and I am extremely satisfied with the quality and service. The products exceeded my expectations.
                                            </p>
                                            <span className="inline-flex">
                                                <a className="text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-2 text-white">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-2 text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 lg:w-1/4 md:w-1/2">
                                    <div className="h-full flex flex-col items-center text-center">
                                        <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                                            src={sara}></img>
                                        <div className="w-full">
                                            <h2 className="title-font font-medium text-lg text-white">
                                                Sarah Johnson
                                            </h2>
                                            <h3 className="text-gray-500 mb-3">Aviation Enthusiast</h3>
                                            <p className="mb-4">
                                                As an aviation enthusiast, I rely on this e-commerce platform for aircraft cabin components. The selection is excellent, and the ordering process is smooth
                                            </p>
                                            <span className="inline-flex">
                                                <a className="text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-2 text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-2 text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 lg:w-1/4 md:w-1/2">
                                    <div className="h-full flex flex-col items-center text-center">
                                        <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                                            src={David}></img>
                                        <div className="w-full">
                                            <h2 className="title-font font-medium text-lg text-white">
                                                David Miller
                                            </h2>
                                            <h3 className="text-gray-500 mb-3">Aircraft Project Manager</h3>
                                            <p className="mb-4">
                                                The customer support here is top-notch. They helped me find the perfect cabin component for my aircraft project, and it was delivered promptly
                                            </p>
                                            <span className="inline-flex">
                                                <a className="text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-2 text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-2 text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 lg:w-1/4 md:w-1/2">
                                    <div className="h-full flex flex-col items-center text-center">
                                        <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                                            src={Emily}></img>
                                        <div className="w-full">
                                            <h2 className="title-font font-medium text-lg text-white">
                                                Emily Davis
                                            </h2>
                                            <h3 className="text-gray-500 mb-3">Commercial Pilot</h3>
                                            <p className="mb-4">
                                                I have been a loyal customer for years. This website consistently delivers high-quality cabin components, and I appreciate the competitive pricing
                                            </p>
                                            <span className="inline-flex">
                                                <a className="text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-2 text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                    </svg>
                                                </a>
                                                <a className="ml-2 text-gray-500">
                                                    <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
