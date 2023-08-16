import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';

const Contact = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [msgSuccess, setMsgSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          
        setMsgSuccess(true)
          
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
    <CenteredContainer>
      <StyledContactForm>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </StyledContactForm>
    </CenteredContainer>

    <Snackbar
            open={msgSuccess}
            autoHideDuration={3000} 
            onClose={() => setMsgSuccess(false)}
        >
            <SnackbarContent
                sx={{ backgroundColor: 'green' }} 
                message="Message successfully sent. Thanks!"
            />
        </Snackbar>
    </>
  );
};

export default Contact;

// Styles
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure the container takes up the full viewport height */
  margin-bottom: 2rem; /* Add margin at the bottom */

  @media (max-width: 768px) {
    padding: 0 1rem; /* Add horizontal padding for small screens */
  }
`;

const StyledContactForm = styled.div`
  width: 400px;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(173, 216, 230);
      color: white;
      border: none;
    }
  }
`;
