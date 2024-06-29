import styles from "./Process.module.css";

const Process = ({ text, show }) => {
  return (
    <div
    className={`mx-auto ${styles.root} ${
      show ? styles.show : styles.notShow
        }`}
        >
        <div class="spinner-border text-white" role="status">
          <span className="sr-only"></span>
        </div>
        <p className="text-white text-center">{text}</p>
      </div>
  );
};

export default Process;
