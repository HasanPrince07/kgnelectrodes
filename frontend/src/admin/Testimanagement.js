import { useEffect, useState } from "react";
import Dashboardlinks from "../components/Dashboardlinks";
import { ToastContainer, toast } from 'react-toastify'

function Testimanagement() {

    const [data, setData] = useState([])
    const [review, setReview] = useState(0)
    const [publish, setPublish] = useState(0)
    const [unpublish, setUnpublish] = useState(0)

    useEffect(() => {
        recall()
    }, [])

    function recall() {
        fetch('/admin/fetchtesti', {
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setData(data.apidata)
                setReview(data.reviewrecord)
                setPublish(data.publishrecord)
                setUnpublish(data.unpublishrecord)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    function handlestatus(e, id) {
        fetch(`/admin/testistatus/${id}`, {
            method: 'PUT',
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                recall()
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    function handledelete(e, id) {
        fetch(`/admin/testidelete/${id}`, {
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

    return (
        <>
            <ToastContainer />
            <section id="mainimagemanagement">
                <div className="emptydiv"></div>
                <div className='container-fluid'>
                    <div className='row mt-4'>
                        <Dashboardlinks />
                        <div className='col-md-9'>
                            <h2 className="text-center">Testimonials Management Page</h2>
                            <div className="col-md-12">
                                <table className="table table-bordered text-center align-middle">
                                    <thead>
                                        <tr>
                                            <th>Total Review : {review}</th>
                                            <th>Total Publish : {publish}</th>
                                            <th>Total Unpublish : {unpublish}</th>
                                        </tr>
                                    </thead>
                                </table>
                                <table className="table table-bordered text-center align-middle">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((result, key) => (
                                            <tr key={result._id}>
                                                <td>{key + 1}</td>
                                                <td>{result.name}</td>
                                                <td>{result.desc}</td>
                                                <td><button onClick={(e) => { handlestatus(e, result._id) }} className="btn form-control">{result.status}</button></td>
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

export default Testimanagement;