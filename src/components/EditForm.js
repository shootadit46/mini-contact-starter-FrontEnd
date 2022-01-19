import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditForm = () => {
  const [getFullName, setFullName] = useState("");
  const [getPhone, setPhone] = useState("");
  const [getNote, setNote] = useState("");

  const { id } = useParams();
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3001/api/contacts/${id}`,
    }).then((results) => {
      const fullname = results.data.payload[0].fullname;
      const phone = results.data.payload[0].phone;
      const note = results.data.payload[0].note;
      // const id = results.data.payload[0].id;

      setFullName(fullname);
      setPhone(phone);
      setNote(note);
    });
  }, [id]);

  const inputHandlerFullName = (fullname) => {
    return setFullName(fullname);
  };

  const inputHandlerPhone = (phone) => {
    return setPhone(phone);
  };

  const inputHandlerNote = (note) => {
    return setNote(note);
  };

  function updateContact() {
    // console.log("name: ", getFullName);
    // console.log("nohp: ", getPhone);
    // console.log("note: ", getNote);
    axios({
      method: "PUT",
      url: `http://localhost:3001/api/contacts/${id}`,
      data: {
        "fullname": getFullName,
        "phone": getPhone,
        "note": getNote,
      },
    }).then((results) => {
      console.log(results);
      if (results.data.payload.affectedRows) {
        alert("data berhasil DiUpdate ✅");
        //emot windows + ;
        window.location.href = "/list-contact";
      } else {
        alert("data gagal DiUpdate ❌");
        window.location.reload();
      }
    });
  }

  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: 65 }}>
        <div className="container">
          <div className="row">
            <div className="col-sm m-10">
              <label htmlFor="fullname" className="required">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="form-control"
                required="required"
                value={getFullName}
                onChange={(e) => inputHandlerFullName(e.target.value)}
              />
            </div>
            <div className="col-sm m-10">
              <label htmlFor="phone" className="required">
                Nomor Telepon
              </label>
              <input
                type="number"
                className="form-control"
                value={getPhone}
                onChange={(e) => inputHandlerPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <label htmlFor="fullname">Catatan</label>
              <textarea
                type="text"
                className="form-control"
                value={getNote}
                onChange={(e) => inputHandlerNote(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm m-10">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => updateContact()}
                style={{ cursor: "pointer" }}
              >
                Perbarui Kontak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
