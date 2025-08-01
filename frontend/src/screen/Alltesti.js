import { useEffect, useState } from "react"

function Alltesti() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/user/fetchtesti').then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setData(data.apidata)
            } else {
                toast(data.message, { position: 'top-center', type: 'error' })
            }
        })
    }, [])

    return (
        <>
            <section id="alltestipage">
                <div className="emptydiv"></div>
                <div className="container mt-4">
                    {data.map((result, key) => (
                        <div className="row my-4 bg-light" key={result._id}>
                            <div className="col-md-1 border border-1 d-flex justify-content-center align-items-center">
                                <h4>{key + 1}</h4>
                            </div>
                            <div className="col-md-11">
                                <h5 className="bg-dark text-white text-center py-1">{result.name}</h5>
                                <p>{result.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Alltesti;