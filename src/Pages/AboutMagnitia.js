const AboutMagnitia = () => {
    return (
        <>
            <section className="container py-4 py-md-5">
                {/* Welcome to Magnitia */}
                <div className="row align-items-center mb-4 mb-md-5 g-4">
                    <div className="col-md-6 order-md-1 order-2">
                        <h2 className="fw-bold text-uppercase mb-3 mb-md-4">
                            Welcome to <span className="text-success">Magnitia IT</span>
                        </h2>
                        <p className="text-muted">
                            Magnitia IT Solutions LLP was incorporated on May 2019, with offices at Hyderabad, Vijayawada & Bangalore.
                            The learning paradigm at Magnitia offers the best training and learning pursuit. We have a combined
                            real-time industry experience which spans 40 years, the institute offers guidance to the students and
                            mentors them to become a successful software professional.
                        </p>
                    </div>
                    <div className="col-md-6 order-md-2 order-1 text-center">
                        <img
                            src="https://www.magnitia.com/assets/images/about%20us.png"
                            alt="Welcome"
                            className="img-fluid rounded shadow-sm"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </div>
                </div>
            </section>
        </>

    )
}

export default AboutMagnitia;