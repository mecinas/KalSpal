export default function BenefitCard({ header, title, text }) {

    return (
        <div className="card text-white bg-info mb-3 mx-3" style={{ "max-width": "18rem" }}>
            <div className="card-header">{header}</div>
            <div className="card-body">
                <h5 className="card-title mx-2">{title}</h5>
                <p className="card-text mx-3">{text}</p>
            </div>
        </div>
    )
}