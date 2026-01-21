import "./styles.css"
function App() {
  return (
    <div className="noPayContainer">
      <div className="card">
        <h1>🔴 Website Unavailable</h1>

        <p className="bold">
          This website has been temporarily suspended due to non-payment.
        </p>

        <p>
          The owner of this domain has failed to settle the required service fees
          for website design, hosting, or maintenance.
        </p>

        <p>
          If you are the website owner and would like to restore access, please
          contact the developer or service provider immediately.
        </p>

        <p className="warning">
          This website will remain offline until all outstanding balances are
          cleared.
        </p>

        <a
          href="https://wa.me/2348141342103"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsappBtn"
        >
          💬 Contact Developer on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default App;
