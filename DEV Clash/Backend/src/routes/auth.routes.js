import express from 'express';

const router = express.Router();

//router.signUp('/signup', )
//router.post('signin', )
router.post('/signout', (req, res) => {
  // Handle signout logic here
  res.send('Signout successful');
});


export default router;