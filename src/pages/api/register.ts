import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma"; // pastikan path ini sesuai
import { Prisma } from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Metode tidak diizinkan" });
    }

    const { name, email, password } = req.body;

    // Validasi input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(409).json({ message: "Email sudah digunakan" });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER",
            } as Prisma.UserUncheckedCreateInput, // 👈 tambahkan ini
        });

        return res.status(201).json({ message: "Pendaftaran berhasil" });
    } catch (error) {
        console.error("Error saat register:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
}
