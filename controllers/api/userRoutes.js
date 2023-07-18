const router = require('express').Router();
const { User, Recipe , SelectedRecipe} = require('../../models');
const withAuth=require('../../utils/auth')

router.post('/login', withAuth, async (req, res) => {
  console.log("I am logged in");
  
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//sing up new user
//CREATE new user after Sign Up
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with the 'loggedIn' variable
    req.session.save(() => {
      // Set the 'loggedIn' session variable to 'true'
      req.session.loggedIn=true
    if (req.session.loggedIn){
      return true;
    }
    res.render("homepage", {
       loggedIn: req.session.loggedIn
    }
    )
      res.status(200).json(dbUserData);
  });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//all users
router.get('/', async (req,res) => {
  try{
    const allUsersData=await User.findAll();
    res.status(200).json(allUsersData)
  } catch(err){
    res.status(500).json(err);
  }
});

//all recipes, favorited by logged in user????? we can add auth later
router.get('/:id',withAuth, async(req,res) => {
  try {
    const myRecipes=await User.findByPk(req.params.id, {
      where:{id: req.session.id},
      include: 
      {model: Recipe, through: SelectedRecipe, as: 'recipes'},
      attributes: { exclude: ['email','password'] }
    });
    res.status(200).json(myRecipes);
  } catch (err){
    res.status(500).json(err);
  }
});

//all users
router.get('/', async(req,res) => {
  try {
    const myRecipes=await User.findAll({include: 
      {model: Recipe, through: SelectedRecipe, as: 'recipes'}
    });
    res.status(200).json(myRecipes);
  } catch (err){
    res.status(500).json(err);
  }
});




module.exports = router;
