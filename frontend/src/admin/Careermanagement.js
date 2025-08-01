import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Dashboardlinks from "../components/Dashboardlinks";

function Careermanagement() {

    const [data, setData] = useState([])
    const [message, setMessage] = useState(0)
    const [unread, setUnread] = useState(0)
    const [read, setRead] = useState(0)
    const [select, setSelect] = useState('')

    useEffect(() => {
        recall()
    }, [])

    function recall() {
        fetch('/admin/fetchcareer', {
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setData(data.apidata)
                setMessage(data.totalmessage)
                setUnread(data.unreadmessage)
                setRead(data.readmessage)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    function handledelete(e, id) {
        fetch(`/admin/careerdelete/${id}`, {
            method: 'DELETE',
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                recall()
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    function handleform(e) {
        e.preventDefault()
        if (select === '' || select === 'Select Message') {
            return
        } else {
            const formdata = { select }
            fetch('/admin/selectmessage', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`
                },
                body: JSON.stringify(formdata)
            }).then((result) => { return result.json() }).then((data) => {
                if (data.status === 200) {
                    setData(data.apidata)
                } else {
                    toast(data.message, { position: 'top-center', type: 'error' })
                }
            })
        }
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
                            <h2 className="text-center">Career Management Page</h2>
                            <div className="col-md-12">
                                <table className="table table-bordered text-center align-middle">
                                    <thead>
                                        <tr>
                                            <th>Total Message : {message}</th>
                                            <th>Total Unread Message : {unread}</th>
                                            <th>Total Read Message : {read}</th>
                                        </tr>
                                    </thead>
                                </table>
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <select className="form-select" value={select} onChange={(e) => { setSelect(e.target.value) }}>
                                        <option>Select Message</option>
                                        <option>unread</option>
                                        <option>read</option>
                                    </select>
                                    <button className="btn form-control my-2">Select</button>
                                </form>
                                <table className="table table-bordered text-center align-middle">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Number</th>
                                            <th>Experience</th>
                                            <th>Message</th>
                                            <th>Status</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((result, key) => (
                                            <tr key={result._id}>
                                                <td>{key + 1}</td>
                                                <td>{result.name}</td>
                                                <td>{result.email}</td>
                                                <td>{result.number}</td>
                                                <td>{result.experience}</td>
                                                <td>{result.message}</td>
                                                {result.status === 'unread' ?
                                                    <td><Link to={`/careerpage/${result._id}`}><button className="btn form-control">{result.status}</button></Link></td>
                                                    :
                                                    <td><button disabled className="btn form-control">{result.status}</button></td>
                                                }
                                                <td><button onClick={(e) => { handledelete(e, result._id) }} className="btn form-control">Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Careermanagement;