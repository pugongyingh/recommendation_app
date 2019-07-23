const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../services/authenticateUser');

const { validateUser } = require('../services/validationChain');
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../services/userFunctions');

// HOF try/catch error handling
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      if (err === 'SequelizeDatabaseError') {
        res.status(err.status).json({ error: err.message });
      } else {
        console.log(err);
      }
    }
  };
}
// User Routes
//GET /api/users 200 - Returns the currently authenticated user
router.get('/users', authenticateUser, (req, res) => {
  const user = req.currentUser;
  const users = getUser(user);
  res.status(200).json({
    users,
  });
});
//POST /api/users 201 - Creates a user, sets the Location header to "/", and returns 'User created succesfully'
router.post(
  '/users',
  validateUser,
  asyncHandler(async (req, res) => {
    const user = req.body;
    await createUser(user);
    res
      .location('/')
      .status(201)
      .json({
        message: `Account for ${user.firstName} Created Successfully!`,
      });
  })
);

// PUT /api/users - updates user and returns no content
router.put('/users', authenticateUser, validateUser, async (req, res) => {
  const currentUserId = req.currentUser.id;
  const body = req.body;
  await updateUser(currentUserId, body);
  res.status(204).end();
});
// DELETE (Careful, this deletes users from the DB) /api/users 204 - deletes a user, sets the location to '/', and returns no content
router.delete(
  '/users',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    await deleteUser(user);
    res
      .status(204)
      .location('/')
      .end();
  })
);
module.exports = router;
