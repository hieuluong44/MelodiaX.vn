import pool from '../config/db.js';

// Lấy tất cả loại vé
export const getAllLoaiVe = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM LoaiVe");
        return rows;
    } catch (error) {
        throw error;
    }
};

// Lấy loại vé theo ID
export const getLoaiVeByID = async (idLoaiVe) => {
    try {
        const [rows] = await pool.query("SELECT * FROM LoaiVe WHERE IDLoaiVe = ?", [idLoaiVe]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

export const getLoaiVeByIDSuatDien = async (idSuatDien) => {
    try {
        const [rows] = await pool.query(
            "SELECT LV.IDLoaiVe, SD.IDSuatDien, LV.TenVe, LV.AnhVe, LV.GiaVe, LV.ThongTinVe, SD.ThoiGianBatDau, SD.ThoiGianKetThuc FROM LoaiVe LV INNER JOIN SuatDien SD ON LV.IDSuatDien = SD.IDSuatDien WHERE LV.IDSuatDien = ?", 
            [idSuatDien]
        );
        return rows; 
    } catch (error) {
        throw error;
    }
};


// Thêm mới loại vé
export const createLoaiVe = async (idLoaiVe, loaiVeData) => {
    try {
        const query = `
            INSERT INTO LoaiVe (IDLoaiVe, IDSuatDien, TenVe, AnhVe, GiaVe, SoLuongVe, ThongTinVe, TrangThai)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const { IDSuatDien, TenVe, AnhVe, GiaVe, SoLuongVe, ThongTinVe, TrangThai } = loaiVeData;

        const [result] = await pool.query(query, [idLoaiVe, IDSuatDien, TenVe, AnhVe, GiaVe, SoLuongVe, ThongTinVe, TrangThai]);
        return result.insertId;
    } catch (error) {
        throw error;
    }
};

// Cập nhật loại vé
export const updateLoaiVe = async (idLoaiVe, loaiVeData) => {
    try {
        const query = `
            UPDATE LoaiVe SET IDSuatDien = ?, TenVe = ?, AnhVe = ?, GiaVe = ?, SoLuongVe = ?, ThongTinVe = ?, TrangThai = ?
            WHERE IDLoaiVe = ?
        `;
        const { IDSuatDien, TenVe, AnhVe, GiaVe, SoLuongVe, ThongTinVe, TrangThai } = loaiVeData;

        const [result] = await pool.query(query, [IDSuatDien, TenVe, AnhVe, GiaVe, SoLuongVe, ThongTinVe, TrangThai, idLoaiVe]);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};

// Xóa loại vé
export const deleteLoaiVe = async (idLoaiVe) => {
    try {
        const [result] = await pool.query("DELETE FROM LoaiVe WHERE IDLoaiVe = ?", [idLoaiVe]);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};
