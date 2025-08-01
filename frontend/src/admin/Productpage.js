import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Dashboardlinks from "../components/Dashboardlinks";

function Productpage() {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')

    function handleform(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('image', image)
        formdata.append('desc', desc)
        fetch('/admin/addproduct', {
            method: 'POST',
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` },
            body: formdata
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                toast('Product has been added', { position: 'top-center', type: 'success' })
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
                            <h2 className="text-center">Add Product Here</h2>
                            <div className="col-md-12">
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <label className="pb-1 pt-2">Product Name</label>
                                    <input value={name} onChange={(e) => { setName(e.target.value) }} type='text' className='form-control' required />
                                    <label className="pb-1 pt-2">Product Image</label>
                                    <input onChange={(e) => { setImage(e.target.files[0]) }} type='file' className='form-control' required />
                                    <label className="pb-1 pt-2">Product Description</label>
                                    <textarea value={desc} onChange={(e) => { setDesc(e.target.value) }} rows={4} className="form-control" required></textarea>
                                    <button className="btn form-control mt-2">Add Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Productpage;