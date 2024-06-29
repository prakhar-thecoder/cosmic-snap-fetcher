import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { get, post } from "../../utils/RequestUtils";
import Process from "../Process/Process";
import { FailAlert, SuccessAlert } from "../CustomAlerts/CustomAlerts";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailData, setEmailData] = useState({});

  const fetchData = async () => {
    setLoading(true);

    const response = await get("/get-apod-data");
    console.log(response);

    setData(response);
    // setData({
    //   data: {
    //     image_url:
    //       "https://apod.nasa.gov/apod/image/2405/Cederblad111-110.jpg",
    //   },
    // });
    setLoading(false);
  };

  const sendEmail = async () => {
    setEmailLoading(true);
    const response = await post("/email-once", { email: email });
    console.log(response);
    setEmailData(response);
    setEmailLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`container-fluid ${styles.root}`}>
      <h1 className={`text-center text-white ${styles.heading}`}>
        Cosmic Snap Fetcher
      </h1>
      <p className="mx-auto text-white text-center" id="tag-line">
        Effortlessly delivering stunning daily space images straight from NASA's
        APOD to you
      </p>

      <Process text={"Loading today's APOD"} show={loading} />

      {!loading && (
        <div className={`container ${styles.result}`}>
          <h2 className="text-white text-center">Today's APOD</h2>
          {data.data.image_url.includes("embed") ? (
            <iframe
              title="Video APOD"
              src={data.data.image_url}
              frameborder="0"
              allowfullscreen
            ></iframe>
          ) : (
            <img src={data.data.image_url} alt="Toady's APOD" />
          )}
          <p className={`text-white mx-auto`}>APOD: {data.data.date}</p>
          <span className="text-white">
            <strong>
              <u>Title:</u>{" "}
            </strong>
            {data.data.title}
          </span>
          <span className="text-white">
            <strong>
              <u>Explanation:</u>{" "}
            </strong>
            {data.data.explanation}
          </span>
        </div>
      )}
      <div className={`${styles.getApod}`}>
        <h2 className="text-white text-center">
          Get APOD straight to your mailbox!
        </h2>
        <Process text={"Sending Email! Please wait..."} show={emailLoading} />

        {emailData.status &&
          (emailData.status === "success" ? (
            <SuccessAlert
              text={"Email sent Successfully! Please check spam too."}
            />
          ) : (
            <FailAlert
              text={`${emailData.error} Please note that this tool doesn't currently support sending video APODs.`}
            />
          ))}

        <div className={`container ${styles.email}`}>
          <i class={`bi bi-envelope-fill ${styles.emailIcon}`}></i>
          <input
            type="email"
            name="email"
            placeholder="Enter your email!"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <button
          className={`btn my-2 ${styles.mailBtn}`}
          onClick={() => {
            sendEmail();
          }}
          disabled={emailLoading}
        >
          Send <i class="bi bi-rocket-takeoff-fill"></i>
        </button>
      </div>
    </div>
  );
}
