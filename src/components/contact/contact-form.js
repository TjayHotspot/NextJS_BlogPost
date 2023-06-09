import React, { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

function ContactForm() {
  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();
  const [requestStatus, setRequestStatus] = useState(); //pending, success, or error
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  async function sendContactData(contactDetails) {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setRequestStatus("error");
      setRequestError(data.message);
      throw new Error(data.message || "Something went wrong");
    }
  }

  async function contactFormHandler(event) {
    setRequestStatus("pending");
    event.preventDefault();
    const reqBody = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      message: messageRef.current.value,
    };

    try {
      await sendContactData(reqBody);
    } catch (error) {
      setRequestStatus("error");
      setRequestError(error);
      throw new Error(error || "Something went wrong");
    }
    setRequestStatus("success");
    emailRef.current.value = "";
    nameRef.current.value = "";
    messageRef.current.value = "";
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "sending message..",
      message: "your message is on its way!",
    };
  }
  if (requestStatus == "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "message sent succesfully",
    };
  }
  if (requestStatus == "error") {
    notification = {
      status: "error",
      title: "Message failed",
      message: requestError,
    };
  }
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={contactFormHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" required ref={nameRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows="5" ref={messageRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
