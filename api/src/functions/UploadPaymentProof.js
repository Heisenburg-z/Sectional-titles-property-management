// const { app } = require("@azure/functions");
// const multer = require("multer");
// const { storage } = require("./firebaseDB");

// const bucket = storage.bucket(); // Get a reference to the Firebase Storage bucket

// const upload = multer({
// 	storage: multer.memoryStorage(), // Store uploaded files in memory
// 	limits: { fileSize: 5242880 }, // Set maximum file size limit (5 MB) in bytes
// });

// app.http("UploadPaymentProof", {
// 	route: "property/admin/resident/{residentId}/{fineID}/upload",
// 	methods: ["POST"],
// 	authLevel: "anonymous",
// 	handler: async (request, context) => {
// 		const residentId = request.params.residentId;
// 		const fineId = request.params.fineID;

// 		upload.single("paymentProof")(request, context, async (err) => {
// 			if (err) {
// 				// console.error(err);
// 				// return context.status(500).json({ message: "Upload failed" });
// 				context.res.status = 500;
// 				// Use context.res.status to set status code
// 				return context.res.json({ message: "Upload failed" });
// 			}

// 			const uploadedFile = request.file;

// 			if (!uploadedFile) {
// 				context.res.status = 400;
// 				// return context.status(400).json({ message: "No file uploaded" });
// 				return context.res.json({ message: "No file uploaded" });
// 			}

// 			if (uploadedFile.mimetype !== "application/pdf") {
// 				// return context
// 				// 	.status(400)
// 				// 	.json({ message: "Only PDF files are allowed" });

// 				context.res.status = 400;
// 				return context.res.json({ message: "Only PDF files are allowed" });
// 			}

// 			// Generate a unique filename based on current timestamp
// 			const filename = `${fineId}-${Date.now()}-${uploadedFile.originalname}`;

// 			try {
// 				const file = bucket.file(`payment-proof/${residentId}/${filename}`);
// 				const stream = file.createWriteStream({
// 					metadata: {
// 						contentType: uploadedFile.mimetype,
// 					},
// 				});

// 				stream.on("error", (err) => {
// 					console.error(err);
// 					return context.status(500).json({ message: "Upload failed" });
// 				});

// 				stream.on("finish", async () => {
// 					console.log("File uploaded successfully:", filename);

// 					// (Optional) You can return a success message or relevant information about the uploaded file here
// 					context
// 						.status(200)
// 						.json({ message: "Payment proof uploaded successfully" });
// 				});

// 				stream.end(uploadedFile.buffer);
// 			} catch (error) {
// 				console.error(error);
// 				return context.status(500).json({ message: "Upload failed" });
// 			}
// 		});
// 	},
// });

// TODO: const { app } = require("@azure/functions");
// const multer = require("multer");
// const { storage } = require("./firebaseDB");

// const bucket = storage.bucket(); // Get a reference to the Firebase Storage bucket

// const upload = multer({
// 	storage: multer.memoryStorage(), // Store uploaded files in memory
// 	limits: { fileSize: 5242880 }, // Set maximum file size limit (5 MB) in bytes
// }).single("paymentProof");

// app.http("UploadPaymentProof", {
// 	route: "property/admin/resident/{residentId}/{fineID}/upload",
// 	methods: ["POST"],
// 	authLevel: "anonymous",
// 	handler: async (request, context) => {
// 		const residentId = request.params.residentId;
// 		const fineId = request.params.fineID;

// 		upload(request, {}, async (err) => {
// 			if (err) {
// 				context.res = {
// 					status: 500,
// 					body: { message: "Upload failed" },
// 				};
// 				return;
// 			}

// 			const uploadedFile = request.file;

// 			if (!uploadedFile) {
// 				context.res = {
// 					status: 400,
// 					body: { message: "No file uploaded" },
// 				};
// 				return;
// 			}

// 			if (uploadedFile.mimetype !== "application/pdf") {
// 				context.res = {
// 					status: 400,
// 					body: { message: "Only PDF files are allowed" },
// 				};
// 				return;
// 			}

// 			// Generate a unique filename based on current timestamp
// 			const filename = `${fineId}-${Date.now()}-${uploadedFile.originalname}`;

// 			try {
// 				const file = bucket.file(`payment-proof/${residentId}/${filename}`);
// 				const stream = file.createWriteStream({
// 					metadata: {
// 						contentType: uploadedFile.mimetype,
// 					},
// 				});

// 				stream.on("error", (err) => {
// 					console.error(err);
// 					context.res = {
// 						status: 500,
// 						body: { message: "Upload failed" },
// 					};
// 				});

// 				stream.on("finish", async () => {
// 					console.log("File uploaded successfully:", filename);
// 					context.res = {
// 						status: 200,
// 						body: { message: "Payment proof uploaded successfully" },
// 					};
// 				});

// 				stream.end(uploadedFile.buffer);
// 			} catch (error) {
// 				console.error(error);
// 				context.res = {
// 					status: 500,
// 					body: { message: "Upload failed" },
// 				};
// 			}
// 		});
// 	},
// });

const { app } = require("@azure/functions");
const multer = require("multer");
const { storage } = require("./firebaseDB");

const bucket = storage.bucket(); // Get a reference to the Firebase Storage bucket

// const upload = multer({
//   storage: multer.memoryStorage(), // Store uploaded files in memory
//   limits: { fileSize: 5242880 }, // Set maximum file size limit (5 MB) in bytes
// }).single("paymentProof");

// app.http("UploadPaymentProof", {
//   route: "property/admin/resident/{residentId}/{fineID}/upload",
//   methods: ["POST"],
//   authLevel: "anonymous",
//   handler: async (request, context) => {
//     const residentId = request.params.residentId;
//     const fineId = request.params.fineID;

//     upload(request, {}, async (err) => {
//       if (err) {
//         context.res = {
//           status: 500,
//           body: { message: "Upload failed" }
//         };
//         return;
//       }

//       const uploadedFile = request.file;
// 	  context.log(uploadedFile);

//       if (!uploadedFile) {
//         context.res = {
//           status: 400,
//           body: { message: "No file uploaded" }
//         };
//         return;
//       }

//       if (uploadedFile.mimetype !== "application/pdf") {
//         context.res = {
//           status: 400,
//           body: { message: "Only PDF files are allowed" }
//         };
//         return;
//       }

//       // Generate a unique filename based on current timestamp
//       const filename = `${fineId}-${Date.now()}-${uploadedFile.originalname}`;

//       try {
//         const file = bucket.file(`payment-proof/${residentId}/${filename}`);
//         const stream = file.createWriteStream({
//           metadata: {
//             contentType: uploadedFile.mimetype,
//           },
//         });

//         stream.on("error", (err) => {
//           console.error(err);
//           context.res = {
//             status: 500,
//             body: { message: "Upload failed" }
//           };
//         });

//         stream.on("finish", async () => {
//           console.log("File uploaded successfully:", filename);
//           context.res = {
//             status: 200,
//             body: { message: "Payment proof uploaded successfully" }
//           };
//         });

//         stream.end(uploadedFile.buffer);
//       } catch (error) {
//         console.error(error);
//         context.res = {
//           status: 500,
//           body: { message: "Upload failed" }
//         };
//       }
//     });
//   },
// });


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5242880 }, // Set maximum file size limit (5 MB) in bytes
}).single("paymentProof");

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
    })
    .catch((err) => { // Handle Multer errors here
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
