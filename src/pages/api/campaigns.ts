import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { Prisma } from "@prisma/client";



export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === "GET") {
        if (req.query.id) {
            try {
                const campaigns = await prisma.campaign.findFirst({
                    where: { id: String(req.query.id) },
                    include: { images: true }, // ✅ tambahkan ini
                });
                return res.status(200).json(campaigns);
            } catch (error) {
                return res.status(500).json({ message: "Failed to fetch product", error });
            }
        }

        try {
            const campaigns = await prisma.campaign.findMany({
                include: { images: true }, // (optional) kalau kamu mau tampilkan gambar juga di list
            });
            return res.status(200).json(campaigns);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch products", error });
        }
    }


    if (req.method === "POST") {
        const { title, description, targetedAmount, images } = req.body;

        const campaign = await prisma.campaign.create({
            data: {
                title,
                description,
                targetedAmount: Number(targetedAmount),
                collectedAmount: 0,
                images: {
                    create: (images || []).map((url: string) => ({ url })),
                },
            } as Prisma.CampaignCreateInput, // <-- Tambahkan cast
            include: {
                images: true,
            },
        });


        return res.status(201).json(campaign);
    }



    if (method === "PUT") {
        try {
            const { id, title, description, targetedAmount, images } = req.body;

            const updatedCampaign = await prisma.campaign.update({
                where: { id: String(id) },
                data: {
                    title,
                    description,
                    targetedAmount: Number(targetedAmount),
                    images: {
                        deleteMany: {},
                        create: Array.isArray(images)
                            ? images.map((img) => ({
                                url: typeof img === "string" ? img : img.url,
                            }))
                            : [],
                    },
                } as Prisma.CampaignUpdateInput, // <-- Tambahkan cast
                include: {
                    images: true,
                },
            });

            return res.status(200).json(updatedCampaign);
        } catch (error) {
            return res.status(500).json({ message: "Failed to update campaign", error });
        }
    }



    if (method === "DELETE") {
        const { id } = req.query;

        if (id) {
            try {
                await prisma.campaign.delete({
                    where: {
                        id: String(id),
                    },
                });
                res.json({ success: true });
            } catch (error) {
                res.status(500).json({ error: "Failed to delete campaign", details: error });
            }
        } else {
            res.status(400).json({ error: "Missing id in query" });
        }
    }

}