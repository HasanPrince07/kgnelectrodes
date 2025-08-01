import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Dashboardlinks from "../components/Dashboardlinks";

function Querypage() {

    const { id } = useParams()

    const [to, setTo] = useState('')
    const [from, setFrom] = useState('hasandeveloper07@gmail.com')
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [file, setFile] = useState('')

    useEffect(() => {
        fetch(`/admin/fetchquerybyid/${id}`).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setTo(data.apidata.email)
                setSubject(data.apidata.query)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }, [id])

    function handleform(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('to', to)
        formdata.append('from', from)
        formdata.append('subject', subject)
        formdata.append('body', body)
        formdata.append('file', file)
        fetch(`/admin/reply/${id}`, {
            method: 'POST',
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` },
            body: formdata
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                toast('query has been sent', { position: 'top-center', type: 'success' })
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
                            <h2 className="text-center">Reply Query</h2>
                            <div className="col-md-12">
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <label className="pb-1 pt-2">To</label>
                                    <input onChange={(e) => { setTo(e.target.value) }} value={to} type='email' className='form-control' required />
                                    <label className="pb-1 pt-2">From</label>
                                    <input onChange={(e) => { setFrom(e.target.value) }} value={from} type='email' className='form-control' required />
                                    <label className="pb-1 pt-2">Subject</label>
                                    <input onChange={(e) => { setSubject(e.target.value) }} value={subject} type='text' className='form-control' required />
                                    <label className="pb-1 pt-2">Body</label>
                                    <textarea value={body} onChange={(e) => { setBody(e.target.value) }} rows={4} className="form-control" required></textarea>
                                    <label className="pb-1 pt-2">Attachment</label>
                                    <input onChange={(e) => { setFile(e.target.files[0]) }} type='file' className='form-control' />
                                    <button className="btn form-control mt-2">Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Querypage;