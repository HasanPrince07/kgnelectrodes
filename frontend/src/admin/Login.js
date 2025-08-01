import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleform(e) {
        e.preventDefault()
        const formdata = { username, password }
        fetch('/admin/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                window.localStorage.setItem('token', JSON.stringify(data.token))
                navigate('/dashboard')
            } else if (data.status === 400) {
                toast('Wrong Credentials', { position: 'top-center', type: 'error' })
            }
        })
    }

    function handlelink(e) {
        fetch('/admin/forgotpassword').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                toast('Link has been sent', { position: 'top-center', type: 'success' })
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
                                <h2 className='text-center mt-4'>Admin Login</h2>
                                <label className='pb-1 pt-2'>Username</label>
                                <input onChange={(e) => { setUsername(e.target.value) }} value={username} required type='text' className='form-control' />
                                <label className='pb-1 pt-2'>Password</label>
                                <input onChange={(e) => { setPassword(e.target.value) }} value={password} required type='password' className='form-control' />
                                <button className='btn form-control my-3 fs-5'>login</button>
                            </form>
                            <div className="d-flex col-md-12">
                                <table className="table text-center">
                                    <thead>
                                        <tr>
                                            <th><Link onClick={(e) => { handlelink(e) }} className="form-control">forgot password</Link></th>
                                            <th><Link to='/changepage' className="form-control">change password</Link></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;