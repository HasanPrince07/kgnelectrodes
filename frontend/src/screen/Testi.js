import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Testi() {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    function handleform(e) {
        e.preventDefault()
        const formdata = { name, desc }
        fetch('/user/addtesti', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                toast('Thanks For Review', { position: 'top-center', type: 'success' })
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    return (
        <>
            <ToastContainer />

            <section id='testipage'>
                <div className="emptydiv"></div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12 d-flex justify-content-center align-items-center'>
                            <div className='col-md-6 col-12 bg-light mt-3 border border-2 px-3'>
                                <h3 className='pt-4 text-center'>Add Your Review</h3>
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <label className='pt-2 pb-1'>Name</label>
                                    <input onChange={(e) => { setName(e.target.value) }} value={name} maxLength={25} type='text' required className='form-control' />
                                    <label className='pt-2 pb-1'>Description</label>
                                    <textarea onChange={(e) => { setDesc(e.target.value) }} value={desc} maxLength={400} required rows={4} className='form-control' type='text'></textarea>
                                    <div className='col-md-6 my-2'>
                                        <button className='btn form-control fs-5'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Testi;