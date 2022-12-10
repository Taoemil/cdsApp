// KILDE = https://github.com/gitdagray/node_file_uploader, https://www.youtube.com/watch?v=4pmkQjsKJ-U

const filesPayloadExists = (req, res, next) => {
    if (!req.files) return res.status(400).json({ status: "error", message: "Missing files" })

    next()
}

module.exports = filesPayloadExists;