function Response(data = {}) {
    let result = {
        data: data?.data?data?.data:[],
        type: data?.type?data?.type:'',
        errors: data?.errors?data?.errors:'',
        message: data?.message?data?.message:'',
        status: data?.status?data?.status:false,
    };
    return result;
}

module.exports = {
    Response,
};