import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Changepage() {

    const [cpass, setCpass] = useState('')
    const [npass, setNpass] = useState('')

    function handleform(e) {
        e.preventDefault()
        const formdata = { cpass, npass }
        fetch('/admin/changepassword', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                toast('Password has been changed', { position: 'top-center', type: 'success' })
            } else if (data.status === 400) {
                toast('Current password is not matched', { position: 'top-center', type: 'error' })
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    return (
        <>
            <ToastContainer />

            <section id="login">
                <div className="emptydiv"></div>
                <div className='container'>
                    <div className='row d-flex justify-content-center align-items-center'>
                        <div className='col-md-6 bg-light'>
                            <form method="post" onSubmit={(e) => { handleform(e) }}>
                                <h2 className='text-center mt-4'>Change Password</h2>
                                <label className='pb-1 pt-2'>Current Password</label>
                                <input onChange={(e) => { setCpass(e.target.value) }} value={cpass} required type='password' className='form-control' />
                                <label className='pb-1 pt-2'>New Password</label>
                                <input onChange={(e) => { setNpass(e.target.value) }} value={npass} required type='password' className='form-control' />
                                <button className='btn form-control my-3 fs-5'>Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Changepage;