import { useState } from "react";
import styles from "./CustomAlerts.module.css";

export const SuccessAlert = ({ text }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <>
        <div
          class={`alert alert-success alert-dismissible fade show my-0 ${styles.customAlert}`}
          role="alert"
        >
          {text}
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => {setShow(false)}}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      <br />
      </>
      )}
    </>
  );
};

export const FailAlert = ({ text }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <>
          <div
            class={`alert alert-danger alert-dismissible fade show my-0 ${styles.customAlert}`}
            role="alert"
          >
            {text}
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                setShow(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <br />
        </>
      )}
    </>
  );
};
