import React, { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const provider = new ethers.BrowserProvider(window.ethereum);
  
  const ConnectMetamask = async () => {
    console.log(`Button 1 clicked with value: ${input1}`);
    if(provider==null)throw Error(`Provider is null`);
    
    else {
      const chainId = await provider.getNetwork();
       console.log(`chainid: ${chainId}`)
     
       console.log(`Provider is not null`);
     const accounts = await provider.send("eth_requestAccounts", []);
     const account = accounts[0];
     
     if(accounts.length === 0) {
      throw Error('未登录任何账户');
    }
     else {
      console.log(`钱包地址: ${account}`);
     const signer = await provider.getSigner();
     const balance = await provider.getBalance(signer.getAddress());
     console.log(`以太坊余额： ${ethers.formatUnits(balance)}`);
     }}
    
  }
  const TransferButton = async() => {
    const signer = await provider.getSigner();
    const tx = {
      to: input2,
      value: ethers.parseEther(input1),
    }
    console.log('开始转账');
    const receipt = await signer.sendTransaction(tx);
    await receipt.wait();
    console.log('完成转账');
    
  };

  return (
    <div className="App">
      <img src='./logo192.png' className="App-logo" alt="logo" />
      <br></br>
      <button onClick={ConnectMetamask}>Connect MetaMask</button>
      <div>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter Value in ETH"
        />
      </div>
      <div>
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Enter Receiver Address"
        />
      </div>{' '}
      <button onClick={TransferButton}>Transfer</button>
    </div>
  );
}



export default App;
