import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const regNumber = searchParams.get("regNumber");

    if (!regNumber) {
        return NextResponse.json({ error: "Missing registration number" }, { status: 400 });
    }

    // Path to the Excel file
    const filePath = path.join(process.cwd(), "data", "results.xlsx");

    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: "Results file not found" }, { status: 404 });
    }

    // Read the Excel file
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);
    const regNumbers = data.map((row) => row.RegNumber?.toString().trim());

    if (regNumbers.includes(regNumber)) {
        return NextResponse.json({
            status: "selected",
            message: "Congratulations! You have been selected.",
            links: {
                whatsapp: "https://chat.whatsapp.com/your-group-link",
                discord: "https://discord.gg/your-invite-link",
            },
        });
    } else {
        return NextResponse.json({
            status: "not_selected",
            message: "Sorry, better luck next time!",
        });
    }
}
