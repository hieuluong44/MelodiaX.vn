"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";


const Background = styled("div")({
  minHeight: "100vh",
  backgroundImage: 'url("/concert-bg.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

const FormWrapper = styled(Paper)({
  maxWidth: 400,
  width: "100%",
  padding: "30px",
  borderRadius: "10px",
  background: "#FFF",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
});

const StyledTab = styled(Tab)(() => ({
  fontWeight: "bold",
  fontSize: "18px",
  textTransform: "none",
}));

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        Email: email,
        MatKhau: password,
      });

      if (response.status === 200) {
        const { userId, token, avatar, trangThai } = response.data;

        if (trangThai === "Khoá") {
          Swal.fire({
            icon: "error",
            title: "Tài khoản bị khóa",
            text: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.",
          });
          return;
        }

        localStorage.setItem("authToken", token);
        localStorage.setItem("IDNguoiDung", userId);
        localStorage.setItem("AnhNenUser", avatar);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        text: "Đã có lỗi xảy ra khi đăng nhập.",
      });
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Mật khẩu không khớp",
        text: "Vui lòng kiểm tra lại mật khẩu.",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        TenNguoiDung: name,
        SoDienThoai: phone,
        Email: email,
        MatKhau: password,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          text: "Vui lòng đăng nhập để tiếp tục.",
        });

        setActiveTab("login");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setPhone("");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      Swal.fire({
        icon: "error",
        title: "Đăng ký thất bại",
        text: "Đã có lỗi xảy ra khi đăng ký.",
      });
    }
  };

  return (
    <Background>
      <FormWrapper elevation={10} sx={{padding : 0}}>
        <Box sx={{display : "flex", borderTopRightRadius : 10, borderTopLeftRadius : 10 , p : 2, pb : 0, justifyContent : "space-between", alignItems : "center", bgcolor : "rgb(45, 194, 117)"}}>
          <Typography variant="h5" color="#FFF" width={200} mb={0} fontWeight="bold" align="center" gutterBottom>
            🎵 MelodiaX.vn
          </Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="64" fill="none" className="sc-kpDqfm hZeYaj"><path fill="#FFD530" d="M75.538 76.358s-.678-12.34-9.182-25.508H21.221L21 57.5"></path><path stroke="#2A2D34" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M75.538 76.358s-.678-12.34-9.182-25.508H21.221L21 57.5"></path><path fill="#FFD530" d="M23.903 49.471S18.77 29.948 10.172 28.843C1.168 27.683-.855 42.697 20 61"></path><path stroke="#2A2D34" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M23.903 49.471S18.77 29.948 10.172 28.843C1.168 27.683-.855 42.697 20 61"></path><path fill="#FFD530" d="M66.071 56.529s2.975 7.218 2.972 14.13c-.004 9.717-2.827 13.444-4.248 17.078 0 0-.005 7.487-1.293 10.553-1.29 3.067-11.386 3.006-14.123 1.01-3.446-2.51-4.592-10.926-4.592-10.926H42.475s-.858 8.413-4.307 10.922c-2.74 1.991-13.04 2.043-14.326-1.026-1.286-3.069-.895-10.556-.895-10.556-1.417-3.636-4.416-7.365-4.411-17.085.004-6.909 2.987-14.125 2.987-14.125"></path><path stroke="#2A2D34" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M66.071 56.529s2.975 7.218 2.972 14.13c-.004 9.717-2.827 13.444-4.248 17.078 0 0-.005 7.487-1.293 10.553-1.29 3.067-11.386 3.006-14.123 1.01-3.446-2.51-4.592-10.926-4.592-10.926H42.475s-.858 8.413-4.307 10.922c-2.74 1.991-13.04 2.043-14.326-1.026-1.286-3.069-.895-10.556-.895-10.556-1.417-3.636-4.416-7.365-4.411-17.085.004-6.909 2.987-14.125 2.987-14.125"></path><path fill="#fff" d="M43.788 82.767c8.075 0 14.62-8.33 14.62-18.604S51.863 45.56 43.788 45.56c-8.074 0-14.62 8.33-14.62 18.604 0 10.275 6.546 18.604 14.62 18.604Z"></path><path fill="#2DC275" d="M43.79 55.001C31.1 55.008 23.92 52.19 21.224 50.85v-3.123c2.477 1.188 10.662 4.526 22.568 4.52 11.905.006 20.088-3.332 22.567-4.52v3.123C63.662 52.19 56.48 55.008 43.791 55Z"></path><path stroke="#2A2D34" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M43.79 55.001C31.1 55.008 23.92 52.19 21.224 50.85v-3.123c2.477 1.188 10.662 4.526 22.568 4.52 11.905.006 20.088-3.332 22.567-4.52v3.123C63.662 52.19 56.48 55.008 43.791 55"></path><path fill="#FFD530" stroke="#2A2D34" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="m46.44 58.62-1.41 1.41a1.753 1.753 0 0 1-2.48 0l-1.41-1.41a1.753 1.753 0 0 1 0-2.48l1.41-1.41a1.753 1.753 0 0 1 2.48 0l1.41 1.41a1.753 1.753 0 0 1 0 2.48Z"></path><path fill="#fff" d="M73.766 18.37C67.816 3.143 52.322 1.495 43.87 1.48h-.162c-8.453.015-23.945 1.663-29.898 16.89-7.636 19.537 7.512 29.359 7.512 29.359a54.56 54.56 0 0 0 22.466 4.52A54.692 54.692 0 0 0 56.125 51a54.642 54.642 0 0 0 10.13-3.272s15.148-9.822 7.511-29.359Z"></path><path fill="#FFD530" d="M43.789 10.268c7.625 0 4.25 7.74 5.064 11.777.816 4.036 2.954 2.384 13.241.702 9.804-1.604 12.719 11.666 12.972 12.74 1.331-4.482 1.492-10.186-1.218-17.117C67.859 3.045 52.202 1.475 43.788 1.48c-8.413-.005-24.07 1.565-30.059 16.89-2.71 6.929-2.549 12.635-1.218 17.117.253-1.071 3.169-14.342 12.972-12.74 10.287 1.684 12.427 3.334 13.241-.702.816-4.037-2.56-11.777 5.065-11.777Z"></path><path stroke="#2A2D34" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M33.183 27.523s2.366 1.627 4.77.549c2.405-1.078 3.35-1.953 5.835-1.953 2.489.003 3.433.875 5.838 1.955 2.405 1.078 4.77-.547 4.77-.547"></path><path fill="#2DC275" stroke="#2A2D34" strokeMiterlimit="10" d="m46.697 22.845.034-.039c.795-.904.352-2.312-.816-2.612-.741-.192-1.543-.246-2.129-.249-.583 0-1.387.055-2.129.247-1.168.3-1.613 1.706-.818 2.61l.034.04c1.55 1.736 4.278 1.738 5.824.003Z"></path><path fill="#2A2D34" d="M32.41 19.945a.525.525 0 0 0-.506.651 2.804 2.804 0 0 0 5.456 0 .525.525 0 0 0-.507-.65H32.41ZM55.17 19.945c.339 0 .585.321.506.651a2.804 2.804 0 0 1-5.456 0 .525.525 0 0 1 .507-.65h4.443Z"></path><path stroke="#2A2D34" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M66.336 47.729c-2.477 1.189-10.644 4.526-22.55 4.52-11.905-.007-20.07-3.33-22.547-4.52 0 0-15.148-9.822-7.512-29.359C19.718 3.045 35.375 1.475 43.789 1.48c8.413-.005 24.07 1.565 30.059 16.89 7.639 19.537-7.512 29.359-7.512 29.359Z"></path><path fill="#FFD530" d="M24.72 5.986s-4.64-2.066-7.983 1.1c-3.342 3.166-2.61 6.753-2.11 7.74.971 1.915 6.716 5.386 9.073 3.696 2.622-1.878.755-9.386.755-9.386"></path><path stroke="#2A2D34" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M24.72 5.986s-4.64-2.066-7.983 1.1c-3.342 3.166-2.61 6.753-2.11 7.74.971 1.915 6.716 5.386 9.073 3.696 2.622-1.878.755-9.386.755-9.386"></path><path fill="#FFD530" d="M62.858 5.986s4.64-2.066 7.982 1.1c3.342 3.166 2.61 6.753 2.11 7.74-.971 1.915-6.716 5.386-9.073 3.696-2.621-1.878-.755-9.386-.755-9.386"></path><path stroke="#2A2D34" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M62.858 5.986s4.64-2.066 7.982 1.1c3.342 3.166 2.61 6.753 2.11 7.74-.971 1.915-6.716 5.386-9.073 3.696-2.621-1.878-.755-9.386-.755-9.386"></path></svg>
        </Box>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered textColor="primary" indicatorColor="primary">
          <StyledTab label="Đăng nhập" value="login" />
          <StyledTab label="Đăng ký" value="register" />
        </Tabs>

        <Box display="flex" flexDirection="column" p={4} gap={3}>
          {activeTab === "login" ? (
            <>
              <TextField sx={{fontSize : "20px"}} label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField sx={{fontSize : "20px"}}
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Link href="/Authen/ForgotPass/">Quên mật khẩu</Link>
              <Button onClick={handleLogin} sx={{fontSize : "20px"}} variant="contained" color="primary" fullWidth>
                Đăng nhập
              </Button>
            </>
          ) : (
            <>
              <TextField label="Tên người dùng" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="Số điện thoại" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
              <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Nhắc lại mật khẩu"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button onClick={handleRegister} variant="contained" color="primary" fullWidth>
                Tạo tài khoản
              </Button>
            </>
          )}
        </Box>
      </FormWrapper>
    </Background>
  );
};

export default LoginForm;
