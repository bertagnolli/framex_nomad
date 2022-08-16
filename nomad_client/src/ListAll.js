import { useState } from "react";
import axios from "axios";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
  
  const ListAll = () => {
    const xKey = "psNWceCARceTHrNe";
    const [wallID, setWallID] = useState("");
    const [network, setNetwork] = useState("mainnet-beta");
  
    const [isLoaded, setLoaded] = useState(false);
    const [dataFetched, setDataFetched] = useState();
    const [firstSelection, setFirstSelection] = useState(true);
  
    const [connStatus, setConnStatus] = useState(false);

    const [selectedImg, setSelectedImg] = useState();
  
    const solanaConnect = async () => {
      console.log('clicked solana connect');
      const { solana } = window;
      if (!solana) {
        alert("Please Install Solana");
      }
  
      try {
        const phantom = new PhantomWalletAdapter();
        await phantom.connect();
        const rpcUrl = clusterApiUrl(network);
        const connection = new Connection(rpcUrl, "confirmed");
        const wallet = {
          address: phantom.publicKey.toString(),
        };
  
        if (wallet.address) {
          console.log(wallet.address);
          setWallID(wallet.address);
          const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address), "confirmed");
          console.log(accountInfo);
          setConnStatus(true);
        }
      }
      catch (err) {
        console.log(err);
      }
  
    }

    const validateSelection = () => {
      if (!firstSelection) {
        document.getElementById('buttonTest').innerText = 'Please, select the NFT to be displayed in Nomad below';
      } else {
        document.getElementById('buttonTest').innerText = 'Sync with Nomad';
      }
    }

    const syncWithNomad = () => {
      if (firstSelection) {
        // Call Python backend application
        var nftMetadata = selectedImg
        console.log(nftMetadata);

        const HOST = 'http://nomad_app.local' //'http://192.168.1.135:1243/nomad_app'
        const PORT = '1243'
        const ENDPOINT = `${HOST}:${PORT}/api/nomad_app`

        fetch(ENDPOINT, {

          // Declare what type of data we're sending
          headers: {
            'Content-Type': 'application/json'
          },

          // Specify the method
          method: 'post',

          // A JSON payload
          body: JSON.stringify({nftMetadata})
        })
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {

            console.log('POST response: ');

            // Should be 'OK' if everything was successful
            console.log(text);
        });

      } else {
        console.log("No selection made")
      }
    }
  
    const fetchNFTs = (e) => {
      e.preventDefault();
      let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${wallID}`;
      axios({
        // Endpoint to send files
        url: nftUrl,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
        // Attaching the form data
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res.data);
          setDataFetched(res.data);
          setLoaded(true);
        })
  
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
        });
    };

    return (
      <div className="grd-back">
  
        <div className="container-lg">
          <div className="py-4 text-center text-light">
            <h1>FrameX</h1>
            <p>
              Nomad NFT Frame
            </p>
          </div>
        </div>
  
        <div className="container-lg">
          {!connStatus && (<div className="card border border-light rounded py-3 px-5 w-50 bg-dark text-light mx-auto">
            <div className="card-body text-center">
              <h2 className="card-title p-2">Connect Your Wallet</h2>
              <p className="card-text p-1">Please connect to your wallet in order to view your NFTs</p>
              <button className="btn btn-light rounded-pill mt-5 px-3" onClick={solanaConnect}>Connect Phantom Wallet</button>
              {/* <select className="form-select" onChange={(e) => {
                console.log(e.target.value);
                (e.target.value === 'mtmsk') ? mtmskConnect() : solanaConnect();
              }}>
                <option value="none">Connect</option>
                <option value="phntm">Phantom</option>
              </select> */}
            </div>
          </div>)}
          {connStatus && (<div className="w-50 border border-light rounded-3 mx-auto bg-dark">
            <div className="form-container p-3">
              <form>
                <div className="row d-flex justify-content-center">
  
                  <div className="col-12 p-2">
                    <select
                      name="network"
                      className="form-control form-select"
                      id=""
                      onChange={(e) => setNetwork(e.target.value)}
                    >
                      <option value="mainnet-beta">Mainnet Beta</option>
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                    </select>
                  </div>
                  <div className="col-12 p-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Wallet Id"
                      value={wallID}
                    />
                  </div>
  
                </div>
                <div className="text-center p-3">
                  <button
                    className="button-24"
                    onClick={fetchNFTs}
                  >
                    Search for NFTs in wallet
                  </button>
                </div>
              </form>
            </div>
          </div>)}
        </div>

        {isLoaded && (
          <div className="text-center p-3">
            <button
              id="buttonTest"
              className="button-24"
              onClick={syncWithNomad}
            >
              Please, select the NFT to be displayed in Nomad below
            </button>
          </div>
        )}

  
        <div className="container-lg">
          <div className="cards-section py-4">
            <div className="row">
              {isLoaded &&
                dataFetched.result.map((item) => (
                  <div className="col-xs-12 col-sm-3 p-3" key={item.mint}>
                    <div 
                      className="card nft-card bg-dark"
                      style={{ border: selectedImg === item ? "4px solid lime" : "" }} 
                      onClick={() => {
                        setSelectedImg(item)
                        console.log(item.image_uri)
                        setFirstSelection(true)
                        validateSelection()
                        }
                      }
                    >
                      <div className="card-body">
                        <img 
                          className="card-image" 
                          src={item.image_uri} 
                          alt="img"
                           />
                          <a href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`} target="_blank" rel="noreferrer">
                            <h5>{item.name}</h5>
                          </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ListAll;