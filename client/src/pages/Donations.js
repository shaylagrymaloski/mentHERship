import "../App.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from '../logo-headtags.png';
import Confetti from 'react-confetti'


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
    const getBalance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(client);
    const balance = getBalance.hbars.toTinybars()
    console.log("Current Account Blance = " + balance)

    //Create the transfer transaction
    try{
      const sendHbar = await new TransferTransaction()
        .addHbarTransfer(oppAccountId, Hbar.fromTinybars(donationAmmount*-1))
        .addHbarTransfer(accountId, Hbar.fromTinybars(donationAmmount))
        .execute(client);

      //Verify the transaction reached consensus
      const transactionReceipt = await sendHbar.getReceipt(client);
      setConfetti(1)
      setAccountId("")
      setDonationAmount("")
      setSuccessMessage("Thank you for your donation of " + donationAmmount + "Hbar!")
      console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());
      
    }catch(error){
      console.log("NOT ENOUGH FUNDS")
      setErrorMessage("Oops! Your Account Doens't Have Enough Funds🤭")
      return;
    }
  }

  return (
    <div className="Donations">
      <Form onSubmit={onSubmit}>
        <Form.Group size="lg" controlId="accountId">
          <h1>{ 'Donate!' }</h1>
          <h6>{ 'MentHERship relies on donations like yours to promote women helping women.' }</h6>
          <h6 style={{ color: 'red' }}>{errorMessage}</h6>
          
          <Confetti opacity={confettiOn} width='1500' height='1000'/>
          <Form.Label>Account Id</Form.Label>
          <Form.Control
            autoFocus
            type="accountId"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="donationAmount">
          <Form.Label>Donation Amount</Form.Label>
          <Form.Control
            type="donationAmount"
            value={donationAmmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </Form.Group>
        <Button onClick ={onSubmit}>
          Donate
        </Button>
        <h3>{successMessage}</h3>
      </Form>
    </div>
  );
}

export default DonationPage;