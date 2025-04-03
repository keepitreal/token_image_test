import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [contractAddresses, setContractAddresses] = useState([
    "0x1bc0c42215582d5a085795f4badbac3ff36d1bcb", // Clanker
    "0x52b492a33E447Cdb854c7FC19F1e57E8BfA1777D", // Based Pepe
    "0x6921b130d297cc43754afba22e5eac0fbf8db75b", // Doginme
    "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
  ]);
  const [inputValue, setInputValue] = useState("");
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState("");
  const [isCropped, setIsCropped] = useState(false);

  const fetchImages = async (addresses) => {
    try {
      const response = await fetch("/rpc/v2/assets/getAssetsDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          networkId: "networks/base-mainnet",
          contractAddresses: addresses,
          nativeAssetSymbols: ["ETH"],
          chainId: "8453",
        }),
      });

      const data = await response.json();
      if (data.result && data.result.assets) {
        setAssets(data.result.assets);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch images. Please try again.");
      console.error("Error:", err);
    }
  };

  // Fetch images for default addresses on mount
  useEffect(() => {
    fetchImages(contractAddresses);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddContract = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newAddresses = [...contractAddresses, inputValue.trim()];
    setContractAddresses(newAddresses);
    setInputValue("");
    fetchImages(newAddresses);
  };

  const handleRemoveContract = (indexToRemove) => {
    const newAddresses = contractAddresses.filter(
      (_, index) => index !== indexToRemove
    );
    setContractAddresses(newAddresses);
    fetchImages(newAddresses);
  };

  /**
   * Clanker: 0x1bc0c42215582d5a085795f4badbac3ff36d1bcb
   * Based Pepe: 0x52b492a33E447Cdb854c7FC19F1e57E8BfA1777D
   * Doginme: 0x6921b130d297cc43754afba22e5eac0fbf8db75b
   * USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
   */

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contract Image Grid</h1>
      </header>

      <div className="container">
        <div className="controls">
          <form onSubmit={handleAddContract} className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter contract address"
              className="address-input"
            />
            <button type="submit" className="add-button">
              Add Contract
            </button>
          </form>

          <div className="toggle-container">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={isCropped}
                onChange={(e) => setIsCropped(e.target.checked)}
              />
              <span>Cropped</span>
            </label>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="grid-container">
          {assets.map((asset, index) => (
            <div key={index} className="grid-item-container">
              <div
                className="image-container"
                style={{
                  backgroundColor: asset.color,
                }}
              >
                <img
                  src={asset.imageUrl}
                  alt={`${asset.name} (${asset.symbol})`}
                  className={`grid-item ${isCropped ? "cropped" : ""}`}
                />
              </div>
              <div className="token-info">
                <div className="token-name">{asset.name}</div>
                <div className="token-symbol">{asset.symbol}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="addresses-list">
          <h3>Current Contract Addresses:</h3>
          <ul>
            {contractAddresses.map((address, index) => (
              <li key={index}>
                {address}
                <button
                  className="remove-button"
                  onClick={() => handleRemoveContract(index)}
                  title="Remove contract"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
