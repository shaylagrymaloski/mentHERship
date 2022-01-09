import "../App.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from '../logo-headtags.png';
import Confetti from 'react-confetti'
import Header from "../components/Header/index"


import {Client, AccountBalanceQuery, Hbar, TransferTransaction} from "@hashgraph/sdk"; 

const DonationPage = () => {
  const [accountId, setAccountId] = useState("");
  const [confettiOn, setConfetti] = useState(0);
  const [donationAmmount, setDonationAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");



  //user will give private public and account # from their hedera account. They then will be able to transfer money to donate
  async function onSubmit(){

    //get opperater id + private key and connect to hedera network
    const oppAccountId = process.env.REACT_APP_OPPERATOR_ACCOUNT_ID;
    const oppPrivateKey = process.env.REACT_APP_OPPERATOR_PRIVATE_KEY;
    const client = Client.forTestnet().setOperator(oppAccountId, oppPrivateKey);
    setErrorMessage("")

    //get current balance of account
    try{
      const getBalance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);
      const balance = getBalance.hbars.toTinybars()
      console.log("Current Account Balance = " + balance)
    
    //account id does not exist
    }catch(error){
      console.log("Invalid account id = " + accountId)
      setErrorMessage("Oops! The account you entered does not exist😭")
      return;
    }

    //Create the transfer transaction
    try{
      const sendHbar = await new TransferTransaction()
        .addHbarTransfer(oppAccountId, Hbar.fromTinybars(donationAmmount*-1))
        .addHbarTransfer(accountId, Hbar.fromTinybars(donationAmmount))
        .execute(client);

      const transactionReceipt = await sendHbar.getReceipt(client);
      setConfetti(1)
      setAccountId("")
      setDonationAmount("")
      setSuccessMessage("Thank you for your donation of " + donationAmmount + " tinybar!")
      console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());
      
    }catch(error){
      console.log("NOT ENOUGH FUNDS")
      setErrorMessage("Oops! Your Account Doens't Have Enough Funds🤭")
      return;
    }
  }

  return (
    <div className="container">
      <Header />
      <Form onSubmit={onSubmit}>
        <Form.Group size="lg" controlId="accountId">
          <h1>{ 'Donate!' }</h1>
          <h6>{ 'MentHERship relies on donations like yours to promote diversity in the STEM field.' }</h6>
          <h6 style={{ color: 'red' }}>{errorMessage}</h6>
          
          <Confetti opacity={confettiOn} width='1500' height='1000'/>
          <Form.Label class="registerText">Account ID</Form.Label>
          <Form.Control 
            autoFocus
            placeholder="Account ID"
            type="accountId"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="donationAmount">
          <Form.Label class="registerText">Donation Amount</Form.Label>
          <Form.Control
            type="donationAmount"
            placeholder="Donation Amount (tinybar)"
            value={donationAmmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </Form.Group>
        <Button className="submitButton" onClick ={onSubmit}>
          Donate
        </Button>
        <h3>{successMessage}</h3>
      </Form>
    </div>
  );
}

export default DonationPage;