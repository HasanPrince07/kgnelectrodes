import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

function Career() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [experience, setExperience] = useState('')
    const [message, setMessage] = useState('')

    function handleform(e) {
        e.preventDefault()
        const formdata = { name, email, number, experience, message }
        fetch('/user/addcareer', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                toast('Your application has been submitted', { position: 'top-center', type: 'success' })
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <section id='career'>
                <div className='emptydiv'></div>
                <h2 className='text-center my-3'>Make Your <span>Career</span> With Us</h2>
                <p className='text-center px-5 m-0'>We don't just manufacture welding rods, we forge careers. If you're passionate about welding, seeking opportunities for professional development, and want to be part of a growing industry, then kgn electrodes is the place for you.</p>
                <div className='container'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-8 bg-light mt-3 border border-2'>
                            <h3 className='py-3 ps-2 m-0'>Submit Your Application For Job</h3>
                            <form method="post" onSubmit={(e) => { handleform(e) }}>
                                <div className='d-md-flex col-md-12'>
                                    <div className='col-md-6 col-12 px-1'>
                                        <label className='ps-1'>Full Name</label>
                                        <input value={name} onChange={(e) => { setName(e.target.value) }} required type='text' className='form-control m-1 mb-2' />
                                    </div>
                                    <div className='col-md-6 col-12 px-1'>
                                        <label className='ps-1'>Email</label>
                                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} required type='email' className='form-control m-1 mb-2' />
                                    </div>
                                </div>
                                <div className='d-md-flex col-md-12'>
                                    <div className='col-md-6 col-12 px-1'>
                                        <label className='ps-1'>Number</label>
                                        <input value={number} onChange={(e) => { setNumber(e.target.value) }} required type='number' className='form-control m-1 mb-2' />
                                    </div>
                                    <div className='col-md-6 col-12 px-1'>
                                        <label className='ps-1'>Experience</label>
                                        <select value={experience} onChange={(e) => { setExperience(e.target.value) }} className='form-select m-1 mb-2'>
                                            <option>in years</option>
                                            <option>0-1</option>
                                            <option>1-2</option>
                                            <option>2-3</option>
                                            <option>3-4</option>
                                            <option>4-5</option>
                                            <option>5+</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='ms-2'>
                                    <label>Your Message</label><br />
                                    <textarea value={message} onChange={(e) => { setMessage(e.target.value) }} rows={4} className='form-control mt-1 mb-2'></textarea>
                                </div>
                                <div className='col-md-6'>
                                    <button className='btn form-control ms-2 mb-2 fs-5'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Career;