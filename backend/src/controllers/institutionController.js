import Institution from '../models/institutionModel.js';

const getAllInsts = async (req, res) => {
  const allInsts = await Inst.findAll();
  return res.status(200).json({
    status: 'success',
    results: allInsts.length,
    data: {
      insts: allInsts,
    },
  });
};

const getInst = (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      insts: req.foundInst.toJSON(),
    },
  });
};

const updateInst = async (req, res) => {
  for (const prop in req.body) {
    req.foundInst[prop] = req.body[prop];
  }
  await req.foundInst.update();
  return res.status(200).json({
    status: 'success',
    data: {
      insts: req.foundInst.toJSON(),
    },
  });
};

const deleteInst = async (req, res) => {
  await req.foundInst.delete();
  return res.status(204).json({
    status: 'success',
    data: null,
  });
};

const insitutionController = {
  getAllInsts,
  getInst,
  updateInst,
  deleteInst,
};

export default insitutionController;
