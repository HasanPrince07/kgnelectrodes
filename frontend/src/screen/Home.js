import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'

function Home() {

    const [mainimage, setMainimage] = useState('')

    const [firstp, setFirstp] = useState('')
    const [secondp, setSecondp] = useState('')
    const [thirdp, setThirdp] = useState('')
    const [fourthp, setFourthp] = useState('')

    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')

    const [testi, setTesti] = useState([])

    const [product, setProduct] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [query, setQuery] = useState('')

    useEffect(() => {
        fetch('/user/fetchimage').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setMainimage(data.apidata.image)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
        fetch('/user/fetchdetail').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setFirstp(data.apidata.firstp)
                setSecondp(data.apidata.secondp)
                setThirdp(data.apidata.thirdp)
                setFourthp(data.apidata.fourthp)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
        fetch('/user/fetchabout').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setDesc(data.apidata.desc)
                setImage(data.apidata.image)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
        fetch('/user/fetchtesti').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setTesti(data.filterrecord)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
        fetch('/user/fetchproduct').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setProduct(data.apidata)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }, [])

    function handleform(e) {
        e.preventDefault()
        const formdata = { name, email, query }
        fetch('/user/insertquery', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                toast('Your query has been submited', { position: 'top-center', type: 'success' })
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    return (
        <>
            <ToastContainer />

            <section id='wallpaper'>
                <img className='img-fluid' src={mainimage} alt='image not found' />
            </section>

            <section id='detail'>
                <div className='container-fluid'>
                    <div className='row bg-warning py-md-5 py-4'>
                        <div className='p-md-0 p-2 col-md-3 d-flex align-items-center justify-content-center border-start border-end border-white'>
                            <p className='fs-4 m-0 p-1'>{firstp}</p>
                        </div>
                        <div className='p-md-0 p-2 col-md-3 d-flex align-items-center justify-content-center border-start border-end border-white'>
                            <p className='fs-4 m-0 p-1'>{secondp}</p>
                        </div>
                        <div className='p-md-0 p-2 col-md-3 d-flex align-items-center justify-content-center border-start border-end border-white'>
                            <p className='fs-4 m-0 p-1'>{thirdp}</p>
                        </div>
                        <div className='p-md-0 p-2 col-md-3 d-flex align-items-center justify-content-center border-start border-end border-white'>
                            <p className='fs-4 m-0 p-1'>{fourthp}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id='about'>
                <div className='container-fluid bg-light p-0'>
                    <div className='row m-0'>
                        <div className='col-md-6'>
                            <h2 className='text-dark text-center py-4 m-0'>ABOUT US</h2>
                            <div className='line bg-warning'></div>
                            <p className='px-4 pt-4'>{desc}</p>
                            <div className='container'>
                                <div className='row d-flex justify-content-center'>
                                    <div className='col-md-4'>
                                        <Link to='/about'><button className='btn form-control fs-5 my-3'>More Detail</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 p-0 d-flex align-items-center'>
                            <img className='img-fluid' src={image} alt='image not found' />
                        </div>
                    </div>
                </div>
            </section>

            <section id='testi'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 d-flex justify-content-between align-items-center p-0'>
                            <h2 className='text-center py-4 m-0'>Happy Customers</h2>
                            <div className="d-md-flex">
                                <Link to='/alltesti'><button className='form-control btn px-5 fs-5 me-2 mb-lg-0 mb-2'>See More Review</button></Link>
                                <Link to='/testi'><button className='form-control btn px-5 fs-5'>Add Review</button></Link>
                            </div>
                        </div>
                        <div className='line bg-warning mb-4'></div>
                        {testi.map((result) => (
                            <div className='col-md-3 bg-dark border border-2 border-white' key={result._id}>
                                <p className='p-2 text-white m-0'>{result.desc}</p>
                                <h5 className='bg-warning py-1 px-2 text-white'>{result.name}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id='product'>
                <div className='container-fluid bg-light mt-5'>
                    <div className='row px-3'>
                        <h2 className='text-center py-4 m-0'>Our Product</h2>
                        <div className='line bg-warning mb-4'></div>
                        {product.map((result) => (
                            <div className='col-md-3 p-2 bg-white border border-5 border-light' key={result._id}>
                                <img className='img-fluid' src={result.image} alt='image not found' />
                                <h3 className="py-2">{result.name}</h3>
                                <div className="mb-2">
                                    <Link to={`/product/${result._id}`}>
                                        <button className='btn form-control fs-5'>Know More</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id='contact'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h2 className='text-center text-dark my-4'>Contact Us</h2>
                            <div className='line bg-warning mb-4'></div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d379.90689979368636!2d74.0425905679821!3d26.678110605212204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396a491e6e3f5757%3A0x7f4e0868745e51be!2sKGN%20Electrode%20Private%20Limited!5e0!3m2!1sen!2sin!4v1692374466344!5m2!1sen!2sin" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <div className='col-md-12 d-flex justify-content-center mt-4'>
                                <div className='col-lg-6 col-md-12 col-12'>
                                    <form method="post" onSubmit={(e) => { handleform(e) }}>
                                        <label className='pb-1 pt-3'>Name</label>
                                        <input value={name} onChange={(e) => { setName(e.target.value) }} required type='text' className='form-control' />
                                        <label className='pb-1 pt-3'>Email</label>
                                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} required type='email' className='form-control' />
                                        <label className='pb-1 pt-3'>Query</label>
                                        <textarea value={query} onChange={(e) => { setQuery(e.target.value) }} required rows={4} className='form-control'></textarea>
                                        <div className='col-md-4'>
                                            <button className='btn btn-dark mt-3 form-control fs-5'>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Home;