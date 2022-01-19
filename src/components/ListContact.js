import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";

const ListContact = () => {
  const [getDatas, setDatas] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/contacts"
    }).then((results) => {
      setDatas(results.data.payload);
    });
  }, []);

  const deleteContact = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:3001/api/contacts/${id}`,
    }).then((result) => {
      if (result.data.payload.affectedRows) {
        alert("data berhasil di hapus✅");
        window.location.reload();
      } else {
        alert("data gagal ditambahkan❌");
        window.location.reload();
      }
    });
  };

  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: 65 }}>
        <div className="container-fluid">
          <h3 className="text-center">Daftar Kontak Saya</h3>
          <div className="w-full mw-full">
            <div className="card p-0 bg-very-dark-dm">
              <div className="table-responsive">
                <table className="table table-inner-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nama Lengkap</th>
                      <th>Nomor Telepon</th>
                      <th>Catatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDatas.map((data, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{data.fullname}</td>
                          <td>{data.phone}</td>
                          <td>
                            <div className="row">
                              <div className="col-10">{data.note}</div>
                              <div className="col-1">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    (window.location.href = `/edit-contact/${data.id}`)
                                  }
                                >
                                  🔍
                                </span>
                              </div>
                              <div className="col-1">
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Apakah anda yakin untuk menghapus ini ?"
                                      ) === true
                                    ) {
                                      deleteContact(data.id);
                                    } else {
                                    }
                                  }}
                                >
                                  ❌
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListContact;
