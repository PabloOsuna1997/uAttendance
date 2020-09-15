module.exports = {
    aws_remote_comfig: {
        accessKeyId: process.env["ACCESSKEYID_S3"],
        secretAccessKey: process.env["SECRETACCESSKEY_S3"],
        region: process.env["REGION"]
    }
}
