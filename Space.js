const mongoose = require('mongoose');

const SpacesSchema = new mongoose.Schema({
    spaceName: String,
    spaceBrigade: String,
    spaceAreaAll: Number,
    sortsOnSquare: Array,
    volumeRowsOnSquare: Number,
    volumeColumnsOnSquare: Number,
    fileId: String,
    shirota: String,
    dolgota: String,
})
const Space = mongoose.model('Space', SpacesSchema);
module.exports = Space;