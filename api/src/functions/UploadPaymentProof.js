const { app } = require("@azure/functions");
const multer = require("multer");
const firebaseStorage = require("./firebaseStorage");

const bucket = firebaseStorage.bucket(); // Get a reference to the Firebase Storage bucket

const upload = multer({
  storage: multer.memoryStorage(), // Store uploaded files in memory
  limits: { fileSize: 5242880 }, // Set maximum file size limit (5 MB) in bytes
});

app.http("UploadPaymentProof", {
  route: "property/admin/resident/{residentId}/{fineID}/update",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const residentId = request.params.residentId;
    const fineId = request.params.fineID;

    upload.single("paymentProof")(request, context, async (err) => {
      if (err) {
        console.error(err);
        return context.status(500).json({ message: "Upload failed" });
      }

      const uploadedFile = request.file;

      if (!uploadedFile) {
        return context.status(400).json({ message: "No file uploaded" });
      }

      if (uploadedFile.mimetype !== "application/pdf") {
        return context
          .status(400)
          .json({ message: "Only PDF files are allowed" });
      }

      // Generate a unique filename based on current timestamp
      const filename = `${fineId}-${Date.now()}-${uploadedFile.originalname}`;

      try {
        const file = bucket.file(`payment-proof/${residentId}/${filename}`);
        const stream = file.createWriteStream({
          metadata: {
            contentType: uploadedFile.mimetype,
          },
        });

        stream.on("error", (err) => {
          console.error(err);
          return context.status(500).json({ message: "Upload failed" });
        });

        stream.on("finish", async () => {
          console.log("File uploaded successfully:", filename);

          // (Optional) You can return a success message or relevant information about the uploaded file here
          context
            .status(200)
            .json({ message: "Payment proof uploaded successfully" });
        });

        stream.end(uploadedFile.buffer);
      } catch (error) {
        console.error(error);
        return context.status(500).json({ message: "Upload failed" });
      }
    });
  },
});
