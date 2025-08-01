import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Dashboardlinks from "../components/Dashboardlinks";

function Productmanagement() {

    const [data, setData] = useState([])
    const [totalproduct, setTotalproduct] = useState(0)
    const [totalinstock, setTotalinstock] = useState(0)
    const [totaloutofstock, setTotaloutofstock] = useState(0)

    useEffect(() => {
        recall()
    }, [])

    function recall() {
        fetch('/admin/fetchproduct', {
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setData(data.apidata)
                setTotalproduct(data.totalproduct)
                setTotalinstock(data.totalinstock)
                setTotaloutofstock(data.totaloutofstock)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    function handlestatus(e, id) {
        fetch(`/admin/productstatus/${id}`, {
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
        fetch(`/admin/productdelete/${id}`, {
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
                            <h2 className="text-center">Product Management Page</h2>
                            <div className="col-md-12">
                                <Link to='/productpage'><button className="btn form-control mb-2">Add New Product</button></Link>
                                <table className="table table-bordered text-center align-middle">
                                    <thead>
                                        <tr>
                                            <th>Total Products : {totalproduct}</th>
                                            <th>Total In Stock : {totalinstock}</th>
                                            <th>Total Out Of Stock : {totaloutofstock}</th>
                                        </tr>
                                    </thead>
                                </table>
                                <table className="table table-bordered text-center align-middle">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Image</th>
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
                                                <td><img className="img-fluid tableimg" src={result.image} alt='image not found' /></td>
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

export default Productmanagement;