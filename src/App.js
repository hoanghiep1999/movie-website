import { useEffect, useState, useRef } from "react";
import "./App.css";
import Loading from './components/Loading/Loading';

import { create } from "ipfs-http-client";
import { ethers } from "ethers";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { data } from "./HeroFi";
import { address, sex, generation, heroClass, star } from "./constants";

function App() {
  const [addressAccount, setAddressAccount] = useState("");
  const [allHeroes, setAllHeroes] = useState([]);
  const [dataInput, setDataInput] = useState({
    avatar: "",
    heroClass: "0",
    sex: "0",
    generation: "0",
    star: "0"
  });

  /* Mobile Detail Modal */
  const [modalData, setModalData] = useState({
    heroClass: "",
    sex: "",
    generation: "",
    star: ""
  });

  const [contract, setContract] = useState(null);
  const [transferAccount, setTransferAccount] = useState("");
  const [transferData, setTransferData] = useState({});

  /* Loading */
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [disabled, setDisabled] = useState(true);

  /* Input ref */
  const inputRef = useRef();

  /* Create ipfs Image */
  const client = create("https://ipfs.infura.io:5001/api/v0");

  async function onChangeImage(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setDataInput({
        ...dataInput,
        avatar: url,
      });
    } catch (error) {
      toast(`Error uploading file: ${error} !`);
    }
  }

  /* Connect MetaMask */
  const connectMetaMask = async () => {
    try {
      //Will Start the metamask extension
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractRes = new ethers.Contract(address, data.abi, signer);
      await setContract(contractRes);
      const account = await signer.getAddress();
      setAddressAccount(account);
    } catch (error) {
      throw error;
    }
  };

  /* Get All Heroes method */
  const getAllHeroes = async () => {
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractRes = new ethers.Contract(address, data.abi, signer);
      const heroRes = await contractRes.getAllHeroes();
      const heroResExecuted = heroRes.map(item => Object.assign({}, item));
      setAllHeroes([...heroResExecuted]);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  /* Get All Heroes Account method */
  const getAllHeroesAccount = async () => {
    try {
      setLoading(true);
      const heroAccountRes = await contract.getHeroesOfAccount();
      setAllHeroes([...heroAccountRes]);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  /* Create Hero method */
  const createHero = async (e) => {
    e.preventDefault();
    try {
      const { avatar, heroClass, sex, generation, star } = dataInput;
      if(avatar === "")
        toast("Please select an image !");
      else {
        const res = await contract.createHero(avatar, heroClass, sex, generation, star);
        const { status } = await res.wait();
        if(status === 1) {
          getAllHeroesAccount();
        }
        else {
          toast("Failed to create hero !");
        }
      }
    } catch (error) {
      toast("Failed to create hero !");
      throw error;
    }
  };

  /* Transfer Hero method */
  const transferHero = async (e) => {
    e.preventDefault();
    if(addressAccount === "")
      toast("Please connect your MetaMask !");
    else {
      if(transferAccount === "") 
        toast("Please input an transfer MetaMask account !");
      else {
        try {
          /* 0x46431225342257388cA3FD6248C0db14D055bb4c */
          const res = await contract.transferHero(addressAccount, transferAccount, transferData.id._hex);
          console.log("Transfer");
          const { status } = await res.wait();
          if(status === 1) {
            toast("Succesfull transfer !");
            setTransferAccount("");
            setToggle(false);
            getAllHeroesAccount();
          }
          else {
            toast("Failed to transfer !");
          }
        } catch (error) {
          toast("Failed to transfer !");
          throw error;
        }
      }
    }
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      getAllHeroes();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={5000} pauseOnHover={false} />
      <form className="form">
        <div className="form-group">
          <label htmlFor="avatar">Avatar:</label>
          <input type="file" id="avatar" onChange={onChangeImage} />
        </div>
        <div className="form-group">
          <label htmlFor="class">Class:</label>
          <select id="class" onChange={(e) => setDataInput({ ...dataInput, heroClass: e.target.value })}>
            {heroClass.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sex">Sex:</label>
          <select id="sex" onChange={(e) => setDataInput({ ...dataInput, sex: e.target.value })}>
            {sex.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="generation">Generation:</label>
          <select id="generation" onChange={(e) => setDataInput({ ...dataInput, generation: e.target.value })}>
            {generation.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="star">Star:</label>
          <select id="star" onChange={(e) => setDataInput({ ...dataInput, star: e.target.value })}>
            {star.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="btn btn--createheroes" onClick={createHero} disabled={disabled}>Create Hero</button>
      </form>

      <div className="container">
        <div className="container-top">
          <div>
            {/* Get All Heroes */}
            <button className="btn" onClick={getAllHeroes}>All Heroes</button>
            {/* Get All Heroes Of Account */}
            <button className="btn btn--myheroes" onClick={getAllHeroesAccount} disabled={disabled}>My Heroes</button>
          </div>
          {addressAccount.length === 0 ? (
            <a href="/#" onClick={(event) => {
              connectMetaMask(event);
              setDisabled(!disabled);
            }}>Connect MetaMask</a>
          ) : (
            <div className="container-top-address">{`Address: ${addressAccount}`}</div>
          )}
        </div>
        <div className="container-bottom">
          <ul className="container-list">
            {loading ? <Loading />
            : (allHeroes.length === 0 ? "No Heroes" 
            : (allHeroes.map((item, index) => {
                return (
                  <li className="container-item" key={index}>
                    <img src={item.avatar} alt={`img ${index + 1}`} />
                    <div className="container-item-data">
                      <span>Class:
                        <span>{heroClass.find((item2) => item2.value === item.class).label}</span>
                      </span>
                      <span>Sex:
                        <span>{sex.find((item2) => item2.value === item.sex).label}</span>
                      </span>
                      <span>Generation:
                        <span>{generation.find((item2) => item2.value === item.generation).label}</span>
                      </span>
                      <span>Star:
                        <span>{star.find((item2) => item2.value === item.star).label}</span>
                      </span>
                    </div>
                    <button onClick={() => {
                      setToggle2(true);
                      setModalData({
                        ...modalData,
                        heroClass: heroClass.find((item2) => item2.value === item.class).label,
                        sex: sex.find((item2) => item2.value === item.sex).label,
                        generation: generation.find((item2) => item2.value === item.generation).label,
                        star: star.find((item2) => item2.value === item.star).label
                      })
                    }} className="btn--details">Details</button>
                    <button onClick={() => {
                      inputRef.current.focus();
                      setToggle(!toggle);
                      setTransferData(item);
                    }}>Transfer</button>
                  </li>
                );
              })
            ))}
          </ul>
        </div>
      </div>

      {/* Transfer Modal */}
      <div className={toggle ? "transfer-modal active" : "transfer-modal"}>
        <div className="transfer-modal-overlay" onClick={() => {setToggle(false)}}></div>
        <div className="transfer">
          <form className="transfer-form">
            <i className="fa-solid fa-xmark transfer-form-icon" onClick={(e) => {
              e.preventDefault();
              setToggle(!toggle);
            }}></i>
            <input type="text" placeholder="Nhap dia chi vi..." ref={inputRef} value={transferAccount} onChange={(e) => setTransferAccount(e.target.value)}/>
            <div className="transfer-button-wrap">
              <button
                type="submit"
                className="transfer-button transfer-button--transfer"
                onClick={(e) => transferHero(e)}
              >
                Transfer
              </button>
              <button type="reset" className="transfer-button transfer-button--cancel" onClick={() => inputRef.current.focus()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Detail Modal */}
      <div className={toggle2 ? "detail-modal active" : "detail-modal"}>
        <div className="detail-modal-overlay" onClick={() => {setToggle2(false)}}></div>
        <div className="detail-modal-container">
          <i className="fa-solid fa-xmark detail-modal-icon" onClick={() => setToggle2(false)}></i>
          <div className="detail-modal-data">
            <span>Class:
              <span>{modalData.heroClass}</span>
            </span>
            <span>Sex:
              <span>{modalData.sex}</span>
            </span>
            <span>Generation:
              <span>{modalData.generation}</span>
            </span>
            <span>Star:
              <span>{modalData.star}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
