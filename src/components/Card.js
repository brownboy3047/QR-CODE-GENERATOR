import { useState } from "react";

const Card = () => {
  const [input, setInput] = useState("");
  const [qr, setQR] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState(null);

  const getQRCode = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${input}`
      );

      setIsLoading(false);
      setQR(res.url);
      //   setError(null);
    } catch (err) {
      setIsLoading(false);
      //   setError(err.message);
    }
  };

  return (
    <div className="card">
      <form className="form" onSubmit={getQRCode}>
        <h1 className="title">QR Code Generator</h1>

        <input
          type="text"
          className="form-input"
          placeholder="Enter Text or Link..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* {error && <div className="error">{error}</div>} */}

        {isLoading && (
          <div className="loading">
            <span></span> Loading...
          </div>
        )}

        {!isLoading &&
          (qr ? (
            <img className="qr-code" src={qr} alt="qr-code" />
          ) : (
            <div className="loading">Enter Text or Link above</div>
          ))}

        <button className="submit">Generate QR Code</button>

        {qr && (
          <a className="download" href={qr} target="_blank" rel="noreferrer">
            Click to download
          </a>
        )}
      </form>
    </div>
  );
};

export default Card;
