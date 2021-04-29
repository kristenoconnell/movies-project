const service = require("./movies.service");
const cors = require("cors");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    } 
        next({
            status: 404,
            message: `${movieId} could not be found.`
        })

};


async function list(req, res) {
    const { is_showing } = req.query;
    if (is_showing) {
        data = await service.listMoviesShowing();
    } else {
        data =  await service.list();
        console.log("list movies", data);
    }
    res.json({ data });
}

async function read(req, res) {
    const data = res.locals.movie;
    res.json({ data });
}

async function listMoviesShowing(req, res) {
    if (req.query.is_showing === true) {
    const data = await service.listMoviesShowing();
    res.json({ data });
    }
}

async function findTheaters(req, res) {
    const id = res.locals.movie.movie_id;
    const data = await service.findTheaters(id);
    res.json({ data });
}

async function listReviews(req, res) {
    const id = res.locals.movie.movie_id;
    const data = await service.listReviews(id);
    res.json({ data });
}



module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieExists, asyncErrorBoundary(read)],
    listMoviesShowing: asyncErrorBoundary(listMoviesShowing),
    findTheaters: [movieExists, asyncErrorBoundary(findTheaters)],
    listReviews: [movieExists, asyncErrorBoundary(listReviews)]
}