const { distinct } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_ic: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
})

function list() {
    return knex("movies")
    .select("*");
}


function read(movieId) {
    return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first();
}

function listMoviesShowing() {
    return knex("movies as m")
    .distinct("m.*")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where( "mt.is_showing", true);
}

//how to where({ movie_id: movieId }) and the function understand where to look for the movie_id??
function findTheaters(movie_id){
    return knex("theaters as t")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .distinct("t.theater_id")
    .join("movies_theaters as mt", "mt.movie_id", movie_id)
    .where("mt.movie_id", movie_id)
    .andWhere("mt.is_showing", true);

}

function listReviews(movie_id) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where("r.movie_id", movie_id)
    .then((res) => {
        return Promise.all(res.map(addCritic))
    })
}


module.exports = {
    list,
    read,
    listMoviesShowing,
    findTheaters,
    listReviews
}