// @route   GET /api/v1/transactions
exports.getTransactions = async(req, res) => {

    try{
        const transactions = await Transaction.find();
        return res.status(200).json(
            {
                success: true,
                count: transactions.length,
                data: transactions
            }
        );

    }catch(error){
        res.status(500)
        return res.json({
            success: false,
            error: 'Server Error'
        });
    }
};

exports.addTransaction = async(req, res) => {

    try{
        const transactions = await Transaction.create(req.body);
        return res.status(201).json({
            success: true,
            data: transactions
        });
    }catch(err){
        if (err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        }else{
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }

};

exports.deleteTransaction = async(req, res) => {

    try{
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction){
            return res.status(404).json({success: false, error: 'No transaction found'});
        }

        await transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    }catch(err){
        return res.status(500).json({success: false, error: 'Server Error'});
    }

};
