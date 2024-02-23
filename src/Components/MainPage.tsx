// Home.tsx
import React, { useState } from "react";
import { sendFile } from "../http-common";
import "./css/main-page.css";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.name.endsWith(".docx")) {
        setFile(selectedFile);
      } else {
        setFile(null);
        event.target.value = "";
        alert("Please select a .docx file.");
      }
    }
  };

  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !file) {
      alert("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      alert("Enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      await sendFile(file, email);
      alert("The file has been successfully uploaded.");
    }
    catch (error) {
      alert("An error occurred while uploading the file. Try again later.");
      console.error(error);
    }
    
    setEmail("");
    setFile(null);
    fileInputRef.current!.value = "";
    setIsLoading(false);
  };

  return (
    <div className="mt-5 container">
      <div className="rounded-4 shadow">
        <div className="p-5 pb-4 border-bottom-0">
          <h1 className="fw-bold mb-0 fs-2">Fill out the form</h1>
        </div>
        <div className="p-5 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-3"
                id="floatingInput"
                placeholder="name@example.com"
                required
                value={email}
                onChange={handleEmailChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label text-center">
                File (.docx)
              </label>
              <input
                ref={fileInputRef}
                className="form-control"
                type="file"
                id="formFile"
                required
                accept=".docx"
                onChange={handleFileChange}
              />
            </div>
            <button
              className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="ms-2">Submitting...</span>
                </>
              ) : (
                <>Submit</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
