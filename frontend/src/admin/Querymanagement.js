import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Dashboardlinks from "../components/Dashboardlinks";

function Querymanagement() {

    const [data, setData] = useState([])
    const [totalquery, setTotalquery] = useState(0)
    const [totalunread, setTotalunread] = useState(0)
    const [totalread, setTotalread] = useState(0)

    const [query, setQuery] = useState(0)

    useEffect(() => {
        recall()
    }, [])

    function recall() {
        fetch('/admin/fetchquery', {
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setData(data.apidata)
                setTotalquery(data.totalquery)
                setTotalunread(data.totalunread)
                setTotalread(data.totalread)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    function handledelete(e, id) {
        fetch(`/admin/querydelete/${id}`, {
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
        if (query === 0 || query === 'Select Query') {
            return
        } else {
            const formdata = { query }
            fetch('/admin/selectquery', {
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
                            <h2 className="text-center">Query Management Page</h2>
                            <div className="col-md-12">
                                <table className="table table-bordered text-center align-middle">
                                    <thead>
                                        <tr>
                                            <th>Total Query : {totalquery}</th>
                                            <th>Total Unread : {totalunread}</th>
                                            <th>Total Read : {totalread}</th>
                                        </tr>
                                    </thead>
                                </table>
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <select className="form-select" value={query} onChange={(e) => { setQuery(e.target.value) }}>
                                        <option>Select Query</option>
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
                                            <th>Query</th>
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
                                                <td>{result.query}</td>
                                                {result.status === 'unread' ?
                                                    <td><Link to={`/querypage/${result._id}`}><button className="btn form-control">{result.status}</button></Link></td>
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

export default Querymanagement;