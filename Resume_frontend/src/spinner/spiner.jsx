import "./Spinner.css";

function Spinner({ message }) {
    return (
        <div className="spinner-container">

            <div className="spinner"></div>

            <p>{message}</p>

        </div>
    );
}

export default Spinner;