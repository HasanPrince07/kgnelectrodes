import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dashboardlinks from "../components/Dashboardlinks";

function Footermanagement() {

    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [facebook, setFacebook] = useState('')
    const [messanger, setMessanger] = useState('')
    const [twitter, setTwitter] = useState('')

    useEffect(() => {
        recall()
    }, [])

    function recall() {
        fetch('/admin/fetchfooter').then((result) => { return result.json() }).then((data) => {
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
    }

    function handleform(e) {
        e.preventDefault()
        const formdata = { email, number, address, facebook, messanger, twitter }
        fetch('/admin/updatefooter', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`
            },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                recall()
                toast('Succesfully Updated', { position: 'top-center', type: 'success' })
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <section id="mainimagemanagement">
                <div className="emptydiv"></div>
                <div className='container-fluid'>
                    <div className='row mt-4'>
                        <Dashboardlinks />
                        <div className='col-md-9'>
                            <h2 className="text-center">Footer Management Page</h2>
                            <div className="col-md-12">
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <label className="pb-1 pt-2">Email</label>
                                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} required type='email' className='form-control' />
                                    <label className="pb-1 pt-2">Number</label>
                                    <input value={number} onChange={(e) => { setNumber(e.target.value) }} required type='number' className='form-control' />
                                    <label className="pb-1 pt-2">Address</label>
                                    <input value={address} onChange={(e) => { setAddress(e.target.value) }} required type='text' className='form-control' />
                                    <label className="pb-1 pt-2">Facebook</label>
                                    <input value={facebook} onChange={(e) => { setFacebook(e.target.value) }} required type='text' className='form-control' />
                                    <label className="pb-1 pt-2">Messanger</label>
                                    <input value={messanger} onChange={(e) => { setMessanger(e.target.value) }} required type='text' className='form-control' />
                                    <label className="pb-1 pt-2">Twitter</label>
                                    <input value={twitter} onChange={(e) => { setTwitter(e.target.value) }} required type='text' className='form-control' />
                                    <button className="btn form-control mt-2">Update Footer</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footermanagement;