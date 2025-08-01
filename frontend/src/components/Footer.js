import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Footer() {

    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [facebook, setFacebook] = useState('')
    const [messanger, setMessanger] = useState('')
    const [twitter, setTwitter] = useState('')

    useEffect(() => {
        fetch('/user/fetchfooter').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setEmail(data.apidata.email)
                setNumber(data.apidata.number)
                setAddress(data.apidata.address)
                setFacebook(data.apidata.facebook)
                setMessanger(data.apidata.messanger)
                setTwitter(data.apidata.twitter)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }, [])

    return (
        <>
            <ToastContainer />
            <section id='footer'>
                <div className='container-fluid bg-dark mt-4'>
                    <div className='row'>
                        <div className='col-md-3 d-flex align-items-center justify-content-md-start justify-content-center mt-md-0 mt-4'>
                            <img src='images/logo.jpeg' alt='image not found' />
                        </div>
                        <div className='col-md-9'>
                            <div className="d-flex justify-content-md-start justify-content-around">
                                <div className="col-md-6 my-3">
                                    <h2 className='text-warning m-0'>Email Us</h2>
                                    <p className='fs-5 m-0'>{email}</p>
                                </div>
                                <div className='col-md-6 my-3'>
                                    <h2 className='text-warning m-0'>Call Us</h2>
                                    <p className='fs-5 m-0'>{number}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-md-start justify-content-around">
                                <div className="col-md-6 my-3">
                                    <h2 className='text-warning m-0'>Our Address</h2>
                                    <p className='fs-5 m-0'>{address}</p>
                                </div>
                                <div className="col-md-6 my-3">
                                    <h2 className='text-warning m-0'>Follow Us</h2>
                                    <p className='fs-5 m-0'>
                                        <Link target='_blank' to={facebook} className='mx-2'>
                                            <i className="bi bi-facebook text-white fs-3"></i>
                                        </Link>
                                        <Link target='_blank' to={messanger} className='mx-2'>
                                            <i className="bi bi-messenger text-white fs-3"></i>
                                        </Link>
                                        <Link target='_blank' to={twitter} className='mx-2'>
                                            <i className="bi bi-twitter text-white fs-3"></i>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 bg-dark border-top border-1'>
                            <p className='text-center m-0 copytext text-white py-2'>Copyright 2023. KGN Electrodes Pvt Ltd. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;