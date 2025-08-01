import { useEffect, useState } from "react";
import Dashboardlinks from "../components/Dashboardlinks";
import { ToastContainer, toast } from 'react-toastify'

function Detailmanagement() {

    const [firstp, setFirstp] = useState('')
    const [secondp, setSecondp] = useState('')
    const [thirdp, setThirdp] = useState('')
    const [fourthp, setFourthp] = useState('')

    useEffect(() => {
        recall()
    }, [])

    function recall() {
        fetch('/admin/fetchdetail').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setFirstp(data.apidata.firstp)
                setSecondp(data.apidata.secondp)
                setThirdp(data.apidata.thirdp)
                setFourthp(data.apidata.fourthp)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    function handleform(e) {
        e.preventDefault()
        const formdata = { firstp, secondp, thirdp, fourthp }
        fetch('/admin/updatedetailmanagement', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`
            },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                recall()
                toast('Succesfully Updated', { position: 'top-center', type: 'success' })
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
                            <h2 className="text-center">Detail Management Page</h2>
                            <div className="col-md-12">
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <label className="pb-1 pt-2">First Point</label>
                                    <input value={firstp} onChange={(e) => { setFirstp(e.target.value) }} required type='text' className='form-control' />
                                    <label className="pb-1 pt-2">Second Point</label>
                                    <input value={secondp} onChange={(e) => { setSecondp(e.target.value) }} required type='text' className='form-control' />
                                    <label className="pb-1 pt-2">Third Point</label>
                                    <input value={thirdp} onChange={(e) => { setThirdp(e.target.value) }} required type='text' className='form-control' />
                                    <label className="pb-1 pt-2">Fourth Point</label>
                                    <input value={fourthp} onChange={(e) => { setFourthp(e.target.value) }} required type='text' className='form-control' />
                                    <button className="btn form-control mt-2">Update Detail</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Detailmanagement;