import React from "react";
import { Box, Button } from "@material-ui/core";
import { FormContext, useForm } from "react-hook-form";
import { iWillBook } from "./Reservation";
import { Link } from "react-router-dom";

let itWillbeReseved =[];
const FormWrapper = ({ children }) => {
    const useHookForm = useForm({
        mode: "onBlur"
    });
    const onFormSubmit = data => {
        console.log(data);
    };
    const goTo = () => {
        console.log("iWillBook");
        console.log(iWillBook);
       
        itWillbeReseved = iWillBook.map(member => member.id);

        console.log("itWillbeReserved");
       
    };
    return (
        <FormContext {...useHookForm}>
            <form noValidate onSubmit={useHookForm.handleSubmit(onFormSubmit)}>
                {children}
                <Box display="flex" justifyContent="center" mt={3}>
                    <Button type="submit" variant="contained" color="primary" onClick={goTo}>
                    <Link to="../reservation">Submit</Link>
                    </Button>
                </Box>
            </form>
        </FormContext>
    );
};
export {itWillbeReseved};
export default FormWrapper;
