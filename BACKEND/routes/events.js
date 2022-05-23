const router = require("express").Router();
let Event = require("../models/Event");

//add events
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const location = req.body.location;
  const description = req.body.description;

  const newEvent = new Event({
    title,
    location,
    description,
  });

  newEvent
    .save()
    .then(() => {
      res.json("Event Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get event data
router.route("/").get((req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update event
router.route("/update/:id").put(async (req, res) => {
  let productId = req.params.id;
  const { name, price, description } = req.body;

  const updateProduct = {
    name,
    price,
    description,
  };

  const update = await Product.findByIdAndUpdate(productId, updateProduct)
    .then(() => {
      res.status(200).send({ status: "Product Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete event
router.route("/delete/:id").delete(async (req, res) => {
  let productId = req.params.id;

  await Product.findByIdAndDelete(productId)
    .then(() => {
      res.status(200).send({ status: "Product deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete product", error: err.message });
    });
});

//fetch specific event
router.route("/get/:id").get(async (req, res) => {
  let productId = req.params.id;

  const product = await Product.findById(productId)
    .then((product) => {
      res.status(200).send({ status: "Product fetched", product });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with get product", error: err.message });
    });
});

module.exports = router;
