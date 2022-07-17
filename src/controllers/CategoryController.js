const fs = require('fs');
var Category = require("./../models/Category");
var Product = require("./../models/Product");
var appRoot = process.env.PWD;
exports.category = {
  store: async function (req, res) {
    const { title,image_url } = req.body;
    let userId = req.user._id;
    try {
		let category = await Category.findOne({
			title,
		});
		if (category) {
			return res.json({ status: false, message: "Category already exists",data:{} });
		}
		let photo = "";
		if (req.files) {
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.json({
					message:"No files were uploaded.",
					status:false
				});
			}
			let sampleFile = req.files.photo;
			let fileName = sampleFile.name.split(".");
			fileName = fileName[0] + Date.now() + "." + fileName[1];
			photo = '/src/uploads/category/'+fileName;
			sampleFile.mv("./src/uploads/category/" + fileName, function (err) {
				if (err) return res.json({
					message:err,
					status:false,
				});
			});
		}
		category = new Category({
			title,
			image:photo?photo:image_url,
			created_by: userId,
		});
		await category.save();
		return res.status(200).json({
			status: true,
			data: category,
			message: "Category added successfully",
		});
    } catch (error) {
      return res.json({
		  message:'Error in Saving',
		  status:false,
		  data:{}
	  });
    }
  },
  list: async function (req, res) {
	if( Object.keys(req.query).length !== 0){

		Category.find().limit(parseInt(req.query.page))
		.populate("created_by")
		.then((p) => {
		  return res.json({
			status: true,
			success: true,
			data: p,
		  });
		})
		.catch((error) => {
		  return res.json({
			status: false,
			success: true,
			statusCode: 40,
			data: error,
		  });
		});
	}else{
		Category.find()
		.populate("created_by")
		.then((p) => {
		  return res.json({
			status: true,
			success: true,
			data: p,
		  });
		})
		.catch((error) => {
		  return res.json({
			status: false,
			success: true,
			statusCode: 40,
			data: error,
		  });
		});

	}
   
  	},
	showOne: async function (req, res) {
		if(!req.params.id) {
			return res.json({ status: false, success: false,  data: '',message: "Category id can not be empty" + req.params.id});
		}
		await Category.findById(req.params.id).then(data => {
			return res.json({ status: true, success: true, statusCode: 200, data: data });
		}).catch(error => {
			return res.json({ status: false, success: false, statusCode: 40, data: error });
		})
	},
	update: async function (req, res) {
		const { title } = req.body;
		await Category.findByIdAndUpdate(req.params.id, {
			title:title,
		}, {new: true})
		.then(category => {
			if(!category) {
				return res.json({ status: false, success: false,  data: '',message: "category not found with id" + req.params.id});
			}
			return res.json({ status: true, data: category, message: 'category Updated successfully' })

		}).catch(err => {
			if(err.kind === 'ObjectId') {
				return res.json({ status: false, success: false,  data: '',message: "categorys not found with id " + req.params.id });
			}
			return res.json({ status: false, success: false,  data: '',message: "Error updating category with id" + req.params.id });
		});
	},

  	delete: async function (req, res) {
		if(!req.params.id) {
			return res.json({ status: false, success: false,  data: '',message: "Category content can not be empty" + req.params.id});
		}
		await Category.findByIdAndRemove(req.params.id)
		.then(category => {
			
			
			if(category.photo){

				fs.existsSync(appRoot + category.photo, function(exists) {
					if(exists) {
					  //Show in green
					  fs.unlink(appRoot + category.photo);
					} else {
					  //Show in red
					}
				  });
			}
			if(!category) {
				return res.json({ status: false, success: false,  data: '',message: "Category not found with id " + req.params.id});
			}
			Product.deleteMany({category_id: req.params.id}, function(err){
				if(err) res.json(err);  
			});
			return res.json({ status: true, success: true,  data: '',message: "Category deleted successfully!"});
		}).catch(err => {
			if(err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.json({ status: false, success: false,  data: '',message: "Category not found with id " + req.params.id });
			}
			return res.json({ status: false, success: false,  data: '',message: "Could not delete Category with id " + req.params.id });
		});
	}
};
