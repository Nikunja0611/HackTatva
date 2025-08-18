const { BlobServiceClient } = require("@azure/storage-blob");

let blobServiceClient = null;

if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
  blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  console.log("✅ Azure Blob initialized");
} else {
  console.warn("⚠️ No AZURE_STORAGE_CONNECTION_STRING found. Blob disabled.");
}

async function getContainer() {
  if (!blobServiceClient) throw new Error("Blob service not initialized");
  const container = blobServiceClient.getContainerClient(
    process.env.AZURE_BLOB_CONTAINER || "submissions"
  );
  await container.createIfNotExists();
  return container;
}

module.exports = { getContainer };
