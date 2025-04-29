const PDFDocument = require("pdfkit");

const heroModel = require("../models/heroModel")

const exportPostPDF = async (req, res) => {
    try {
        const users = await heroModel.getAllHeroes();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=heroes.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);


        doc.fontSize(20).text("Relatorio de Heróis", {align: "center"});
        doc.moveDown();


        doc.fontSize(12).text("id | nome | editora", {underline: true});
        doc.moveDown(0.5);

    
        hero.forEach((hero) => {
            doc.text(
                `${hero.id} | ${hero.name} | ${hero.email}`
            );
        });

        doc.end(); 
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF"}); 
    }
};

module.exports = { exportPostPDF };