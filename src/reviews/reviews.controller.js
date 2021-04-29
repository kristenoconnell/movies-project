const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists (req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
        if(review) {
            res.locals.review = review;
            return next();
        } 
        next({ status: 404, message: `${reviewId} cannot be found.`});
}


async function update(req, res){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    };
    const data = await service.update(updatedReview);
    res.json({ data });
}

async function destroy(req, res) {
    await service.destroy(res.locals.review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [reviewExists, asyncErrorBoundary(update)],
    delete: [reviewExists, asyncErrorBoundary(destroy)]
}