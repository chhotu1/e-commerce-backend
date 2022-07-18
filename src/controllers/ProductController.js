
const Product = require('./../models/Product');

exports.Product = {
	store: async function (req, res) {
		const { title, category_id, phone, address,offer,offer_price,slug,price,discription,image_url } = req.body;
		let userId = req.user._id;
		try {
			let photo = '';
			if (req.files) {
				if (!req.files || Object.keys(req.files).length === 0) {
					return res.status(400).send('No files were uploaded.');
				}
				let sampleFile = req.files.photo[0];
				let fileName = sampleFile.name.split(".");
				fileName = fileName[0] + Date.now() + "." + fileName[1];
				photo = '/src/uploads/products/'+fileName;
				sampleFile.mv("./src/uploads/products/" + fileName, function (err) {
					if (err) return res.json({
						message:err,
						status:false,
					});
				});
				// if (req.files.photo) {
				// 	let sampleFile = req.files.photo;
				// 	let fileName = sampleFile.name.split(".");
				// 	fileName = fileName[0] + Date.now() + '.' + fileName[1];
				// 	photo='/src/uploads/products/'+fileName;
				// 	sampleFile.mv('./src/uploads/products/' + fileName, function (err) {
				// 		if (err)
				// 			return res.status(500).send(err);
				// 	});
				// }
			}

			let payload = {
				title,
				category_id,
				phone, address,
				created_by: userId,
				image: photo!==''?photo:image_url,
				offer_price,
				offer,
				slug,
				price,
				discription
			};
			let product = new Product(payload);
			await product.save();
			return res.status(200).json({ status: true, data: product, message: 'Product added successfully' })
		} catch (error) {
			console.log(error)
			return res.status(400).json({ status: false, data: {}, message: 'Error in Saving' })
		}
	},
	list: async function (req, res) {
		if( Object.keys(req.query).length !== 0){
			await Product.find().sort({_id: -1}).limit(parseInt(req.query.page)).populate('created_by').populate('category_id').then(data => {
				return res.json({ status: true, success: true, statusCode: 200, data: data });
			}).catch(error => {
				return res.json({ status: false, success: true, statusCode: 40, data: error });
			})
		}else{
			await Product.find().sort({_id: -1}).populate('created_by').populate('category_id').then(data => {
				return res.json({ status: true, success: true, statusCode: 200, data: data });
			}).catch(error => {
				return res.json({ status: false, success: true, statusCode: 40, data: error });
			})
		}
	},
	showOne: async function (req, res) {

		if(!req.params.id) {
			return res.json({ status: false, success: false,  data: '',message: "Products id can not be empty" + req.params.id});
		}
		await Product.findById(req.params.id).populate('created_by').populate('category_id').then(data => {
			return res.json({ status: true, success: true, statusCode: 200, data: data });
		}).catch(error => {
			return res.json({ status: false, success: false, statusCode: 40, data: error });
		})
	},
	update: async function (req, res) {
		const { title, category_id, phone, address,offer,offer_price,slug,price,discription } = req.body;
		let userId = req.user._id;

		// if(userId!==req.params.id){
		// 	return res.json({
		// 		message: "You are not authorized",
		// 		status:false,
		// 	});
		// }
		
		await Product.findByIdAndUpdate(req.params.id, {
			title:title,
			category_id:category_id,
			phone:phone,
			address:address,
			offer_price:offer_price,
			offer:offer,
			slug:slug,
			price:price,
			discription:discription
		}, {new: true})
		.then(product => {
			if(!product) {
				return res.json({ status: false, success: false,  data: '',message: "product not found with id" + req.params.id});
			}
			return res.json({ status: true, data: product, message: 'Product Updated successfully' })

		}).catch(err => {
			if(err.kind === 'ObjectId') {
				return res.json({ status: false, success: false,  data: '',message: "Products not found with id " + req.params.id });
			}
			return res.json({ status: false, success: false,  data: '',message: "Error updating product with id" + req.params.id });
		});
	},
	delete: async function (req, res) {
		if(!req.params.id) {
			return res.json({ status: false, success: false,  data: '',message: "Products content can not be empty" + req.params.id});
		}
		await Product.findByIdAndRemove(req.params.id)
		.then(prod => {
			if(!prod) {
				return res.json({ status: false, success: false,  data: '',message: "Products not found with id " + req.params.id});
			}
			return res.json({ status: true, success: true,  data: '',message: "Products deleted successfully!"});
		}).catch(err => {
			if(err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.json({ status: false, success: false,  data: '',message: "Products not found with id " + req.params.id });
            }
			return res.json({ status: false, success: false,  data: '',message: "Could not delete Products with id " + req.params.id });
		});
	},

	deleteMultiple: async function (req, res) {
		if(!req.body.ids) {
			return res.json({ status: false, success: false,  data: '',message: "Products content can not be empty"});
		}
		await Product.remove({'_id':{'$in':req.body.ids.split(',')}})
		.then(prod => {
			if(!prod) {
				return res.json({ status: false, success: false,  data: '',message: "Products not found with id "});
			}
			return res.json({ status: true, success: true,  data: '',message: "Products deleted successfully!"});
		}).catch(err => {
			if(err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.json({ status: false, success: false,  data: '',message: "Products not found with id " });
            }
			return res.json({ status: false, success: false,  data: '',message: "Could not delete Products with id " });
		});
	}
	
}