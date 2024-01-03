import React from "react";
import FormWrapper from "./FormWrapper";
import CreditCardForm from "./CreditCardForm";
import { loginusername } from "./Login";
import { iWillBook1 } from "./Reservation";
import { useParams } from "react-router-dom";

function PaymentForm() {
    const {id,usename}=useParams();
    return (
        <div className="creditcardcontainer">
            <div className="creditcardform">
                <FormWrapper ID={id} USERNAME={usename} >
                    <CreditCardForm />
                    <h1>Your Total {iWillBook1.length*100} EGP</h1>
                </FormWrapper>
            </div>
        </div>
    );
}

export default PaymentForm;