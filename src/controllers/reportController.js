const PDFDocument = require("pdfkit");

const heroModel = require("../models/heroModel");

const exportPostPDF = async (req, res) => {
    try {
        const heroes = await heroModel.getAllHeroes();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=heroes.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text("Relatório de Heróis", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text("id | nome | editora", { align:"center" ,underline: true });
        doc.moveDown(0.5);

        heroes.forEach((hero) => {
            doc.text(`${hero.id} | ${hero.name} | ${hero.id_publisher}`), { align: "center" };
        });

        doc.end(); 
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: "Erro ao gerar o PDF" });
        }
    }
};

module.exports = { exportPostPDF };