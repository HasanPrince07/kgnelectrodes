import { useEffect, useState } from "react";
import Dashboardlinks from "../components/Dashboardlinks";
import { ToastContainer, toast } from 'react-toastify'

function Mainimagemanagement() {

    const [image, setImage] = useState('')
    const [data, setData] = useState('')

    useEffect(() => {
        recall()
    }, [])

    function recall() {
        fetch('/admin/fetchimage').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setData(data.apidata.image)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    function handleform(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('file', image)
        fetch('/admin/updatemainmanagement', {
            method: 'PUT',
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` },
            body: formdata
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
                            <h2 className="text-center">Main Image Management Page</h2>
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="col-md-3">
                                    <img src={data} alt='image not found' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <input required onChange={(e) => { setImage(e.target.files[0]) }} type='file' className='form-control my-2' />
                                    <button className="btn form-control">Change Image</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Mainimagemanagement;