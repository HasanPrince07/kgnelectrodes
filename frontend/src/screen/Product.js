import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Product() {

    const { id } = useParams()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        fetch(`/user/fetchproductbyid/${id}`).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setName(data.apidata.name)
                setDesc(data.apidata.desc)
                setImage(data.apidata.image)
                setStatus(data.apidata.status)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }, [id])

    return (
        <>
            <ToastContainer />
            <section id='productpage'>
                <div className='emptydiv'></div>
                <div className='container d-flex align-items-center'>
                    <div className='row bg-light'>
                        <div className='col-md-3 py-2 d-flex align-items-center'>
                            <img src={`/${image}`} alt='image not found' />
                        </div>
                        <div className='col-md-1'></div>
                        <div className='col-md-8 p-2'>
                            <h4>Product Name : {name}</h4>
                            <h4>Avaibility : {status}</h4>
                            <h4>Description :</h4>
                            <p>{desc}</p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Product;