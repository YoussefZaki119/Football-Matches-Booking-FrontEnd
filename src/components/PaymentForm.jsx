import React from "react";
import FormWrapper from "./FormWrapper";
import CreditCardForm from "./CreditCardForm";
import { loginusername } from "./Login";
import { iWillBook } from "./Reservation";
import { useParams } from "react-router-dom";

function PaymentForm() {
    const {id}=useParams();
    return (
        <div className="creditcardcontainer">
            <div className="creditcardform">
                <FormWrapper ID={id} >
                    <CreditCardForm />
                </FormWrapper>
            </div>
        </div>
    );
}

export default PaymentForm;