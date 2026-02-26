const Lot = require('../models/Lot');

exports.getAllLots = async (req, res) => {
    try {
        const lots = await Lot.findAll({
            order: [['id', 'ASC']]
        });
        res.json(lots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLotById = async (req, res) => {
    try {
        const lot = await Lot.findByPk(req.params.id);
        if (!lot) return res.status(404).json({ message: 'Lot not found' });
        res.json(lot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLot = async (req, res) => {
    try {
        const lot = await Lot.findByPk(req.params.id);
        if (!lot) return res.status(404).json({ message: 'Lot not found' });

        console.log(`Updating lot ${req.params.id} with data:`, req.body);
        await lot.update(req.body);
        res.json(lot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
