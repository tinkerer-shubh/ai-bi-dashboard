import express from 'express';
import auth from '../middleware/auth';
import DataSource from '../models/DataSource';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { name, type, connectionDetails } = req.body;
    const newDataSource = new DataSource({
      name,
      type,
      connectionDetails,
      // @ts-ignore
      user: req.user?.id,
    });

    const dataSource = await newDataSource.save();
    res.json(dataSource);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const dataSources = await DataSource.find({ 
         // @ts-ignore
        user: req.user?.id });
    res.json(dataSources);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
 // @ts-ignore
router.get('/:id', auth, async (req, res) => {
  try {
    const dataSource = await DataSource.findOne({ 
         // @ts-ignore
        _id: req.params.id, user: req.user?.id });

    if (!dataSource) {
      return res.status(404).json({ msg: 'Data source not found' });
    }

    res.json(dataSource);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
 // @ts-ignore
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, type, connectionDetails } = req.body;
    const dataSource = await DataSource.findOneAndUpdate(
         // @ts-ignore
      { _id: req.params.id, user: req.user?.id },
      { name, type, connectionDetails },
      { new: true }
    );

    if (!dataSource) {
      return res.status(404).json({ msg: 'Data source not found' });
    }

    res.json(dataSource);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
 // @ts-ignore
router.delete('/:id', auth, async (req, res) => {
  try {
    const dataSource = await DataSource.findOneAndDelete({ _id: req.params.id, user: 
         // @ts-ignore
        req.user?.id });

    if (!dataSource) {
      return res.status(404).json({ msg: 'Data source not found' });
    }

    res.json({ msg: 'Data source removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;