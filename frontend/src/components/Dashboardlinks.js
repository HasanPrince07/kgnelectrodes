import { Link } from "react-router-dom";

function Dashboardlinks() {

    function handlelogout(e) {
        window.localStorage.removeItem('token')
    }

    return (
        <>
            <div className='col-md-3 bg-light d-flex align-items-center'>
                <div>
                    <Link to='/mainimagemanagement'><button className="btn form-control my-1 commonbtn">Main Image Management</button></Link>
                    <Link to='/detailmanagement'><button className="btn form-control my-1 commonbtn">Detail Management</button></Link>
                    <Link to='/aboutmanagement'><button className="btn form-control my-1 commonbtn">About Management</button></Link>
                    <Link to='/testimanagement'><button className="btn form-control my-1 commonbtn">Testimonials Management</button></Link>
                    <Link to='/productmanagement'><button className="btn form-control my-1 commonbtn">Products Management</button></Link>
                    <Link to='/querymanagement'><button className="btn form-control my-1 commonbtn">Query Management</button></Link>
                    <Link to='/footermanagement'><button className="btn form-control my-1 commonbtn">Footer Management</button></Link>
                    <Link to='/careermanagement'><button className="btn form-control my-1 commonbtn">Career Management</button></Link>
                    <Link to='/login'><button onClick={(e) => { handlelogout(e) }} className="btn form-control my-1 commonbtn">Logout</button></Link>
                </div>
            </div>
        </>
    );
}

export default Dashboardlinks;