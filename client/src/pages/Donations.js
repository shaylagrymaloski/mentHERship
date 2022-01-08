import "../App.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const { Client, Hbar} = require("@hashgraph/sdk");
//require("react-dotenv").config();

//user will give private public and account # from their hedera account. They then will be able to transfer money to donate
function onSubmit(){
  var test = process.env.REACT_APP_OPPERATOR_ACCOUNT_ID
}


const DonationPage = () => {
  const [accountId, setAccountId] = useState("");
  const [donationAmmount, setDonationAmmount] = useState("");

  //check user actually submitted something
  function checkSubmission(){
    return accountId > 0 && donationAmmount > 0;
  }

  return (
    <div className="Donations">
      <Form onSubmit={onSubmit}>
        <Form.Group size="lg" controlId="accountId">
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
            onChange={(e) => setDonationAmmount(e.target.value)}
          />
        </Form.Group>
       
        <Button block size="lg" type="submit" disabled={!checkSubmission()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default DonationPage;