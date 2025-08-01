import Dashboardlinks from "../components/Dashboardlinks";

function Dashboard() {
    return (
        <>
            <section id="dash">
                <div className="emptydiv"></div>
                <div className='container-fluid'>
                    <div className='row mt-4'>
                        <Dashboardlinks />
                        <div className='col-md-9 d-flex align-items-center justify-content-center'>
                            <h2>Dashboard Page For Administer</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Dashboard;