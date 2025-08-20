const { BlobServiceClient } = require("@azure/storage-blob");

let blobServiceClient = null;
let isBlobEnabled = false;

// Check if we have a valid Azure Storage connection string
if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
  try {
    blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );
    isBlobEnabled = true;
    console.log("✅ Azure Blob initialized");
  } catch (error) {
    console.warn("⚠️ Invalid AZURE_STORAGE_CONNECTION_STRING:", error.message);
    isBlobEnabled = false;
  }
} else {
  console.warn("⚠️ No AZURE_STORAGE_CONNECTION_STRING found. Blob storage disabled.");
  isBlobEnabled = false;
}

async function getContainer() {
  if (!isBlobEnabled || !blobServiceClient) {
    throw new Error("Azure Blob Storage is not configured. Please set AZURE_STORAGE_CONNECTION_STRING in your .env file");
  }
  
  try {
    const container = blobServiceClient.getContainerClient(
      process.env.AZURE_BLOB_CONTAINER || "resumes"
    );
    await container.createIfNotExists();
    return container;
  } catch (error) {
    console.error("❌ Azure Blob container error:", error.message);
    throw new Error(`Failed to access Azure Blob container: ${error.message}`);
  }
}

// Function to check if blob storage is available
function isBlobStorageAvailable() {
  return isBlobEnabled && blobServiceClient !== null;
}

module.exports = { getContainer, isBlobStorageAvailable };
