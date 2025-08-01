import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Forgotpage() {

    const [npass, setNpass] = useState('')

    function handleform(e) {
        e.preventDefault()
        const formdata = { npass }
        fetch('/admin/frgtpass', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                toast('Password has been succesfully changed', { position: 'top-center', type: 'success' })
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
                                <label className='pb-1 pt-2'>Enter New Password</label>
                                <input value={npass} onChange={(e) => { setNpass(e.target.value) }} required type='password' className='form-control' />
                                <button className='btn form-control my-3 fs-5'>Forgot Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Forgotpage;