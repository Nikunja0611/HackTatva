const { BlobServiceClient } = require('@azure/storage-blob');
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
async function getContainer(){
  const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_CONTAINER);
  await containerClient.createIfNotExists();
  return containerClient;
}
module.exports = { getContainer };
