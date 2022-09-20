const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const firestoreAutoId = () => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let autoId = ''

    for (let i = 0; i < 20; i++) {
        autoId += CHARS.charAt(
            Math.floor(Math.random() * CHARS.length)
        )
    }
    return autoId
}

exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        Model.Query.doc(req.params.id).get().then((snapshot) => {
            if (snapshot.exists) {
                Model.Query.doc(req.params.id).delete().then(() => {
                    res.status(204).json({
                        status: 'success',
                        data: null
                    });
                })
            } else {
                next(new AppError('No document found with that ID', 404))
            }
        });
    });

exports.disableOne = Model =>
    catchAsync(async (req, res, next) => {
        Model.Query.doc(req.params.id).get().then((snapshot) => {
            if (snapshot.exists) {
                Model.Query.doc(req.params.id).update({isDelete: true}).then(() => {
                    res.status(204).json({
                        status: 'success',
                        data: null
                    });
                })
            } else {
                next(new AppError('No document found with that ID', 404))
            }
        });
    });

exports.updateOne = (Model, extraProps) =>
    catchAsync(async (req, res, next) => {
        Model.Query.doc(req.params.id).get().then((snapshot) => {
            if (snapshot.exists) {
                console.log(Object.assign(req.body, extraProps))
                Model.Query.doc(req.params.id).update(Object.assign(req.body, extraProps)).then(() => {
                    res.status(200).json({
                        status: 'success',
                        data: {
                            data: Object.assign(snapshot.data(), req.body)
                        }
                    });
                })
            } else {
                next(new AppError('No document found with that ID', 404))
            }
        });
    });

exports.updateOneWithMapper = (Model, extraProps) =>
    catchAsync(async (req, res, next) => {
        Model.Query.doc(req.params.id).get().then((snapshot) => {
            if (snapshot.exists) {
                Model.Query.doc(req.params.id).update(Object.assign(req.body, extraProps)).then(() => {
                    res.status(200).json({
                        status: 'success',
                        data: {
                            data: Model.PublicScheme(Object.assign(snapshot.data(), req.body))
                        }
                    });
                })
            } else {
                next(new AppError('No document found with that ID', 404))
            }
        });
    });

exports.createOne = (Model, extraProps) =>
    catchAsync(async (req, res, next) => {
        const generatedId = firestoreAutoId()

        Model.Query.doc(generatedId).get().then(async (docSnapshot) => {
                if (!docSnapshot.exists) {
                    const doc = await Model.Query.doc(generatedId);
                    extraProps = Object.assign(extraProps,{"id": generatedId})
                    await doc.set(Object.assign(extraProps, req.body))

                    res.status(201).json({
                        status: 'success',
                        data: req.body
                    });
                } else {
                    next(new AppError('An error occurred while creating user, please try again'))
                }
            });
    });

exports.getOne = Model =>
    catchAsync(async (req, res, next) => {
        Model.Query.doc(req.params.id).get().then((doc) => {
            if (doc.exists) {
                res.status(200).json({
                    status: 'success',
                    data: doc.data(),
                });
            } else {
                next(new AppError('No document found with that ID', 404));
            }
        })
    });

exports.getOneWithMapper = (Model) =>
    catchAsync(async (req, res, next) => {
        Model.Query.doc(req.params.id).get().then((doc) => {
            if (doc.exists) {
                res.status(200).json({
                    status: 'success',
                    data: Model.PublicScheme(doc.data()),
                });
            } else {
                next(new AppError('No document found with that ID', 404));
            }
        })
    });

exports.getAll = (Model, APIFeatureQuery) =>
    catchAsync(async (req, res) => {
        const features = new APIFeatures(Model.Query, APIFeatureQuery)
            .filter()
            .sort()
            .paginate();

        const doc = (await features.query.get()).docs.map(doc => doc.data());
        const metaData = {} // TODO previous cursor will be add
        if(doc.length > 0 && doc.length === APIFeatureQuery.paginate.limit){
            Object.assign(metaData,{next: doc[Object.keys(doc).length-1].id})
        }

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: doc.length,
            ...metaData,
            data: doc
        });
    });

exports.getAllWithMapper = (Model, APIFeatureQuery) =>
    catchAsync(async (req, res) => {
        const features = new APIFeatures(Model.Query, APIFeatureQuery)
            .filter()
            .sort()
            .paginate();

        const doc = (await features.query.get()).docs.map(doc => doc.data());
        const metaData = {} // TODO previous cursor will be add
        if(doc.length > 0 && doc.length === APIFeatureQuery.paginate.limit){
            Object.assign(metaData,{next: doc[Object.keys(doc).length-1].id})
        }

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: doc.length,
            ...metaData,
            data: Model.PublicScheme(doc)
        });
    });


// TODO Mapper functions will be written more generic