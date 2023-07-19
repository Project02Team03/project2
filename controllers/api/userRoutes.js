const router = require("express").Router();
const { User, } = require("../../models");

router.post("/login",  async (req, res) => {
  console.log(req.body.email);
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // Set the logged_in session variable to false upon logout
      req.session.logged_in = false;
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//sing up new user

router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with the 'loggedIn' variable
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;

      res.json({ message: "You are now signed up!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//all users
// router.get('/', async (req,res) => {
//   try{
//     const allUsersData=await User.findAll();
//     res.status(200).json(allUsersData)
//   } catch(err){
//     res.status(500).json(err);
//   }
// });

//all recipes, favorited by logged in user????? we can add auth later
// router.get('/:id',withAuth, async(req,res) => {
//   try {
//     const myRecipes=await User.findByPk(req.params.id, {
//       where:{id: req.session.id},
//       include:
//       {model: Recipe, through: SelectedRecipe, as: 'recipes'},
//       attributes: { exclude: ['email','password'] }
//     });
//     res.status(200).json(myRecipes);
//   } catch (err){
//     res.status(500).json(err);
//   }
// });

//all users
router.get("/", async (req, res) => {
  try {
    const myRecipes = await User.findAll({
      include: { model: Recipe, through: SelectedRecipe, as: "recipes" },
    });
    res.status(200).json(myRecipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/user", withAuth, async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//     });

//     if (!userData) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
