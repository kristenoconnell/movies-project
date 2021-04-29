const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");

async function list(req, res) {
    const theatersList = await service.list();

    for (const theater of theatersList) {
        const movies = await service.listMovies(theater.theater_id);
        theater["movies"] = movies;
    }
    res.json({ data: theatersList });
}

module.exports = {
    list: asyncErrorBoundary(list)
} 

