const { app } = require("@azure/functions");
const multer = require("multer");
const { storage } = require("./firebaseDB");

const bucket = storage.bucket(); // Get a reference to the Firebase Storage bucket

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5242880 }, // Set maximum file size limit (5 MB) in bytes
}).single("file");

app.http("UploadPaymentProof", {
	route: "property/admin/resident/{residentId}/{fineID}/upload",
	methods: ["POST"],
	authLevel: "anonymous",
	handler: async (request, context) => {
		const residentId = request.params.residentId;
		const fineId = request.params.fineID;

		// Wrap multer in a promise to handle it asynchronously
		await new Promise((resolve, reject) => {
			upload(request, context.res, (err) => {
				if (err) {
					console.error("Multer error:", err);
					context.res = {
						status: 500,
						body: { message: "Upload failed" },
					};
					reject(err); // Reject the promise on error
				}
				resolve();
			});
		}).catch((err) => {
			// Handle Multer errors here
			console.error("Multer error:", err);
			context.res = {
				status: 500,
				body: { message: "Upload failed" },
			};
		});

		const uploadedFile = request.file;
		context.log("Uploaded file:", uploadedFile);

		if (!uploadedFile) {
			context.res = {
				status: 400,
				body: { message: "No file uploaded" },
			};
			return;
		}

		if (uploadedFile.mimetype !== "application/pdf") {
			context.res = {
				status: 400,
				body: { message: "Only PDF files are allowed" },
			};
			return;
		}

		// Generate a unique filename based on current timestamp
		const filename = `${fineId}-${Date.now()}-${uploadedFile.originalname}`;

		try {
			const file = bucket.file(`payment-proof/${residentId}/${filename}`);
			console.log(file);
			const stream = file.createWriteStream({
				metadata: {
					contentType: uploadedFile.mimetype,
				},
			});

			stream.on("error", (err) => {
				console.error("Stream error:", err);
				context.res = {
					status: 500,
					body: { message: "Upload failed" },
				};
			});

			stream.on("finish", async () => {
				console.log("File uploaded successfully:", filename);
				context.res = {
					status: 200,
					body: { message: "Payment proof uploaded successfully" },
				};
			});

			stream.end(uploadedFile.buffer);
		} catch (error) {
			console.error("Upload error:", error);
			context.res = {
				status: 500,
				body: { message: "Upload failed" },
			};
		}
	},
});
