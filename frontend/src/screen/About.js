import { useEffect, useState } from "react"

function About() {

    const [hdesc, setHdesc] = useState('')
    const [himage, setHimage] = useState('')
    const [tdesc, setTdesc] = useState('')
    const [timage1, setTimage1] = useState('')
    const [timage2, setTimage2] = useState('')
    const [timage3, setTimage3] = useState('')

    useEffect(() => {
        fetch('/user/fetchabout').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setHdesc(data.apidata.hdesc)
                setHimage(data.apidata.himage)
                setTdesc(data.apidata.tdesc)
                setTimage1(data.apidata.timage1)
                setTimage2(data.apidata.timage2)
                setTimage3(data.apidata.timage3)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }, [])

    return (
        <>
            <section id="aboutpage">
                <div className="emptydiv"></div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 bg-light mt-5 pb-4'>
                            <h2 className='text-center py-4 m-0'>Our History</h2>
                            <div className='line bg-warning'></div>
                            <p className="text-center p-4 m-0">{hdesc}</p>
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="col-md-6">
                                    <img className="img-fluid" src={himage} alt='image not found' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 bg-light mt-5 pb-4'>
                            <h2 className='text-center py-4 m-0'>Our Team</h2>
                            <div className='line bg-warning'></div>
                            <p className="text-center p-4 m-0">{tdesc}</p>
                            <div className="col-md-12 d-md-flex justify-content-around">
                                <div className="col-md-3 my-md-0 my-2">
                                    <img className='img-fluid' src={timage1} alt='image not found' />
                                </div>
                                <div className="col-md-3 my-md-0 my-2">
                                    <img className='img-fluid' src={timage2} alt='image not found' />
                                </div>
                                <div className="col-md-3 my-md-0 my-2">
                                    <img className='img-fluid' src={timage3} alt='image not found' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;