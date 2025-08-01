import { useEffect, useState } from "react";
import Dashboardlinks from "../components/Dashboardlinks";
import { ToastContainer, toast } from 'react-toastify'

function Aboutmanagement() {

    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')
    const [hdesc, setHdesc] = useState('')
    const [himage, setHimage] = useState('')
    const [tdesc, setTdesc] = useState('')
    const [timage1, setTimage1] = useState('')
    const [timage2, setTimage2] = useState('')
    const [timage3, setTimage3] = useState('')

    useEffect(() => {
        recall()
    }, [])

    function recall() {
        fetch('/admin/fetchabout').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setDesc(data.apidata.desc)
                setImage(data.apidata.image)
                setHdesc(data.apidata.hdesc)
                setHimage(data.apidata.himage)
                setTdesc(data.apidata.tdesc)
                setTimage1(data.apidata.timage1)
                setTimage2(data.apidata.timage2)
                setTimage3(data.apidata.timage3)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }

    function handleform(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('desc', desc)
        formdata.append('image', image)
        formdata.append('hdesc', hdesc)
        formdata.append('himage', himage)
        formdata.append('tdesc', tdesc)
        formdata.append('timage1', timage1)
        formdata.append('timage2', timage2)
        formdata.append('timage3', timage3)
        fetch('/admin/updateabout', {
            method: 'PUT',
            headers: { authorization: `Bearer ${JSON.parse(window.localStorage.getItem('token'))}` },
            body: formdata
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
                            <h2 className="text-center">About Management Page</h2>
                            <div className="col-md-12">
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <label className="pb-1 pt-2">Description</label>
                                    <input onChange={(e) => { setDesc(e.target.value) }} value={desc} required type='text' className='form-control' />
                                    <label className="pb-1 pt-2">Image</label><img className="img-fluid p-2" src={image} alt='image not found' />
                                    <input onChange={(e) => { setImage(e.target.files[0]) }} required type='file' className='form-control' />
                                    <label className="pb-1 pt-2">History Description</label>
                                    <input onChange={(e) => { setHdesc(e.target.value) }} value={hdesc} required type='text' className='form-control' />
                                    <label className="pb-1 pt-2">History Image</label><img className="img-fluid p-2" src={himage} alt='image not found' />
                                    <input onChange={(e) => { setHimage(e.target.files[0]) }} required type='file' className='form-control' />
                                    <label className="pb-1 pt-2">Team Description</label>
                                    <input onChange={(e) => { setTdesc(e.target.value) }} value={tdesc} required type='text' className='form-control' />
                                    <label className="pb-1 pt-2">Team Image 1</label><img className="img-fluid p-2" src={timage1} alt='image not found' />
                                    <input onChange={(e) => { setTimage1(e.target.files[0]) }} required type='file' className='form-control' />
                                    <label className="pb-1 pt-2">Team Image 2</label><img className="img-fluid p-2" src={timage2} alt='image not found' />
                                    <input onChange={(e) => { setTimage2(e.target.files[0]) }} required type='file' className='form-control' />
                                    <label className="pb-1 pt-2">Team Image 3</label><img className="img-fluid p-2" src={timage3} alt='image not found' />
                                    <input onChange={(e) => { setTimage3(e.target.files[0]) }} required type='file' className='form-control' />
                                    <button className="btn form-control mt-2">Update About</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Aboutmanagement;