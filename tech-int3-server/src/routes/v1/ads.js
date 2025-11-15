const express = require('express');
const router = express.Router();
const { 
  getAds, 
  getAdById, 
  approveAd, 
  rejectAd, 
  requestChanges,
  updateAdStatus
} = require('../../controllers/v1/adsController');

router.get('/', getAds);

router.get('/:id', getAdById);

router.post('/:id/approve', approveAd);

router.post('/:id/reject', rejectAd);

router.post('/:id/request-changes', requestChanges);

router.put('/:id/status', updateAdStatus);

module.exports = router;
