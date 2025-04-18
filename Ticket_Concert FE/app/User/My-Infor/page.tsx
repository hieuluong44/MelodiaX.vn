"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "./style.css";
import { TextField, Button } from "@mui/material";
import { LoaiVeService } from "@/services/LoaiVe";
import { LoaiVe2 } from "@/interfaces/LoaiVe";

const Nav = dynamic(() => import("@/components/Navbar.jsx"), { ssr: false });

const AccountInformation = () => {
  const [activeTab, setActiveTab] = useState("accountInfo");

  const [dsVe, setDsVe] = useState<LoaiVe2[] | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("IDNguoiDung");
    if (userData) {
      LoaiVeService.getVeDaMuaByUserId(userData)
        .then((data) => {
          if (Array.isArray(data)) {
            setDsVe(data);
          } else {
            setDsVe([]);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách vé:", error);
          setDsVe([]);
        });
    }
  }, []);

  if (!dsVe) {
    return <div className="loading-wrapper d-flex flex-column align-items-center gap-2">
    <p>Đang tải sự kiện...</p>
    <div className="d-flex align-items-center gap-3">
      <div className="loading set_1"></div>
      <div className="loading set_2"></div>
      <div className="loading set_3"></div>
    </div>
  </div>;;
  }

  return (
    <>
      <div style={{zoom : "0.9"}}>
        <Nav />
        <div className="container d-flex mt-3 gap-4">
          {/* Sidebar */}
          <nav className="d-flex p-3 bg-white rounded flex-column col-md-3 gap-2">
            <div
              className="d-flex ps-2 gap-2 pb-3 mb-2 bg-white"
              style={{ borderBottom: "1px solid #CFCFCF" }}
            >
              <img
                src="https://salt.tkbcdn.com/ts/ds/e0/be/05/f22913827e013f1430639b83173ca039.jpg"
                className="rounded-5"
                width={65}
                height={65}
                alt=""
              />
              <div className="d-flex rounded flex-column gap-1">
                <p className="m-0">Tài khoản của</p>
                {/* <span className="fs-4">{dsVe.TenNguoiDung || "Chưa đăng nhập"}</span> */}
                <span className="fs-4">HieuLuong</span>
              </div>
            </div>
            <ul className="left-sidebar d-flex flex-column gap-3 text-dark list-unstyled">
              <Link
                href="#"
                className="text-decoration-none text-dark"
                onClick={() => setActiveTab("accountInfo")}
              >
                <li className="p-3 d-flex align-items-center gap-2">
                  <span className="icon">{/* icon user */}</span>
                  <span>Thông tin tài khoản</span>
                </li>
              </Link>

              <Link
                href="#"
                className="text-decoration-none text-dark"
                onClick={() => setActiveTab("purchasedTickets")}
              >
                <li className="p-3 d-flex align-items-center gap-2">
                  <span className="icon">{/* icon map */}</span>
                  <span>Vé đã mua</span>
                </li>
              </Link>

              <Link
                href="/Organizer/Organi-Event/my-event"
                target="blank"
                className="text-decoration-none text-dark"
              >
                <li className="p-3 d-flex align-items-center gap-2">
                  <span className="icon">{/* icon event */}</span>
                  <span>Sự kiện của tôi</span>
                </li>
              </Link>
            </ul>
          </nav>

          {/* Main Content */}
          <div className="col-md-9 bg-white p-3 rounded">
            {activeTab === "accountInfo" && (
              <div id="profile-container">
                <div
                  className="profile-header ps-2 gap-2 pb-4 mb-2"
                  style={{ borderBottom: "1px solid #CFCFCF" }}
                >
                  <h5>Hồ sơ của tôi</h5>
                  <p className="description m-0">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                  </p>
                </div>
                <div className="profile-content d-flex justify-content-between">
                  <form className="col-md-6">
                    <table className="profile-table">
                      <tbody>
                        <tr>
                          <td className="label-col">
                            <label>Họ tên</label>
                          </td>
                          <td className="input-col">
                            <TextField
                              label="Họ tên"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              placeholder="Nhập họ tên"
                              name="tenNguoiDung"
                              // defaultValue={user?.tenNguoiDung}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="label-col">
                            <label>Email</label>
                          </td>
                          <td className="input-col">
                            <TextField
                              label="Email"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              placeholder="Nhập email"
                              name="email"
                              // defaultValue={user?.email}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="label-col">
                            <label>Số điện thoại</label>
                          </td>
                          <td className="input-col">
                            <TextField
                              label="Số điện thoại"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              placeholder="Nhập số điện thoại"
                              name="soDienThoai"
                              // defaultValue={user?.soDienThoai}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="label-col">
                            <label>Mật khẩu</label>
                          </td>
                          <td className="input-col">
                            <TextField
                              label="Mật khẩu"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              placeholder="Nhập mật khẩu"
                              name="matKhau"
                              type="password"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div>
                      <Button variant="contained" color="primary" type="submit">
                        Lưu
                      </Button>
                    </div>
                  </form>

                  <div
                    className="upload-container p-5 pe-2 d-flex flex-column gap-2 text-center col-md-5"
                    style={{ borderLeft: "1px solid #000" }}
                  >
                    <img
                      src="https://salt.tkbcdn.com/ts/ds/e0/be/05/f22913827e013f1430639b83173ca039.jpg"
                      alt="avatar"
                      className="rounded-circle mx-auto"
                      width={100}
                      height={100}
                    />
                    <input type="file" accept="image/*" />
                    <small className="text-muted">
                      Định dạng: JPG, PNG (max 2MB)
                    </small>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "purchasedTickets" && (
              <div>
                <h5 className="mb-3">Vé đã mua</h5>
                {dsVe.length === 0 ? (
                  <div className="sc-ffc90067-7 sc-cd78c11b-1 fFJbAL ePwTxf text-center">
                    <svg
                      width="260"
                      height="260"
                      viewBox="0 0 260 260"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="ticket-empty_svg__a"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="260"
                        height="260"
                      >
                        <circle cx="130" cy="130" r="130" fill="#C4C4C4"></circle>
                      </mask>
                      <g mask="url(#ticket-empty_svg__a)">
                        <path
                          d="M262.772 0H-3.25v260h266.022V0z"
                          fill="#F59D5D"
                        ></path>
                        <path
                          d="M181.404 134.687c26.147 0 47.342-21.196 47.342-47.342 0-26.146-21.195-47.342-47.342-47.342-26.146 0-47.342 21.196-47.342 47.342 0 26.146 21.196 47.342 47.342 47.342z"
                          fill="#FFD530"
                        ></path>
                        <path
                          d="M262.772 97.628H-3.25V260h266.022V97.628z"
                          fill="#FFDDB3"
                        ></path>
                        <path
                          d="M107.376 183.187s-3.846.531-8.62-1.371"
                          stroke="#2A2D34"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M-3.25 147.048s11.088 1.317 31.355-5.253c20.266-6.569 10.257 5.43 20.39 8.56 10.134 3.13 30.02-4.943 50.26-7.976 20.24-3.033 19.161 15.191 40.065 15.191 33.247 0 29.701-16.561 61.56-16.561 20.152 0 13.547 15.279 34.839 15.279 13.201 0 27.553-9.24 27.553-9.24v-15.236H-3.25v15.236z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M262.772 75.222H-3.25v50.366h266.022V75.222z"
                          fill="#EE4F14"
                        ></path>
                        <path
                          d="M-3.25 140.814s11.088 1.318 31.355-5.252c20.266-6.57 16.464 5.226 26.598 8.356 10.133 3.13 23.812-4.731 44.052-7.772 20.24-3.033 27.517 13.856 48.421 13.643 20.903-.212 19.966-11.848 51.78-13.643 22.743-1.282 27.447 8.143 34.194 10.672 11.946 4.483 29.622-6.004 29.622-6.004v-15.235H-3.25v15.235z"
                          fill="#EE4F14"
                        ></path>
                        <path
                          opacity="0.5"
                          d="M182.2 90.554c26.586 0 48.138-1.437 48.138-3.21 0-1.772-21.552-3.21-48.138-3.21s-48.138 1.438-48.138 3.21c0 1.773 21.552 3.21 48.138 3.21zM170.714 98.539c17.473 0 31.638-.974 31.638-2.175 0-1.202-14.165-2.175-31.638-2.175-17.473 0-31.638.973-31.638 2.175 0 1.201 14.165 2.175 31.638 2.175zM161.014 106.523c12.121 0 21.947-.974 21.947-2.175 0-1.201-9.826-2.175-21.947-2.175-12.121 0-21.947.974-21.947 2.175 0 1.201 9.826 2.175 21.947 2.175z"
                          fill="#FFD530"
                        ></path>
                        <path
                          d="M113.823 194.452l-38.447 39.251c-.76.778-1.972-.274-1.309-1.141l29.127-37.579a.412.412 0 00-.327-.664l-16.297-.008a.426.426 0 00-.265.097L7.644 260h92.65l30.444-65.079a.41.41 0 00-.371-.584l-16.244-.009a.417.417 0 00-.3.124z"
                          fill="#2A2D34"
                        ></path>
                        <path
                          d="M131.534 94.091s5.217-2.325 8.975 1.238c3.758 3.564 2.935 7.596 2.369 8.701-1.096 2.149-7.551 6.057-10.204 4.156-2.944-2.113-.848-10.549-.848-10.549"
                          fill="#FFD530"
                        ></path>
                        <path
                          d="M131.534 94.091s5.217-2.325 8.975 1.238c3.758 3.564 2.935 7.596 2.369 8.701-1.096 2.149-7.551 6.057-10.204 4.156-2.944-2.113-.848-10.549-.848-10.549"
                          stroke="#2A2D34"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M133.903 147.392s3.343 8.117 3.343 15.881c-.009 10.929-3.175 15.111-4.775 19.197 0 0-.009 8.417-1.45 11.866-1.45 3.448-12.804 3.378-15.872 1.132-3.873-2.821-5.164-12.282-5.164-12.282H107.385s-.964 9.461-4.845 12.273c-3.077 2.237-14.66 2.299-16.102-1.15-1.442-3.448-1.008-11.866-1.008-11.866-1.592-4.085-4.96-8.276-4.96-19.206 0-7.763 3.36-15.88 3.36-15.88v-6.358l47.571 1.211"
                          fill="#FFD530"
                        ></path>
                        <path
                          d="M133.903 147.392s3.343 8.117 3.343 15.881c-.009 10.929-3.175 15.111-4.775 19.197 0 0-.009 8.417-1.45 11.866-1.45 3.448-12.804 3.378-15.872 1.132-3.873-2.821-5.164-12.282-5.164-12.282H107.385s-.964 9.461-4.845 12.273c-3.077 2.237-14.66 2.299-16.102-1.15-1.442-3.448-1.008-11.866-1.008-11.866-1.592-4.085-4.96-8.276-4.96-19.206 0-7.763 3.36-15.88 3.36-15.88v-6.358l47.571 1.211"
                          stroke="#2A2D34"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M108.853 145.677c-14.262.009-22.336-3.157-25.368-4.669v-3.51c2.785 1.335 11.98 5.093 25.368 5.084 13.387.009 22.583-3.749 25.369-5.084v3.51c-3.033 1.504-11.106 4.669-25.369 4.669z"
                          fill="#2DC275"
                          stroke="#2A2D34"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M142.551 104.489c-6.693-17.118-24.104-18.966-33.609-18.984h-.177c-9.497.018-26.916 1.866-33.61 18.984-8.586 21.965 8.444 33 8.444 33a61.224 61.224 0 0011.39 3.678 61.744 61.744 0 0013.864 1.406 61.23 61.23 0 0013.865-1.406 61.25 61.25 0 0011.389-3.678c0 .009 17.03-11.035 8.444-33z"
                          fill="#FFD530"
                        ></path>
                        <path
                          d="M134.195 137.497c-2.785 1.335-11.963 5.093-25.351 5.084-13.387-.009-22.565-3.74-25.35-5.084 0 0-17.031-11.044-8.445-33 6.729-17.225 24.334-18.993 33.795-18.984 9.462-.01 27.058 1.76 33.796 18.984 8.586 21.956-8.445 33-8.445 33z"
                          stroke="#2A2D34"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M96.721 161.841s1.327.362 10.39 4.324c4.58 1.998 4.271 10-2.75 11.097-6.234.981-10.646-4.227-7.64-15.421z"
                          fill="#fff"
                          stroke="#2A2D34"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M128.43 143.201c2.741-.717 5.792-2.193 5.792-2.193s10.505 15.182 6.163 26.111c-4.342 10.929-20.47 11.363-23.158 5.093-2.732-6.357 2.865-11.424 11.017-13.166"
                          fill="#FFD530"
                        ></path>
                        <path
                          d="M128.43 143.201c2.741-.717 5.792-2.193 5.792-2.193s10.505 15.182 6.163 26.111c-4.342 10.929-20.47 11.363-23.158 5.093-2.732-6.357 2.865-11.424 11.017-13.166"
                          stroke="#2A2D34"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M83.484 156.933c2.202 2.051 13.768 5.986 8.78 13.529-3.837 5.809-12.254 5.234-16.357-3.458-5.023-10.628 7.321-26.005 7.321-26.005s3.042 1.477 5.792 2.193"
                          fill="#FFD530"
                        ></path>
                        <path
                          d="M83.484 156.933c2.202 2.051 13.768 5.986 8.78 13.529-3.837 5.809-12.254 5.234-16.357-3.458-5.023-10.628 7.321-26.005 7.321-26.005s3.042 1.477 5.792 2.193"
                          stroke="#2A2D34"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          opacity="0.2"
                          d="M83.2 137.392v3.524c.106.054.222.107.337.169v.115c-.373-.168-.603-.284-.603-.284s-12.383 15.428-7.341 26.106c1.509 3.186 3.595 5.281 5.823 6.382 1.127 4.074 2.76 6.613 3.737 9.116 0 0-.444 8.45 1.012 11.912 1.446 3.462 13.075 3.409 16.163 1.154 3.888-2.832 4.865-12.32 4.865-12.32h2.609s1.296 9.497 5.184 12.329c1.607 1.172 5.441 1.749 8.965 1.553 1.039-6.133-2.494-21.161-2.494-21.161 3.027-.178 7.385.32 11.175-12.329 3.791-12.649-11.104-18.747-11.104-18.747l-.524-3.506c9.374-4.421 13.226-16.706 11.841-25.431-1.526-9.622-10.385-24.588-32.851-23.523-10.412.48-17.948 3.835-23.052 7.297a30.007 30.007 0 00-2.201 4.509c-8.62 22.049 8.477 33.127 8.477 33.127"
                          fill="#000"
                        ></path>
                      </g>
                      <g clip-path="url(#ticket-empty_svg__clip0)">
                        <path
                          opacity="0.2"
                          d="M128.115 133.404v.106c-.349-.162-.553-.26-.553-.26"
                          fill="#000"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="ticket-empty_svg__clip0">
                          <path
                            fill="#fff"
                            d="M127.562 133.25h.552v.26h-.552z"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="sc-cd78c11b-2 cimqQp fw-bold mt-3">Bạn chưa có vé nào</div>
                    <div className="w-100 text-center mt-5">
                      <button className="btn btn-success">Mua vé ngay</button>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Sự kiện</th>
                          <th scope="col">Ngày diễn ra</th>
                          <th scope="col">Số lượng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dsVe.map((ve, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ve.TenSuKien}</td>
                            <td>{ve.ThoiGianBatDau}</td>
                            <td>{ve.SoLuong}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
     
    </>
  );
};

export default AccountInformation;
